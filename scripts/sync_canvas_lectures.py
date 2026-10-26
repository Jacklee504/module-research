"""Discover Canvas slide decks for the local, unpublished study workspace."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import ssl
import subprocess
import sys
import time
import zipfile
from pathlib import Path
from html.parser import HTMLParser
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode, urljoin, urlsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "private" / "canvas" / "catalog.json"
DOWNLOAD_STATE = CATALOG.parent / "download_state.json"
REVIEW_QUEUE = CATALOG.parent / "pending_review.json"
CANVAS = "https://universityofgalway.instructure.com"
SYSTEM_CA = Path("/etc/ssl/cert.pem")
SSL_CONTEXT = ssl.create_default_context(cafile=str(SYSTEM_CA)) if SYSTEM_CA.exists() else ssl.create_default_context()
SLIDE_EXTENSIONS = {".pdf", ".ppt", ".pptx"}
MODULE_CODES = {path.name for path in ROOT.iterdir() if path.is_dir() and re.fullmatch(r"(?:CS|CT|MA)\d+", path.name)}


class CanvasAccessError(RuntimeError):
    def __init__(self, message: str, status: int) -> None:
        super().__init__(message)
        self.status = status


class CanvasFileUnavailable(RuntimeError):
    pass


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self.file_links: list[tuple[str, str]] = []
        self.current_file_id: str | None = None
        self.current_link_text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"p", "br", "li", "h1", "h2", "h3", "h4"}:
            self.parts.append("\n")
        if tag == "a":
            values = [value or "" for name, value in attrs if name in {"href", "data-api-endpoint"}]
            match = next((re.search(r"/files/(\d+)", value) for value in values if re.search(r"/files/(\d+)", value)), None)
            self.current_file_id = match.group(1) if match else None
            self.current_link_text = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)
        if self.current_file_id:
            self.current_link_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self.current_file_id:
            self.file_links.append((self.current_file_id, " ".join("".join(self.current_link_text).split())))
            self.current_file_id = None
            self.current_link_text = []


def access_token() -> str:
    token = os.environ.get("CANVAS_API_KEY", "").strip()
    if token:
        return token
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            name, separator, value = line.partition("=")
            if separator and name.strip() == "CANVAS_API_KEY":
                return value.strip().strip('"\'')
    raise RuntimeError("Set CANVAS_API_KEY in the environment or the local .env file.")


def api_request(path_or_url: str, token: str) -> tuple[object, str | None]:
    url = urljoin(CANVAS, path_or_url)
    if urlsplit(url).scheme != "https" or urlsplit(url).netloc != urlsplit(CANVAS).netloc:
        raise RuntimeError("Canvas returned a pagination link outside its own domain.")
    for attempt in range(4):
        request = Request(url, headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json+canvas-string-ids",
        })
        try:
            with urlopen(request, timeout=30, context=SSL_CONTEXT) as response:
                data = json.load(response)
                links = response.headers.get("Link", "")
            next_url = None
            for link in links.split(","):
                match = re.search(r'<([^>]+)>;\s*rel="next"', link)
                if match:
                    next_url = match.group(1)
                    break
            return data, next_url
        except HTTPError as error:
            if error.code == 429 and attempt < 3:
                time.sleep(2 ** attempt)
                continue
            endpoint = urlsplit(url).path
            if error.code in {401, 403}:
                raise CanvasAccessError(
                    f"Canvas returned HTTP {error.code} for {endpoint}; check the API key and course access.",
                    error.code,
                ) from None
            raise RuntimeError(f"Canvas API returned HTTP {error.code} for {endpoint}.") from None
        except URLError as error:
            raise RuntimeError(f"Canvas connection failed: {error.reason}.") from None
    raise RuntimeError("Canvas remained rate-limited after retries.")


def api_list(path: str, token: str) -> list[dict]:
    items: list[dict] = []
    url: str | None = path
    while url:
        data, url = api_request(url, token)
        if not isinstance(data, list):
            raise RuntimeError("Canvas returned an unexpected list response.")
        items.extend(item for item in data if isinstance(item, dict))
    return items


def module_code(course: dict) -> str | None:
    text = " ".join(str(course.get(field) or "") for field in ("course_code", "name", "original_name"))
    for code in sorted(MODULE_CODES, key=len, reverse=True):
        if re.search(rf"(?<![A-Z0-9]){re.escape(code)}(?![0-9])", text, re.IGNORECASE):
            return code
    return None


def slide_file(file: dict) -> bool:
    name = str(file.get("display_name") or file.get("filename") or "")
    return Path(name.lower()).suffix in SLIDE_EXTENSIONS


def discover_course(course: dict, code: str, token: str) -> dict:
    course_id = str(course["id"])
    restrictions = []
    try:
        files = api_list(f"/api/v1/courses/{course_id}/files?per_page=100", token)
    except CanvasAccessError:
        files = []
        restrictions.append("files")
    try:
        modules = api_list(
            f"/api/v1/courses/{course_id}/modules?{urlencode({'per_page': 100, 'include[]': 'items'})}",
            token,
        )
    except CanvasAccessError:
        modules = []
        restrictions.append("modules")
    file_modules: dict[str, list[dict]] = {}
    external_refs: list[dict] = []
    for module in modules:
        module_id = str(module["id"])
        items = module.get("items")
        if not isinstance(items, list):
            try:
                items = api_list(f"/api/v1/courses/{course_id}/modules/{module_id}/items?per_page=100", token)
            except CanvasAccessError:
                restrictions.append(f"module_items:{module_id}")
                continue
        for item in items:
            if item.get("type") == "File" and item.get("content_id") is not None:
                file_modules.setdefault(str(item["content_id"]), []).append({
                    "module": str(module.get("name") or ""),
                    "module_position": module.get("position"),
                    "item_position": item.get("position"),
                    "item_title": str(item.get("title") or ""),
                })
            elif item.get("type") in {"ExternalUrl", "Page"}:
                external_refs.append({
                    "module": str(module.get("name") or ""),
                    "title": str(item.get("title") or ""),
                    "type": item.get("type"),
                    "html_url": item.get("html_url"),
                    "page_url": item.get("page_url"),
                })

    slides = []
    for file in files:
        if not slide_file(file):
            continue
        file_id = str(file["id"])
        slides.append({
            "id": file_id,
            "title": str(file.get("display_name") or file.get("filename") or "Untitled deck"),
            "content_type": file.get("content-type"),
            "size": file.get("size"),
            "updated_at": file.get("updated_at"),
            "locked": bool(file.get("locked") or file.get("locked_for_user")),
            "canvas_url": f"{CANVAS}/courses/{course_id}/files/{file_id}",
            "modules": file_modules.get(file_id, []),
        })
    known_ids = {file["id"] for file in slides}
    for file_id, references in file_modules.items():
        if file_id in known_ids:
            continue
        try:
            metadata, _ = api_request(f"/api/v1/files/{file_id}", token)
        except CanvasAccessError:
            continue
        if not isinstance(metadata, dict) or not slide_file(metadata):
            continue
        title = str(metadata.get("display_name") or metadata.get("filename"))
        slides.append({
            "id": file_id,
            "title": title,
            "content_type": metadata.get("content-type"),
            "size": metadata.get("size"),
            "updated_at": metadata.get("updated_at"),
            "locked": bool(metadata.get("locked") or metadata.get("locked_for_user")),
            "canvas_url": f"{CANVAS}/courses/{course_id}/files/{file_id}",
            "modules": references,
        })
    slides.sort(key=lambda file: (
        min((reference.get("module_position") or 9999 for reference in file["modules"]), default=9999),
        min((reference.get("item_position") or 9999 for reference in file["modules"]), default=9999),
        file["title"].lower(),
    ))
    return {
        "code": code,
        "canvas_course_id": course_id,
        "course_name": str(course.get("name") or course.get("course_code") or code),
        "slides": slides,
        "other_module_items": external_refs,
        "restricted_endpoints": restrictions,
    }


def file_version(file: dict) -> dict:
    return {field: file.get(field) for field in ("updated_at", "size")}


def save_download_state(state: dict) -> None:
    target = DOWNLOAD_STATE.with_suffix(".json.part")
    target.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    target.replace(DOWNLOAD_STATE)


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        while chunk := source.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()


def review_queue() -> dict:
    return json.loads(REVIEW_QUEUE.read_text(encoding="utf-8")) if REVIEW_QUEUE.exists() else {}


def save_review_queue(queue: dict) -> None:
    target = REVIEW_QUEUE.with_suffix(".json.part")
    target.write_text(json.dumps(queue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    target.replace(REVIEW_QUEUE)


def queue_review(code: str, file: dict) -> None:
    queue = review_queue()
    queue[f"{code}/{file['id']}"] = {
        "code": code,
        "file_id": file["id"],
        "title": file["title"],
        "canvas_url": file["canvas_url"],
        "reviewed": False,
    }
    save_review_queue(queue)


def download_files(ids: list[str], token: str, refresh_existing: bool = False) -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    known = {file["id"]: (course["code"], file) for course in catalog["courses"] for file in course["slides"]}
    for file_id in ids:
        entry = known.get(file_id)
        if not entry:
            raise RuntimeError(f"File ID {file_id} is not in the private catalog.")
        code, file = entry
        if code not in MODULE_CODES:
            raise RuntimeError(f"Module code {code} is not a local module directory.")
        destination = CATALOG.parent / code / "files"
        destination.mkdir(parents=True, exist_ok=True)
        suffix = Path(file["title"].lower()).suffix
        target = destination / f"{file_id}{suffix}"
        legacy = CATALOG.parent / "files" / target.name
        if legacy.exists() and not target.exists() and not refresh_existing:
            shutil.copy2(legacy, target)
            legacy_text = CATALOG.parent / "text" / f"{file_id}.txt"
            if legacy_text.exists():
                text_path = destination.parent / "text" / legacy_text.name
                if not text_path.exists():
                    text_path.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(legacy_text, text_path)
        if target.exists() and not refresh_existing:
            print(f"Already downloaded: {file_id}")
            extract_slide_text(target)
            continue
        previous_hash = file_hash(target) if target.exists() else file_hash(legacy) if legacy.exists() else None
        info, _ = api_request(f"/api/v1/files/{file_id}", token)
        if not isinstance(info, dict) or not isinstance(info.get("url"), str):
            raise CanvasFileUnavailable(f"Canvas did not provide a download URL for file {file_id}.")
        source = info["url"]
        if urlsplit(source).scheme != "https":
            raise CanvasFileUnavailable(f"Canvas provided a non-HTTPS download URL for file {file_id}.")
        request = Request(source, headers={"User-Agent": "ModuleResearchCanvasSync/1.0"})
        partial = target.with_suffix(target.suffix + ".part")
        try:
            with urlopen(request, timeout=60, context=SSL_CONTEXT) as response, partial.open("wb") as output:
                while chunk := response.read(1024 * 1024):
                    output.write(chunk)
            partial.replace(target)
        except (HTTPError, URLError) as error:
            if partial.exists():
                partial.unlink()
            status = error.code if isinstance(error, HTTPError) else "connection error"
            message = f"Canvas file {file_id} could not be downloaded ({status})."
            if isinstance(error, HTTPError) and error.code in {403, 404}:
                raise CanvasFileUnavailable(message) from None
            raise RuntimeError(message) from None
        print(f"Downloaded privately: {file_id} ({target.stat().st_size} bytes)")
        extract_slide_text(target, refresh_existing)
        state = json.loads(DOWNLOAD_STATE.read_text(encoding="utf-8")) if DOWNLOAD_STATE.exists() else {}
        state[f"{code}/{file_id}"] = file_version(file)
        save_download_state(state)
        if previous_hash != file_hash(target):
            queue_review(code, file)


def extract_slide_text(path: Path, refresh_existing: bool = False) -> None:
    if path.suffix not in {".pdf", ".pptx"}:
        return
    text_path = path.parent.parent / "text" / f"{path.stem}.txt"
    if text_path.exists() and not refresh_existing:
        return
    text_path.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix == ".pptx":
        with zipfile.ZipFile(path) as deck:
            slide_names = sorted(
                (name for name in deck.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)),
                key=lambda name: int(re.search(r"slide(\d+)\.xml", name).group(1)),
            )
            slides = []
            for name in slide_names:
                slide = ElementTree.fromstring(deck.read(name))
                lines = [node.text for node in slide.iter("{http://schemas.openxmlformats.org/drawingml/2006/main}t") if node.text]
                slides.append("\n".join(lines))
        text_path.write_text("\n\n".join(slides) + "\n", encoding="utf-8")
    else:
        result = subprocess.run(
            ["pdftotext", "-layout", str(path), str(text_path)],
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            raise RuntimeError(f"Could not extract text from private PDF {path.stem}.")


def sync_available_files(previous: dict, current: dict, token: str, codes: set[str] | None) -> None:
    if codes:
        missing = codes - {course["code"] for course in current["courses"]}
        if missing:
            raise RuntimeError(f"Selected modules missing from the Canvas catalog: {', '.join(sorted(missing))}.")
    old_files = {
        (course["code"], file["id"]): file
        for course in previous.get("courses", [])
        for file in course["slides"]
    }
    state = json.loads(DOWNLOAD_STATE.read_text(encoding="utf-8")) if DOWNLOAD_STATE.exists() else {}
    seeded = False
    for course in current["courses"]:
        code = course["code"]
        if codes is not None and code not in codes:
            continue
        for file in course["slides"]:
            file_id = file["id"]
            suffix = Path(file["title"].lower()).suffix
            filename = f"{file_id}{suffix}"
            cached = (CATALOG.parent / code / "files" / filename).exists() or (CATALOG.parent / "files" / filename).exists()
            key = f"{code}/{file_id}"
            if cached and key not in state:
                state[key] = file_version(old_files.get((code, file_id), file))
                seeded = True
    if seeded:
        save_download_state(state)
    downloaded = refreshed = unavailable = 0
    for course in current["courses"]:
        code = course["code"]
        if codes is not None and code not in codes:
            continue
        for file in course["slides"]:
            file_id = file["id"]
            if file.get("locked"):
                unavailable += 1
                continue
            suffix = Path(file["title"].lower()).suffix
            filename = f"{file_id}{suffix}"
            target = CATALOG.parent / code / "files" / filename
            legacy = CATALOG.parent / "files" / filename
            cached = target.exists() or legacy.exists()
            saved = state.get(f"{code}/{file_id}")
            changed = bool(saved and any(
                file.get(field) is not None and file.get(field) != saved.get(field)
                for field in ("updated_at", "size")
            ))
            if cached and not changed:
                download_files([file_id], token)
                continue
            try:
                download_files([file_id], token, refresh_existing=cached and changed)
            except CanvasAccessError as error:
                if error.status != 403:
                    raise
                print(f"Unavailable for now: {code} file {file_id} (Canvas access restricted)")
                unavailable += 1
                continue
            except CanvasFileUnavailable as error:
                print(f"Unavailable for now: {code} file {file_id} ({error})")
                unavailable += 1
                continue
            if cached and changed:
                refreshed += 1
            else:
                downloaded += 1
    print(f"Private deck sync: {downloaded} downloaded, {refreshed} refreshed, {unavailable} unavailable for now.")


def fetch_lecture_pages(code: str, token: str) -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    course = next((course for course in catalog["courses"] if course["code"] == code), None)
    if not course:
        raise RuntimeError(f"Module {code} is not in the private catalog.")
    destination = CATALOG.parent / "pages"
    destination.mkdir(parents=True, exist_ok=True)
    count = 0
    known_ids = {file["id"] for file in course["slides"]}
    for item in course["other_module_items"]:
        if item["type"] != "Page" or "lecture notes" not in item["title"].lower() or not item.get("page_url"):
            continue
        slug = str(item["page_url"])
        data, _ = api_request(
            f"/api/v1/courses/{course['canvas_course_id']}/pages/{quote(slug, safe='')}", token
        )
        if not isinstance(data, dict):
            raise RuntimeError(f"Canvas returned an unexpected page response for {code}.")
        extractor = TextExtractor()
        extractor.feed(str(data.get("body") or ""))
        page = {
            "code": code,
            "module": item["module"],
            "title": item["title"],
            "canvas_url": item["html_url"],
            "text": " ".join("".join(extractor.parts).split()),
            "body_html": data.get("body") or "",
        }
        target = destination / f"{code}_{count + 1:02d}.json"
        target.write_text(json.dumps(page, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        for file_id, title in extractor.file_links:
            if file_id in known_ids or Path(title.lower()).suffix not in SLIDE_EXTENSIONS:
                continue
            try:
                metadata, _ = api_request(f"/api/v1/files/{file_id}", token)
            except CanvasAccessError as error:
                if error.status != 403:
                    raise
                metadata = None
            metadata = metadata if isinstance(metadata, dict) else {}
            course["slides"].append({
                "id": file_id,
                "title": title,
                "content_type": metadata.get("content-type"),
                "size": metadata.get("size"),
                "updated_at": metadata.get("updated_at"),
                "locked": bool(metadata.get("locked") or metadata.get("locked_for_user")),
                "canvas_url": f"{CANVAS}/courses/{course['canvas_course_id']}/files/{file_id}",
                "modules": [{"module": item["module"], "item_title": item["title"]}],
            })
            known_ids.add(file_id)
        count += 1
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {count} private lecture-note pages for {code}.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--download", nargs="+", metavar="FILE_ID", help="Download catalogued decks to private/canvas/<module>/files")
    parser.add_argument("--refresh-existing", action="store_true", help="Re-download selected files and re-extract their text")
    parser.add_argument("--fetch-pages", metavar="MODULE_CODE", help="Save lecture-note Canvas pages privately")
    parser.add_argument("--sync", action="store_true", help="Refresh the catalog and download new or changed available decks")
    parser.add_argument("--modules", nargs="+", metavar="MODULE_CODE", help="Limit --sync downloads to these module codes")
    parser.add_argument("--pending-review", action="store_true", help="List downloaded decks awaiting study-card review")
    parser.add_argument("--queue-review", nargs="+", metavar="FILE_ID", help="Queue cached catalogued decks for review")
    parser.add_argument("--mark-reviewed", nargs="+", metavar="FILE_ID", help="Mark reviewed decks after checking their study material")
    args = parser.parse_args()
    if sum(bool(mode) for mode in (args.download, args.fetch_pages, args.sync, args.pending_review, args.queue_review, args.mark_reviewed)) > 1:
        parser.error("Choose only one download, sync, lecture page, or review action")
    if args.modules and not args.sync:
        parser.error("--modules requires --sync")
    if args.refresh_existing and not args.download:
        parser.error("--refresh-existing requires --download")
    codes = {code.upper() for code in args.modules} if args.modules else None
    if codes and not codes.issubset(MODULE_CODES):
        parser.error("--modules must contain local module codes")
    if args.pending_review:
        pending = [item for item in review_queue().values() if not item["reviewed"]]
        print(f"Pending study-card review: {len(pending)} decks.")
        for item in sorted(pending, key=lambda item: (item["code"], item["file_id"])):
            print(f"  {item['code']} {item['file_id']}: {item['title']}")
        return
    if args.queue_review:
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
        known = {file["id"]: (course["code"], file) for course in catalog["courses"] for file in course["slides"]}
        for file_id in args.queue_review:
            entry = known.get(file_id)
            if not entry:
                raise RuntimeError(f"File ID {file_id} is not in the private catalog.")
            code, file = entry
            suffix = Path(file["title"].lower()).suffix
            if not (CATALOG.parent / code / "files" / f"{file_id}{suffix}").exists():
                raise RuntimeError(f"File ID {file_id} has not been downloaded under {code}.")
            queue_review(code, file)
        print(f"Queued {len(args.queue_review)} cached decks for study-card review.")
        return
    if args.mark_reviewed:
        queue = review_queue()
        for file_id in args.mark_reviewed:
            matches = [key for key, item in queue.items() if item["file_id"] == file_id]
            if not matches:
                raise RuntimeError(f"File ID {file_id} is not in the review queue.")
            for key in matches:
                queue[key]["reviewed"] = True
        save_review_queue(queue)
        print(f"Marked {len(args.mark_reviewed)} decks reviewed.")
        return
    token = access_token()
    if args.download:
        download_files(args.download, token, args.refresh_existing)
        return
    if args.fetch_pages:
        fetch_lecture_pages(args.fetch_pages.upper(), token)
        return
    previous = json.loads(CATALOG.read_text(encoding="utf-8")) if args.sync and CATALOG.exists() else {"courses": []}
    courses = api_list("/api/v1/courses?enrollment_state=active&per_page=100", token)
    matched = [(course, module_code(course)) for course in courses]
    catalog = {
        "canvas_domain": CANVAS,
        "courses": [discover_course(course, code, token) for course, code in matched if code],
        "unmatched_courses": [
            {"id": str(course.get("id")), "name": str(course.get("name") or "")}
            for course, code in matched if not code
        ],
    }
    CATALOG.parent.mkdir(parents=True, exist_ok=True)
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for course in catalog["courses"]:
        if any(
            item["type"] == "Page" and "lecture notes" in item["title"].lower()
            for item in course["other_module_items"]
        ):
            try:
                fetch_lecture_pages(course["code"], token)
            except CanvasAccessError as error:
                print(f"  {course['code']}: {error}", file=sys.stderr)
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    print(f"Saved private Canvas catalog: {len(catalog['courses'])} matching courses, "
          f"{sum(len(course['slides']) for course in catalog['courses'])} candidate slide files, "
          f"{len(catalog['unmatched_courses'])} unmatched courses.")
    for course in catalog["courses"]:
        restrictions = ", ".join(course["restricted_endpoints"]) or "none"
        print(f"  {course['code']}: {len(course['slides'])} candidate slide files; restricted: {restrictions}")
    if args.sync:
        sync_available_files(previous, catalog, token, codes)


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as error:
        print(error, file=sys.stderr)
        raise SystemExit(1)
