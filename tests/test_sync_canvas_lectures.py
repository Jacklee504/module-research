import contextlib
import io
import json
import tempfile
import unittest
import zipfile
from pathlib import Path
from unittest.mock import call, patch

from scripts import sync_canvas_lectures as sync


def deck(file_id, updated_at=None, locked=False):
    return {"id": file_id, "title": f"Lecture {file_id}.pdf", "updated_at": updated_at, "size": 100, "locked": locked}


def catalog(*files):
    return {"courses": [{"code": "CT561", "slides": list(files)}]}


class CanvasSyncTests(unittest.TestCase):
    def test_review_queue_keeps_new_decks_pending(self):
        with tempfile.TemporaryDirectory() as directory:
            queue_path = Path(directory) / "pending_review.json"
            file = {"id": "4", "title": "Lecture.pdf", "canvas_url": "https://example.edu/files/4"}
            with patch.object(sync, "REVIEW_QUEUE", queue_path):
                sync.queue_review("CT561", file)
                self.assertFalse(sync.review_queue()["CT561/4"]["reviewed"])

    def test_hidden_file_link_is_not_treated_as_locked(self):
        files = [{"id": 4, "display_name": "Lecture.pdf", "hidden_for_user": True, "locked": False}]
        with patch.object(sync, "api_list", side_effect=[files, []]):
            course = sync.discover_course({"id": 10}, "CT4101", "token")
        self.assertFalse(course["slides"][0]["locked"])

    def test_updated_inaccessible_deck_is_retried(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            cached = root / "CT561" / "files" / "1.pdf"
            cached.parent.mkdir(parents=True)
            cached.write_bytes(b"older deck")
            previous = catalog(deck("1", "old"))
            current = catalog(deck("1", "new"))
            with patch.object(sync, "CATALOG", root / "catalog.json"), patch.object(sync, "DOWNLOAD_STATE", root / "download_state.json"):
                with patch.object(sync, "download_files", side_effect=sync.CanvasFileUnavailable("locked")) as download:
                    with contextlib.redirect_stdout(io.StringIO()):
                        sync.sync_available_files(previous, current, "token", {"CT561"})
                        sync.sync_available_files(current, current, "token", {"CT561"})
                self.assertEqual(download.call_args_list, [
                    call(["1"], "token", refresh_existing=True),
                    call(["1"], "token", refresh_existing=True),
                ])
                state = json.loads(sync.DOWNLOAD_STATE.read_text(encoding="utf-8"))
                self.assertEqual(state["CT561/1"]["updated_at"], "old")

    def test_new_deck_downloads_and_locked_deck_waits(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            current = catalog(deck("2"), deck("3", locked=True))
            with patch.object(sync, "CATALOG", root / "catalog.json"), patch.object(sync, "DOWNLOAD_STATE", root / "download_state.json"):
                with patch.object(sync, "download_files") as download:
                    with contextlib.redirect_stdout(io.StringIO()):
                        sync.sync_available_files(catalog(), current, "token", {"CT561"})
                download.assert_called_once_with(["2"], "token", refresh_existing=False)

    def test_powerpoint_slide_text_is_extracted(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            deck_path = root / "CT4111" / "files" / "4.pptx"
            deck_path.parent.mkdir(parents=True)
            with zipfile.ZipFile(deck_path, "w") as archive:
                archive.writestr(
                    "ppt/slides/slide1.xml",
                    '<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" '
                    'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
                    '<a:t>First concept</a:t><a:t>Second concept</a:t></p:sld>',
                )
            sync.extract_slide_text(deck_path)
            text = (root / "CT4111" / "text" / "4.txt").read_text(encoding="utf-8")
            self.assertIn("First concept\nSecond concept", text)


if __name__ == "__main__":
    unittest.main()
