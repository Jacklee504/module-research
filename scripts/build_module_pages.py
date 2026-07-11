from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OVERVIEW = ROOT / "module_research.md"


def inline_markup(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(
        r"(https?://[^\s<]+)",
        r'<a href="\1">\1</a>',
        escaped,
    )
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    return escaped


def split_front_matter(markdown: str) -> tuple[dict[str, str], str]:
    if not markdown.startswith("---\n"):
        return {}, markdown

    end = markdown.find("\n---\n", 4)
    if end == -1:
        return {}, markdown

    raw = markdown[4:end]
    body = markdown[end + 5 :].lstrip()
    meta: dict[str, str] = {}
    for line in raw.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        key, sep, value = line.partition(":")
        if not sep:
            continue
        meta[key.strip()] = value.strip().strip('"').strip("'")
    return meta, body


def title_from_front_matter(meta: dict[str, str], fallback: str, module_code: str) -> str:
    title = meta.get("title", "").strip()
    code = meta.get("code", module_code).strip()
    if title and not title.startswith(f"{code} - "):
        return f"{code} - {title}"
    return title or fallback


def close_lists(out: list[str], stack: list[str], target_level: int = 0) -> None:
    while len(stack) > target_level:
        out.append(f"</{stack.pop()}>")


def markdown_to_html(markdown: str) -> str:
    out: list[str] = []
    current_list: str | None = None
    paragraph: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            out.append(f"<p>{' '.join(paragraph)}</p>")
            paragraph = []

    def close_current_list() -> None:
        nonlocal current_list
        if current_list:
            out.append(f"</{current_list}>")
            current_list = None

    for raw_line in markdown.splitlines():
        line = raw_line.rstrip()

        if not line.strip():
            flush_paragraph()
            close_current_list()
            continue

        heading = re.match(r"^(#{1,6})\s+(.+)$", line)
        if heading:
            flush_paragraph()
            close_current_list()
            level = min(len(heading.group(1)) + 1, 6)
            text = inline_markup(heading.group(2))
            out.append(f'<h{level}>{text}</h{level}>')
            continue

        bullet = re.match(r"^(\s*)-\s+(.+)$", line)
        numbered = re.match(r"^(\s*)\d+\.\s+(.+)$", line)
        if bullet or numbered:
            flush_paragraph()
            match = bullet or numbered
            assert match is not None
            indent = len(match.group(1).replace("\t", "  "))
            level = indent // 2
            list_type = "ul" if bullet else "ol"
            if current_list != list_type:
                close_current_list()
                current_list = list_type
                out.append(f"<{list_type}>")
            class_attr = f' class="level-{level}"' if level else ""
            out.append(f"<li{class_attr}>{inline_markup(match.group(2))}</li>")
            continue

        close_current_list()
        paragraph.append(inline_markup(line.strip()))

    flush_paragraph()
    close_current_list()
    return "\n".join(out)


def parse_overview() -> dict[str, dict[str, str]]:
    data: dict[str, dict[str, str]] = {}
    for line in OVERVIEW.read_text(encoding="utf-8").splitlines():
        if not line.startswith("| ") or line.startswith("|---"):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if not cells or cells[0] in {"Module", "---"}:
            continue
        code = cells[0]
        if len(cells) == 8 and cells[2] in {"High", "Medium-High", "Unknown"}:
            data[code] = {
                "title": f"{cells[0]} - {cells[1]}",
                "Status": "Optional",
                "Predictability": cells[2],
                "Assessment": f"{cells[3]} exam / {cells[4]} CA",
                "Priority": cells[6],
            }
        elif len(cells) >= 9 and code.startswith(("CT", "CS", "MA")):
            semester = cells[3]
            if semester in {"1", "2"}:
                semester = f"Semester {semester}"
            elif semester == "1 and 2":
                semester = "Semester 1 and Semester 2"
            data[code] = {
                "title": f"{cells[0]} - {cells[1]}",
                "Status": cells[2],
                "Semester": semester,
                "Credits": cells[4],
                "Assessment": f"{cells[5]} exam / {cells[6]} CA",
                "Predictability": "Not assessed",
            }
    return data


def paper_label(pdf_path: Path) -> str:
    match = re.match(r"^(\d{4})[_:-](\d{4})$", pdf_path.stem)
    if not match:
        return pdf_path.stem.replace("_", " ")
    start, end = match.groups()
    return f"{start}/{end[-2:]}"


def paper_links_html(module_dir: Path) -> str:
    papers = sorted(module_dir.glob("*.pdf"), reverse=True)
    if not papers:
        return '<p class="paper-empty">No local past papers stored for this module yet.</p>'
    links = "\n".join(
        f'<a href="{html.escape(pdf.name)}" target="_blank" rel="noopener noreferrer">{html.escape(paper_label(pdf))}</a>'
        for pdf in papers
    )
    return f'<div class="paper-links">{links}</div>'


def split_h2_sections(markdown: str) -> tuple[str, list[tuple[str, str]]]:
    _, markdown = split_front_matter(markdown)
    title = "Module Details"
    sections: list[tuple[str, list[str]]] = []
    current_heading: str | None = None
    current_lines: list[str] = []

    for line in markdown.splitlines():
        if line.startswith("# "):
            title = line[2:].strip()
            continue
        heading = re.match(r"^##\s+(.+)$", line)
        if heading:
            if current_heading is not None:
                sections.append((current_heading, current_lines))
            current_heading = heading.group(1).strip()
            current_lines = []
            continue
        if current_heading is not None:
            current_lines.append(line)

    if current_heading is not None:
        sections.append((current_heading, current_lines))

    return title, [(heading, "\n".join(lines).strip()) for heading, lines in sections]


def build_detail_block(title: str, content: str, open_by_default: bool = False) -> str:
    open_attr = " open" if open_by_default else ""
    return f"""<details class="compact-details"{open_attr}>
          <summary>{html.escape(title)}</summary>
          <div class="details-body">
            {markdown_to_html(content)}
          </div>
        </details>"""


def extract_module_url(markdown: str) -> str | None:
    meta, markdown = split_front_matter(markdown)
    if meta.get("module_url"):
        return meta["module_url"]
    match = re.search(r"Module page checked:\s+(https?://\S+)", markdown)
    if not match:
        match = re.search(r"Source:\s+(https?://\S+)", markdown)
    return match.group(1).rstrip(".") if match else None


def extract_summary(markdown: str, module_code: str, overview: dict[str, dict[str, str]]) -> dict[str, str]:
    meta, markdown = split_front_matter(markdown)
    title = "Module Details"
    for line in markdown.splitlines():
        if line.startswith("# "):
            title = line[2:].strip()
            break

    summary = {
        "Predictability": "Not assessed",
        "Assessment": "See detail",
        "Semester": "See detail",
        "Credits": "See detail",
        "Status": "",
    }
    summary.update(overview.get(module_code, {}))
    summary["title"] = title_from_front_matter(
        meta,
        overview.get(module_code, {}).get("title", title),
        module_code,
    )

    meta_map = {
        "status": "Status",
        "semester": "Semester",
        "credits": "Credits",
        "assessment": "Assessment",
        "predictability": "Predictability",
        "priority": "Priority",
    }
    for front_key, summary_key in meta_map.items():
        if meta.get(front_key):
            summary[summary_key] = meta[front_key]

    for line in markdown.splitlines():
        item = re.match(r"^-\s+([^:]+):\s+(.+)$", line.strip())
        if not item:
            continue
        key, value = item.group(1).strip(), item.group(2).strip()
        if key == "Current semester":
            summary["Semester"] = value.rstrip(".")
        elif key == "Assessment weighting":
            summary["Assessment"] = "See assessment section"
        elif key in summary and summary.get(key) in {"", "See detail", "Not assessed"}:
            summary[key] = value.rstrip(".")

    return summary


def combine_sections(sections: dict[str, str], names: list[str]) -> str:
    found: list[tuple[str, str]] = []
    for name in names:
        content = sections.get(name, "").strip()
        if not content:
            continue
        found.append((name, content))
    chunks: list[str] = []
    for name, content in found:
        if len(found) == 1:
            chunks.append(content)
        else:
            chunks.append(f"### {name}\n\n{content}")
    return "\n\n".join(chunks).strip()


def first_section(sections: dict[str, str], names: list[str]) -> str:
    for name in names:
        content = sections.get(name, "").strip()
        if content:
            return content
    return ""


def build_support_details(sections: dict[str, str]) -> str:
    groups = [
        (
            "Module Information",
            ["Module Page Summary", "Official Module Information", "Semester Note"],
        ),
        (
            "Lecturer / Staff Notes",
            [
                "Lecturer / Personal Note",
                "Lecturer / Staff Change Note",
                "Lecturer / Staff Change Notes",
            ],
        ),
        (
            "Exam / CA Strategy",
            [
                "Assessment Strategy",
                "Exam Strategy",
                "CA / Workload Notes",
                "Workload Notes",
                "Study Strategy",
            ],
        ),
        (
            "Short Learning Material",
            [
                "Short Learning Material",
                "Learning Material",
                "Degreed / Percipio Targets",
            ],
        ),
        (
            "Format / Year Notes",
            [
                "Format Pattern",
                "Exam Format",
                "Past Papers Reviewed",
                "Current-Syllabus Warning",
                "Year-by-Year Notes",
            ],
        ),
        (
            "Linked Module Notes",
            ["Linked Module Notes", "Linked Modules"],
        ),
    ]

    details: list[str] = []
    for title, names in groups:
        content = combine_sections(sections, names)
        if content:
            details.append(build_detail_block(title, content))
    return "\n".join(details)


def build_compact_page(md_path: Path, overview: dict[str, dict[str, str]]) -> str:
    markdown = md_path.read_text(encoding="utf-8")
    module_code = md_path.parent.name
    summary = extract_summary(markdown, module_code, overview)
    title = html.escape(summary["title"])
    module_url = extract_module_url(markdown)
    linked_title = (
        f'<a href="{html.escape(module_url)}">{title}</a>'
        if module_url
        else title
    )
    papers = paper_links_html(md_path.parent)
    _, section_pairs = split_h2_sections(markdown)
    sections = dict(section_pairs)

    facts = [
        ("Status", summary.get("Status", "Optional") or "Optional"),
        ("Semester", summary["Semester"]),
        ("Credits", summary["Credits"]),
        ("Assessment", summary["Assessment"]),
        ("Predictability", summary["Predictability"]),
    ]
    fact_html = "\n".join(
        f"<div><span>{html.escape(label)}</span><strong>{html.escape(value)}</strong></div>"
        for label, value in facts
    )

    decision_source = first_section(
        sections,
        ["Quick Decision", "Recommendation", "Overall Judgement", "Bottom Line", "High-Level View"],
    )
    repetition_source = first_section(
        sections,
        ["Exam Repetition", "Predictability Rating", "Predictability Judgment"],
    )
    topics_source = combine_sections(
        sections,
        [
            "Repetitive Topics",
            "Repeated Question Patterns",
            "Evidence From Past Papers",
            "Past Paper Pattern",
            "Evidence Available",
        ],
    )

    decision_html = markdown_to_html(decision_source)
    repetition_html = markdown_to_html(
        repetition_source
        or "No repeated-paper pattern has been established for this module yet."
    )
    topics_html = (
        build_detail_block(
            "Repetitive Topics To Drill",
            topics_source,
            open_by_default=True,
        )
        if topics_source
        else ""
    )
    support_html = build_support_details(sections)

    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{title}</title>
    <link rel="stylesheet" href="../module_page.css">
  </head>
  <body>
    <header class="module-header compact-module-header">
      <nav class="top-nav" aria-label="Navigation">
        <a href="../module_research.html">Overview</a>
        <a href="#past-papers">Past Papers</a>
        <a href="details.md">Markdown</a>
      </nav>
      <p class="eyebrow">{html.escape(module_code)}</p>
      <h1>{linked_title}</h1>
      <div class="fact-strip">
        {fact_html}
      </div>
    </header>
    <main class="module-shell compact-module-shell">
      <section class="decision-summary" aria-labelledby="quick-decision-heading">
        <div>
          <p class="eyebrow">Decision View</p>
          <h2 id="quick-decision-heading">Quick Decision</h2>
        </div>
        <div class="decision-content">
          {decision_html}
        </div>
      </section>
      <section class="exam-repeat-panel" aria-labelledby="exam-repetition-heading">
        <p class="eyebrow">Exam Pattern</p>
        <h2 id="exam-repetition-heading">Exam Repetition</h2>
        {repetition_html}
      </section>
      {f'<section class="topic-stack" aria-label="Detailed repetitive topics">{topics_html}</section>' if topics_html else ''}
      <section id="past-papers" class="paper-panel compact-paper-panel" aria-labelledby="past-papers-heading">
        <div>
          <p class="eyebrow">Local Archive</p>
          <h2 id="past-papers-heading">Past Papers</h2>
        </div>
        {papers}
      </section>
      <section class="supporting-details" aria-label="Supporting module details">
        {support_html}
      </section>
    </main>
  </body>
</html>
"""


def build_page(md_path: Path, overview: dict[str, dict[str, str]]) -> str:
    return build_compact_page(md_path, overview)


def main() -> None:
    overview = parse_overview()
    for md_path in sorted(ROOT.glob("*/details.md")):
        html_path = md_path.with_name("details.html")
        html_path.write_text(build_page(md_path, overview), encoding="utf-8")
        print(html_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
