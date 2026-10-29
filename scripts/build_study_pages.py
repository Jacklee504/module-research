"""Generate each module's exam study space from the shared study data.

Every module gets the same study page: an exam briefing, the recurring
question families in priority order, paper-derived practice with mark
allocations, and the drillable card bank. The page is a thin shell; the
shared `study_space.js` and `study_space.css` do the rendering.
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "study_data"

MODULES = [
    "CS402", "CS4423", "CT4100", "CT4101", "CT4104", "CT4108", "CT4111",
    "CT413", "CT417", "CT420", "CT421", "CT561", "MA342", "MA3491",
    "MA4102", "MA4344", "MA490",
]

# Modules whose assessment is not an end-of-module written paper.
NO_EXAM = {"CT413"}
FOCUSED = {"CT417", "CT4100", "CT4101", "CT561", "CT4111"}


def esc(text: str) -> str:
    return html.escape(text, quote=True)


def nav(code: str, data: dict) -> str:
    if code in FOCUSED:
        return '<a href="../index.html">Study desk</a><a href="details.html">Module details</a>'
    links = [
        ('../index.html', 'Overview'),
        ('details.html', 'Module details'),
    ]
    if (ROOT / code / "details.html").exists():
        pass
    else:
        links = [('../index.html', 'Overview')]
    if (ROOT / code / "most_asked.html").exists():
        links.append(('most_asked.html', 'Question families'))
    if (ROOT / code / "flashcards.html").exists():
        links.append(('flashcards.html', 'Printable cards'))
    if (ROOT / code / "revision_questions.html").exists():
        links.append(('revision_questions.html', 'Revision questions'))
    return "".join(
        '<a href="%s">%s</a>' % (esc(href), esc(label)) for href, label in links
    )


def page(code: str, data: dict) -> str:
    details = data["details"]
    name = data["name"]
    title = "%s Study Space | Module Research" % code
    heading = "Outcome Study Space" if code == "CT4111" else "Exam Study Space" if code not in NO_EXAM else "Project Study Space"

    if code in NO_EXAM:
        intro = (
            "This module is assessed entirely by continuous assessment, so there "
            "is no past-paper drill here. Use the guides and planning material "
            "to structure the project itself."
        )
    elif code == "CT4111":
        intro = (
            "Work through official learning outcomes and lecturer-focus questions. "
            "Write an answer, use relevant cards, then self-check. No past papers are presented here."
        )
    elif code in FOCUSED:
        intro = (
            "Choose a past-paper or lecturer-focus question. Write your answer, "
            "use relevant cards, then reveal and self-check. Paper questions keep their original marks."
        )
    else:
        intro = (
            "Work through the recurring question families in priority order, "
            "attempt the paper-derived practice under its mark allocation, then "
            "drill the cards you keep getting wrong."
        )

    body = [
        '<!doctype html>',
        '<html lang="en">',
        '<head><meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<meta name="description" content="%s for %s %s: %s and drillable cards.">' %
        ('Outcome study space' if code == 'CT4111' else 'Exam study space', esc(code), esc(name), 'official-outcome practice' if code == 'CT4111' else 'past-paper questions and self-checking'),
        '<title>%s</title>' % esc(title),
        '<link rel="stylesheet" href="../module_page.css">',
        '<link rel="stylesheet" href="../study_space.css">',
        '</head>',
        '<body>',
        '<header class="module-header study-space-header">',
        '<nav class="top-nav" aria-label="Navigation">%s</nav>' % nav(code, data),
        '<p class="eyebrow">%s · %s</p>' % (esc(code), esc(heading)),
        '<h1>%s</h1>' % esc(name),
        '<p>%s</p>' % esc(intro),
        '</header>',
        '<main class="module-shell study-space-shell" data-study-space data-module="%s">' % esc(code),
        '<noscript><p class="study-noscript">This study space needs JavaScript for the drill. '
        + ('The <a href="revision_questions.html">revision question bank</a> remains available without it.'
           if code == "CT4111" else
           'The <a href="details.html">module details</a> and printable guides remain available without it.')
        + '</p></noscript>',
        '</main>',
        '<script src="../study_space.js" defer></script>',
        '</body></html>',
    ]
    return "\n".join(body) + "\n"


def main() -> None:
    targets = sys.argv[1:] or MODULES
    for code in targets:
        if code not in MODULES:
            raise SystemExit("Unknown module: %s" % code)
        data = json.loads((DATA_DIR / (code + ".json")).read_text(encoding="utf-8"))
        target = ROOT / code / "study.html"
        target.write_text(page(code, data), encoding="utf-8")
        print("%-7s study.html written" % code)


if __name__ == "__main__":
    main()
