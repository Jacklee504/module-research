"""Build a useful home page for the five current study modules."""

from __future__ import annotations

import html
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "study_data"
STUDY_MODULES = ("CT417", "CT4100", "CT4101", "CT561", "CT4111")
PAPER_QUESTIONS = json.loads((DATA_DIR / "paper_questions.json").read_text())

def esc(text: str) -> str:
    return html.escape(text, quote=True)


def load_all() -> list:
    index = json.loads((DATA_DIR / "index.json").read_text())
    modules = {}
    for entry in index["modules"]:
        if entry["code"] not in STUDY_MODULES:
            continue
        data = json.loads((DATA_DIR / (entry["code"] + ".json")).read_text())
        modules[entry["code"]] = data
    return [modules[code] for code in STUDY_MODULES]


def module_card(module: dict) -> str:
    details = module["details"]
    code = module["code"]
    questions = PAPER_QUESTIONS.get(code, [])
    question_total = len(questions) if questions else len(module["families"])
    part_total = sum(len(question["parts"]) for question in questions) if questions else question_total
    first_id = questions[0]["id"] if questions else module["families"][0]["id"]
    cards = sum(len(deck["cards"]) for deck in module["decks"])
    is_outcome = code == "CT4111"
    first = module["families"][0]["title"] if is_outcome else questions[0]["title"]
    assessment = details.get("assessment", "")
    practice_url = "%s/study.html#practice-heading" % code
    cards_url = "%s/study.html#flashcards" % code
    parts = [
        '<article class="study-module-card" data-study-module data-code="%s" data-question-total="%d" data-part-total="%d" data-first-question="%s" data-card-total="%d">'
        % (esc(code), question_total, part_total, esc(first_id), cards),
        '<div class="study-card-top"><span class="study-code">%s</span><span class="study-assessment">%s</span></div>'
        % (esc(code), esc(assessment)),
        '<h3>%s</h3>' % esc(module["name"]),
        '<p class="study-first"><span>%s</span><strong>%s</strong></p>'
        % ("First outcome" if is_outcome else "Start with", esc(first)),
        '<p class="study-next" data-next-copy>Learn the answer, then try it from memory.</p>',
        '<a class="study-main-link" data-primary href="%s">Start studying <span aria-hidden="true">→</span></a>' % practice_url,
        '<div class="study-card-progress" aria-label="Study progress">',
        '<span data-answer-progress>0/%d answers confident</span>' % part_total,
        '<span data-card-progress>0/%d cards</span>' % cards,
    ]
    parts.extend([
        '</div>',
        '<div class="study-card-links">',
        '<a href="%s">%s</a>' % (practice_url, "Outcomes" if is_outcome else "Questions"),
    ])
    if cards:
        parts.append('<a href="%s">Cards</a>' % cards_url)
    if not is_outcome:
        parts.append('<a href="%s/most_asked.html">Question families</a>' % code)
    parts.append('</div></article>')
    return '\n'.join(parts)


def page(modules: list) -> str:
    parts = [
        '<!doctype html>',
        '<html lang="en">',
        '  <head>',
        '    <meta charset="utf-8">',
        '    <meta name="viewport" content="width=device-width, initial-scale=1">',
        '    <meta name="description" content="Continue exam study across your five University of Galway modules.">',
        '    <title>Your Study Desk | Module Research</title>',
        '    <link rel="stylesheet" href="module_research.css">',
        '    <script src="home_study.js" defer></script>',
        '  </head>',
        '  <body class="study-home">',
        '    <header class="page-header study-home-header">',
        '      <div>',
        '        <p class="eyebrow">Module Research · Your five modules</p>',
        '        <h1>Your study desk</h1>',
        '        <p class="lede">Pick a module, attempt its next question, or return to the cards you found difficult.</p>',
        '      </div>',
        '      <nav class="quick-links" aria-label="Page navigation">',
        '        <a href="#modules">Modules</a>',
        '        <a href="lecture_study.html">Lecture study</a>',
        '        <a href="#project">Project</a>',
        '      </nav>',
        '    </header>',
        '',
        '    <main class="study-home-main">',
        '      <section class="study-home-focus" aria-labelledby="continue-heading">',
        '        <div>',
        '          <p class="eyebrow">Pick up here</p>',
        '          <h2 id="continue-heading" data-continue-title>Choose a module to begin</h2>',
        '          <p data-continue-copy>Select a module below. The next time you return, this space will take you back to it.</p>',
        '          <p class="study-home-summary" data-home-summary>Progress appears here after you study. It is saved in this browser.</p>',
        '        </div>',
        '        <a class="study-home-continue-link" data-continue-link href="#modules" hidden>Continue studying <span aria-hidden="true">→</span></a>',
        '      </section>',
        '',
        '      <section class="section" id="modules" aria-labelledby="modules-heading">',
        '        <div class="section-title"><div><p class="eyebrow">Study spaces</p><h2 id="modules-heading">Your modules</h2></div>',
        '          <p class="section-note">Choose a question below. Counts update when you self-check answers or rate recall cards.</p></div>',
        '        <div class="study-home-grid">',
    ]
    for module in modules:
        parts.append(module_card(module))
    parts.append('        </div>')
    parts.append('      </section>')
    parts.append('')
    parts.append('      <aside class="study-home-project" id="project" aria-label="Project reference">')
    parts.append('        <span>Also on this site</span><a href="CT413/details.html">CT413 · Final Year Project <span aria-hidden="true">→</span></a>')
    parts.append('      </aside>')
    parts.append('    </main>')
    parts.append('  </body>')
    parts.append('</html>')
    return '\n'.join(parts) + '\n'


def main() -> None:
    modules = load_all()
    (ROOT / "index.html").write_text(page(modules), encoding="utf-8")
    print("index.html written for %d modules" % len(modules))


if __name__ == "__main__":
    main()
