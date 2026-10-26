"""Build the exam-study data layer from the local paper evidence.

The study spaces are data-driven: this script reads each module's own
`most_asked.html`, `flashcards.html` and `details.html`, and writes a
`study_data/<module>.json` file that the shared study player renders.

Nothing here invents exam content. Every family, frequency note, mark
allocation and answer frame is copied from the module's existing local
material, so the new study pages follow the papers' own wording.
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "study_data"

MODULES = [
    "CS402", "CS4423", "CT4100", "CT4101", "CT4104", "CT4108", "CT4111",
    "CT413", "CT417", "CT420", "CT421", "CT561", "MA342", "MA3491",
    "MA4102", "MA4344", "MA490",
]

CT4111_ANSWER_CHECKLISTS = [
    "Name the lifecycle task and the proposed AI contribution. Check its claims against requirements, code, tests and trusted sources; identify a failure mode and the accountable engineer.",
    "State the lifecycle stage, inputs and constraints. Use AI to draft options, then validate each artefact with stakeholders, tests, quality attributes and a named human decision.",
    "Define observable behaviour and quality criteria. Review generated code for correctness, readability, coupling, errors and security; run focused tests including invalid and boundary cases.",
    "Keep experiments isolated and changes reviewable. Link the requirement, inspect the diff, test in a safe environment, document the decision and plan a complete rollback, including schema changes.",
    "Define a fair comparison and a baseline. Measure task time, defects, review effort and maintainability as well as developer experience; explain bias, uncertainty and what the result cannot show.",
    "Identify affected people and data, then the privacy, legal, security and professional risks. Specify permitted tools, minimised inputs, human review, audit evidence and residual risk.",
    "Record context, alternatives, decision criteria, evidence, trade-offs and safeguards. Explain the decision to the team, assign accountability and set a review point.",
]

CT4111_CARDS = [
    ("Why is fluent AI output not evidence of correctness?", "Fluency says nothing about fit to the actual system. Check claims against requirements, code, tests and trusted sources."),
    ("How do hallucinated APIs differ from omitted edge cases?", "A hallucinated API invents a capability; an omitted edge case misses valid or failing behaviour. Verify the API in documentation and test boundaries."),
    ("What should move an AI suggestion into an accepted engineering decision?", "Evidence from the real system, explicit criteria, tests and accountable human review."),
    ("What makes an AI drafted requirement testable?", "A clear stakeholder need, specific behaviour, constraints and an observable acceptance condition."),
    ("How should AI suggested architectures be compared?", "Compare against requirements, constraints and measurable quality attributes; verify claims and record trade-offs."),
    ("What must happen before an AI assisted change reaches deployment?", "Review the diff, verify requirements and tests, check security and compatibility, then use an accountable release gate."),
    ("Why does high test coverage not prove generated code is correct?", "Coverage shows execution, not correct expected results or missing requirements. Check assertions, invalid inputs and boundary cases."),
    ("What belongs in a quality gate for generated code?", "Focused unit and integration tests, static and security checks, readability review and a human explanation of the change."),
    ("When should correct AI generated code still be rewritten?", "When its coupling, error handling or unfamiliar abstractions make it hard to maintain or inconsistent with the codebase."),
    ("Why isolate AI generated implementation experiments?", "Isolation lets reviewers compare alternatives, reproduce results and discard a poor option without contaminating the main change."),
    ("What does a complete rollback plan cover?", "Application version, database or data changes, configuration and verification that the previous behaviour is restored."),
    ("What makes an AI assisted change reviewable?", "A bounded task, clear diff, linked requirement, evidence from tests and security checks, and a human rationale."),
    ("Why is ticket speed alone a weak measure of AI assistance?", "It misses defects, review time, task difficulty and later maintenance cost."),
    ("How can selection bias flatter an AI pilot?", "If easier tasks or more experienced developers enter the AI group, their better results may not be caused by the tool."),
    ("Why is test compilation a weak test quality measure?", "Compiled tests may assert the wrong result or miss failures; inspect the oracle, coverage of decisions and fault detection."),
    ("What is wrong with pasting a confidential log into a public AI prompt?", "It can expose customer data or secrets. Minimise and redact context and use an approved tool and access path."),
    ("What must be checked before using an AI suggested package?", "Provenance, licence, approval, known vulnerabilities, maintenance and fit with the project."),
    ("Who remains accountable for AI assisted engineering work?", "Named people who review, approve and can explain the decision, its evidence and its risks."),
    ("What belongs in an architecture decision record?", "Context, alternatives, criteria, chosen option, evidence, trade-offs, consequences and review date."),
    ("How should a team resolve conflicting AI suggestions?", "Compare both against requirements, architecture constraints and evidence, then record the human decision."),
    ("What should a team agreement for GenAI cover?", "Permitted tools, data boundaries, review and testing expectations, documentation and escalation of uncertain output."),
]


def strip_tags(fragment: str) -> str:
    """Return the visible text of an HTML fragment."""
    text = re.sub(r"<[^>]+>", " ", fragment)
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "topic"


def normalise_title(text: str) -> str:
    """Turn 'Priority 1 - Vector Space Model' into 'Vector Space Model'."""
    text = re.sub(r"^\s*priority\s+\d+\s*[-–—:.]\s*", "", text, flags=re.I)
    text = re.sub(r"^\s*\d+\s*[.)]\s*", "", text)
    return text.strip(" -–—:.")


def rank_of(text: str):
    match = re.search(r"priority\s+(\d+)", text, flags=re.I)
    if match:
        return int(match.group(1))
    match = re.match(r"^\s*(\d+)\s*[.)]", text)
    if match:
        return int(match.group(1))
    return None


def section_html(page: str, heading_id: str) -> str:
    """Return the HTML that follows a heading with the given id."""
    marker = 'id="%s"' % heading_id
    index = page.find(marker)
    if index == -1:
        return ""
    start = page.find(">", index)
    if start == -1:
        return ""
    for match in re.finditer(r"<h2\b[^>]*>", page[start:]):
        if match.start() > 0:
            return page[start:start + match.start()]
    return page[start:]


def parse_marks(text: str) -> int:
    """Sum the marks mentioned in a paper-appearance line."""
    total = 0
    for group in re.findall(r"\[([^\]]*)\]", text):
        for number in re.findall(r"(\d+)", group):
            total += int(number)
    return total


def parse_frequency(text: str) -> str:
    match = re.search(r"([\d]+\s*/\s*[\d]+)", text)
    return match.group(1).replace(" ", "") if match else ""


def extract_families(page: str) -> list:
    """Pull the priority question families out of a `most_asked.html` page."""
    families = []
    seen = set()

    for match in re.finditer(r"<h2([^>]*)>(.*?)</h2>", page, flags=re.S):
        attrs, inner = match.group(1), match.group(2)
        if "id=" not in attrs:
            continue
        heading_id = re.search(r'id="([^"]+)"', attrs).group(1)
        heading_text = strip_tags(inner)
        if not heading_text or heading_text.lower().startswith("how to use"):
            continue
        if re.match(r"^(recommended study order|coverage map|scope\b|legacy|backup|flashcard rule)", heading_text, flags=re.I):
            continue

        body = section_html(page, heading_id)
        if not body:
            continue

        frequency = ""
        frequency_match = re.search(r"<strong>Frequency:</strong>(.*?)</p>", body, flags=re.S)
        if frequency_match:
            frequency = parse_frequency(strip_tags(frequency_match.group(1)))
        if not frequency:
            note = re.search(r"<strong>Current recurrence:</strong>(.*?)</p>", body, flags=re.S)
            if note:
                frequency = parse_frequency(strip_tags(note.group(1)))

        appearances = []
        paper_list = re.search(r'<ul class="paper-list">(.*?)</ul>', body, flags=re.S)
        if paper_list:
            for item in re.findall(r"<li[^>]*>(.*?)</li>", paper_list.group(1), flags=re.S):
                text = strip_tags(item)
                if text:
                    appearances.append(text)

        question = ""
        quote = re.search(r"<blockquote[^>]*>(.*?)</blockquote>", body, flags=re.S)
        if quote:
            question = strip_tags(quote.group(1))

        frame = ""
        frame_match = re.search(r'<div class="answer-frame">(.*?)</div>', body, flags=re.S)
        if frame_match:
            frame = strip_tags(frame_match.group(1))

        title = normalise_title(heading_text)
        key = slugify(title)
        if key in seen:
            continue
        seen.add(key)

        families.append({
            "id": key,
            "rank": rank_of(heading_text),
            "title": title,
            "frequency": frequency,
            "appearances": appearances,
            "marks": sum(parse_marks(item) for item in appearances),
            "question": question,
            "answer": frame,
        })

    return families


def extract_cards(page: str) -> list:
    """Pull printable flashcard rows out of a `flashcards.html` page."""
    cards = []
    current_group = "Core concepts"
    for match in re.finditer(r"<h2([^>]*)>(.*?)</h2>(.*?)(?=<h2|\Z)", page, flags=re.S):
        attrs, inner, body = match.group(1), match.group(2), match.group(3)
        heading_text = strip_tags(inner)
        lowered = heading_text.lower()
        if not heading_text or lowered.startswith("how to use") or lowered == "scope":
            continue
        if "id=" in attrs:
            current_group = normalise_title(heading_text)
        for row in re.findall(r"<tr>(.*?)</tr>", body, flags=re.S):
            cells = [strip_tags(cell) for cell in re.findall(r"<td[^>]*>(.*?)</td>", row, flags=re.S)]
            if len(cells) < 2:
                continue
            cards.append({
                "group": current_group,
                "front": cells[0],
                "back": cells[1],
                "evidence": cells[2] if len(cells) > 2 else "",
            })
    return cards


def extract_details(page: str) -> dict:
    """Pull the exam-level facts out of a `details.html` page."""
    facts = {}
    for label, key in (("Status", "status"), ("Semester", "semester"), ("Credits", "credits"),
                       ("Assessment", "assessment"), ("Predictability", "predictability")):
        match = re.search(r"%s</span><strong>(.*?)</strong>" % label, page, flags=re.S)
        if match:
            facts[key] = strip_tags(match.group(1))

    match = re.search(
        r'<h2 id="exam-repetition-heading">[^<]*</h2>\s*<p[^>]*>(.*?)</p>',
        page, flags=re.S)
    if match:
        facts["exam_pattern"] = strip_tags(match.group(1))

    match = re.search(r"<h1>\s*(?:<a[^>]*>)?(.*?)(?:</a>)?\s*</h1>", page, flags=re.S)
    if match:
        facts["title"] = strip_tags(match.group(1))

    facts["papers"] = sorted(set(re.findall(r'href="(\d{4}[_:]?\d{4}\.pdf)"', page)))
    facts["guides"] = sorted(set(re.findall(r'href="([a-z0-9_]+_revision_sheet\.html)"', page)))

    # The exam block can carry an explicit per-question structure.
    block = re.search(
        r'<h2 id="exam-repetition-heading">[^<]*</h2>(.*?)</section>',
        page,
        flags=re.S,
    )
    if block:
        facts["exam_block"] = [strip_tags(item) for item in
                               re.findall(r"<li[^>]*>(.*?)</li>", block.group(1), flags=re.S)]

    drill = re.search(
        r'Repetitive Topics To Drill</summary>\s*<div class="details-body">\s*<ul>(.*?)</ul>',
        page,
        flags=re.S,
    )
    if drill:
        facts["drill"] = [strip_tags(item) for item in
                          re.findall(r"<li[^>]*>(.*?)</li>", drill.group(1), flags=re.S)]

    facts["paper_format"] = extract_paper_format(page, facts)
    facts["exam_shape"] = classify_shape(facts)
    return facts


def classify_shape(facts: dict) -> str:
    """Classify how the paper is put together, which decides how to revise."""
    if not facts.get("papers"):
        return "noarchive"
    text = (facts.get("paper_format") or "").lower()
    if not text:
        return "mixed"
    if "compulsory" in text:
        return "compulsory"
    if ("choose" in text or "answer any" in text or "two of three" in text
            or "answer all" in text or "answer three of four" in text
            or "out of 4" in text or "short-question menu" in text):
        return "choice"
    return "mixed"


FORMAT_PATTERN = re.compile(
    r"answer (?:all|any) [^.;]{0,60}questions?[^.;]{0,60}\.|"
    r"answer (?:two|three|four) of (?:three|four)[^.;]{0,60}\.|"
    r"choose (?:two|three) of (?:three|four)[^.;]{0,60}\.|"
    r"Q1 is compulsory[^.;]{0,80}\.|"
    r"Question 1 became compulsory[^.;]{0,80}\.|"
    r"broad short-question menu[^.;]{0,60}\.|"
    r"answer three of four[^.;]{0,60}\.|"
    r"answer all four[^.;]{0,60}\.|"
    r"answer all questions[^.;]{0,60}\.|"
    r"answer any 3[^.;]{0,60}\.|"
    r"answer any three[^.;]{0,60}\.|"
    r"four broad questions[^.;]{0,60}\.|"
    r"same answer-all-four structure[^.;]{0,60}\.|"
    r"exam format is stable[^.;]{0,60}\.|"
    r"all questions are equally weighted[^.;]{0,60}\.|"
    r"ask 3 questions out of 4[^.;]{0,60}\.|"
    r"two of three questions in each section[^.;]{0,60}\.|"
    r"[a-z ]*compulsory-question format[^.;]{0,60}\.|"
    r"broad short-question menu[^.;]{0,120}\.|"
    r"Q1: answer five short questions[^.;]{0,120}\.|"
    r"Q1: [^.;]{0,120}\.|"
    r"Q1 is reliably[^.;]{0,120}\.|"
    r"[a-z ]*question[^.;]{0,40}format[^.;]{0,60}\.|"
    r"[a-z ]*question, [0-9]{2,3}-mark format[^.;]{0,40}\.|"
    r"current seven-question[^.;]{0,60}\.",
    flags=re.I,
)


def extract_paper_format(page: str, facts: dict) -> str:
    """Find the sentence that states how the paper is put together."""
    candidates = []
    for line in facts.get("drill") or []:
        candidates.append(line)
    for line in facts.get("exam_block") or []:
        candidates.append(line)
    pattern = facts.get("exam_pattern") or ""
    candidates.append(pattern)
    paper_format = re.search(r"Paper Format</h4>\s*<ul>\s*<li>(.*?)</li>", page, flags=re.S)
    if paper_format:
        candidates.append(strip_tags(paper_format.group(1)))
    for item in re.findall(r"<li[^>]*>(.*?)</li>", page, flags=re.S):
        candidates.append(strip_tags(item))

    for candidate in candidates:
        match = FORMAT_PATTERN.search(candidate)
        if match:
            found = match.group(0).strip().rstrip(".")
            # Skip statements that say the format cannot be predicted.
            if "predict" in found.lower() and "question format" in found.lower():
                continue
            return found
    return ""


def module_title(code: str, details: dict) -> str:
    title = details.get("title", "")
    title = re.sub(r"^%s\s*[-–—]\s*" % code, "", title).strip()
    if not title:
        # Some modules have no details page, so fall back to the study space.
        title = details.get("study_title", "")
    return title or code


# Headings that carry a single drillable practice prompt.
PRACTICE_HEADINGS = re.compile(
    r"practice|paper-style synthesis|exam bridge|worked example|"
    r"worked starter question|graduated practice",
    flags=re.I,
)


def extract_sheet_practice(page: str) -> list:
    """Pull the paper-derived practice prompts out of a revision sheet."""
    practice = []
    for level, heading, body in sheet_sections(page):
        if not PRACTICE_HEADINGS.search(heading):
            continue
        prompt = ""
        for label in ("Prompt", "Task", "Scenario and demand", "Question demand",
                      "Scenario", "Question", "Prompt 1"):
            prompt_match = re.search(
                r"<strong>%s[.:]?</strong>(.*?)(?:<strong>|\Z)" % re.escape(label),
                body, flags=re.S)
            if prompt_match:
                break
        if prompt_match:
            prompt = strip_tags(prompt_match.group(1))
        if not prompt:
            first = re.search(r"<p[^>]*>(.*?)</p>", body, flags=re.S)
            if first:
                prompt = strip_tags(first.group(1))

        route = ""
        for label in ("Question-demand diagnosis", "Fastest route", "Topic-specific trap"):
            found = re.search(r"<strong>%s[.:]?</strong>(.*?)</p>" % label, body, flags=re.S)
            if found:
                route = (route + " " + strip_tags(found.group(1))).strip()
        if not route:
            found = re.search(
                r"<strong>Question-demand diagnosis and fastest route:</strong>(.*?)(?:<strong>|\Z)",
                body, flags=re.S)
            if found:
                route = strip_tags(found.group(1))
        if not route:
            found = re.search(r"<strong>Plan/choice:</strong>(.*?)(?:<strong>|\Z)", body, flags=re.S)
            if found:
                route = strip_tags(found.group(1))

        answer = ""
        synthesis = re.search(r"<p>Paper-style synthesis:(.*?)</p>", body, flags=re.S)
        if synthesis:
            answer = strip_tags(synthesis.group(1))
        if not answer:
            model = re.search(r"<h3[^>]*>Model answer</h3>(.*?)(?=<h3|<h2|\Z)", body, flags=re.S)
            if model:
                answer = strip_tags(model.group(1))[:1200]
        if not answer:
            # Some templates put the model answer in the paragraph after the
            # prompt paragraph, without a "Paper-style synthesis" label.
            paragraphs = re.findall(r"<p[^>]*>(.*?)</p>", body, flags=re.S)
            for paragraph in paragraphs[1:]:
                text = strip_tags(paragraph)
                if text and "Question-demand diagnosis" not in text:
                    answer = text
                    break
        if not answer:
            # "Exam bridge" and "Check:" templates keep the answer inline.
            check = re.search(r"<strong>Check:</strong>(.*?)(?:</p>|\Z)", body, flags=re.S)
            if check:
                answer = strip_tags(check.group(1))
        if not answer:
            found = re.search(r"<strong>Worked answer:</strong>(.*?)(?:<strong>|\Z)", body, flags=re.S)
            if found:
                answer = strip_tags(found.group(1))
        if not answer:
            found = re.search(r"<strong>Model answer</strong>(.*?)(?:<strong>|<h|\Z)", body, flags=re.S)
            if found:
                answer = strip_tags(found.group(1))
        if not answer and route:
            # The scenario template answers inside the diagnosis paragraph.
            answer = route
        if not prompt and not answer:
            first = re.search(r"^(.*?)(?:<strong>Check:|\Z)", strip_tags(body), flags=re.S)
            if first:
                prompt = first.group(1).strip()
        if not route and answer:
            route = answer

        marks = 0
        mark_match = re.search(r"\[(\d+)\s*marks?\]", heading)
        if mark_match:
            marks = int(mark_match.group(1))
        if not marks:
            # Several templates put the mark allocation in the body instead
            # of the heading, e.g. "... [8 marks]".
            mark_match = re.search(r"\[(\d+)\s*marks?\]", strip_tags(body))
            if mark_match:
                marks = int(mark_match.group(1))
        if not marks:
            mark_match = re.search(r"—\s*(\d+)\s*marks", heading)
            if mark_match:
                marks = int(mark_match.group(1))

        if not prompt and not answer:
            continue
        practice.append({
            "title": heading,
            "marks": marks,
            "prompt": prompt,
            "route": route,
            "answer": answer,
        })
    return practice


def sheet_sections(page: str):
    """Yield (level, heading, body) for each heading section in a page."""
    pattern = r"<(h2|h3|h4)[^>]*>(.*?)</\1>(.*?)(?=<h2|<h3|<h4|\Z)"
    for match in re.finditer(pattern, page, flags=re.S):
        yield match.group(1), strip_tags(match.group(2)), match.group(3)


STRUCTURE_HEADINGS = (
    "repeated recent-paper structure",
    "repeated recent paper structure",
    "recent-paper structure",
    "paper-backed question forms",
    "what repeatedly appears in the papers",
    "question families to prepare",
)


def extract_sheet_structure(page: str, group: str) -> list:
    """Pull the repeated exam structure out of a paper-based topic guide."""
    items = []
    for level, heading, body in sheet_sections(page):
        if heading.lower().strip() not in STRUCTURE_HEADINGS:
            continue
        for entry in re.findall(r"<li[^>]*>(.*?)</li>", body, flags=re.S):
            text = strip_tags(entry)
            if not text:
                continue
            marks = 0
            mark_match = re.search(r"\[(\d+)(?:\s*-\s*(\d+))?\]", text)
            if mark_match:
                marks = int(mark_match.group(2) or mark_match.group(1))
            label = ""
            label_match = re.match(r"^([A-Z][^:]{2,50}):", text)
            if label_match:
                label = label_match.group(1).strip()
            items.append({
                "title": label or heading,
                "marks": marks,
                "prompt": text,
                "route": "",
                "answer": "",
            })
    return items


def extract_sheet_mistakes(page: str) -> list:
    """Pull the 'Mistakes' list out of a revision sheet."""
    for match in re.finditer(r"<h2[^>]*>(.*?)</h2>(.*?)(?=<h2|\Z)", page, flags=re.S):
        heading = strip_tags(match.group(1)).lower()
        if heading not in {"mistakes", "common mistakes", "high-value traps and corrections",
                           "topic-specific traps and diagnosis", "high-value traps and final review",
                           "common errors"}:
            continue
        items = [strip_tags(item) for item in
                 re.findall(r"<li[^>]*>(.*?)</li>", match.group(2), flags=re.S)]
        if items:
            return items
    return []


def extract_sheet_purpose(page: str) -> str:
    """Pull the one-line exam purpose from a revision sheet."""
    for match in re.finditer(r"<h2[^>]*>(.*?)</h2>(.*?)(?=<h2|\Z)", page, flags=re.S):
        heading = strip_tags(match.group(1)).lower()
        if heading not in {"purpose", "purpose and relevance", "purpose and module relevance",
                           "purpose, scope and examiner demand"}:
            continue
        first = re.search(r"<p[^>]*>(.*?)</p>", match.group(2), flags=re.S)
        if first:
            return strip_tags(first.group(1))
    return ""


def extract_sheet_refresher(page: str) -> list:
    """Pull the 'Rapid exam refresher' bullets from a revision sheet."""
    for match in re.finditer(r"<h2[^>]*>(.*?)</h2>(.*?)(?=<h2|\Z)", page, flags=re.S):
        heading = strip_tags(match.group(1)).lower()
        if heading not in {"rapid exam refresher", "rapid refresher", "rapid refresher: the control map"}:
            continue
        items = [strip_tags(item) for item in
                 re.findall(r"<li[^>]*>(.*?)</li>", match.group(2), flags=re.S)]
        if items:
            return items
    return []


def sheet_title(page: str, fallback: str) -> str:
    """Return the revision sheet's own title, falling back to its filename."""
    match = re.search(r"<h1[^>]*>(.*?)</h1>", page, flags=re.S)
    if match:
        title = strip_tags(match.group(1))
        if title:
            return title
    return fallback.replace("_revision_sheet", "").replace("_", " ").title()


def extract_study_topics(page):
    """Pull the topic families out of a `study.html` topic list."""
    topics = []
    pattern = r"<li><strong>(.*?)</strong><p>(.*?)</p>(.*?)</li>"
    for match in re.finditer(pattern, page, flags=re.S):
        title = strip_tags(match.group(1))
        prompt = strip_tags(match.group(2))
        body = match.group(3)
        answer = ""
        detail = r'<details class="study-answer"><summary>(.*?)</summary>(.*?)</details>'
        answer_match = re.search(detail, body, flags=re.S)
        if answer_match:
            answer = strip_tags(answer_match.group(2))
        links = [strip_tags(item) for item in
                 re.findall(r'<a[^>]*>(.*?)</a>', body, flags=re.S)]
        if not title or not prompt:
            continue
        topics.append({
            "id": slugify(title),
            "title": title,
            "question": prompt,
            "answer": answer,
            "links": [link for link in links if link],
        })
    return topics


def extract_ct4111_revision_bank(page: str) -> tuple[list, list, list]:
    """Use the stable official-outcome bank, which has no past-paper marks."""
    families, cards, all_practice = [], [], []
    sections = re.findall(
        r"<h3>(\d+)\.\s*(.*?)</h3>(.*?)(?=<h3>|<h2|\Z)",
        page,
        flags=re.S,
    )
    for number_text, heading, body in sections:
        number = int(number_text)
        if number > len(CT4111_ANSWER_CHECKLISTS):
            continue
        title = strip_tags(heading)
        outcome_match = re.search(r"<em>(.*?)</em>", body, flags=re.S)
        outcome = strip_tags(outcome_match.group(1)) if outcome_match else title
        prompts = [strip_tags(item) for item in re.findall(r"<li>(.*?)</li>", body, flags=re.S)]
        checklist = CT4111_ANSWER_CHECKLISTS[number - 1]
        families.append({
            "id": slugify(title), "rank": number, "title": title,
            "frequency": "", "appearances": [], "marks": 0,
            "question": outcome, "answer": checklist,
        })
        all_practice.extend(
            {"title": "%s · Question %d" % (title, index), "prompt": prompt,
             "route": checklist, "answer": "", "marks": 0}
            for index, prompt in enumerate(prompts, start=1)
        )
        for front, back in CT4111_CARDS[(number - 1) * 3:number * 3]:
            cards.append({"group": title, "front": front, "back": back,
                          "evidence": "Official outcome %d and revision question bank" % number})
    sheets = [{
        "file": "revision_questions.html", "title": "Official outcome question bank",
        "purpose": "Scenario questions based on the seven official outcomes",
        "refresher": [], "mistakes": [], "practice": all_practice,
    }]
    return families, sheets, cards


def extract_inline_cards(page):
    """Pull the inline flashcard template out of a `study.html` page."""
    cards = []
    pattern = r"<article data-flashcard([^>]*)>(.*?)</article>"
    for match in re.finditer(pattern, page, flags=re.S):
        attrs, body = match.group(1), match.group(2)
        front = re.search(r'<div data-card-front>(.*?)</div>', body, flags=re.S)
        back = re.search(r'<div data-card-back>(.*?)</div>', body, flags=re.S)
        if not front or not back:
            continue
        group = re.search(r'data-group="([^"]*)"', attrs)
        evidence = re.search(r'data-evidence="([^"]*)"', attrs)
        kind = re.search(r'data-kind="([^"]*)"', attrs)
        cards.append({
            "group": group.group(1) if group else "Core concepts",
            "front": strip_tags(front.group(1)),
            "back": strip_tags(back.group(1)),
            "evidence": evidence.group(1) if evidence else "",
            "kind": kind.group(1) if kind else "lecture",
        })
    return cards


DEFINITION_HEADINGS = (
    "definitions",
    "key terms",
    "definitions, notation and discriminating comparisons",
    "prerequisites, vocabulary and formulas",
    "part-by-part recall: definitions, assumptions and mechanics",
    "terms and formulas",
    "notation and derivation",
    "formulas",
)


def extract_sheet_cards(page, group):
    """Build recall cards from a revision sheet's definitional content."""
    cards = []
    for heading in DEFINITION_HEADINGS:
        match = re.search(
            r"<h2[^>]*>%s</h2>(.*?)(?=<h2|\Z)" % re.escape(heading),
            page,
            flags=re.S | re.I,
        )
        if not match:
            continue
        body = match.group(1)
        for item in re.findall(r"<li[^>]*>(.*?)</li>", body, flags=re.S):
            front, back = split_definition(strip_tags(item))
            if front:
                cards.append({"group": group, "front": front, "back": back, "evidence": ""})
        for paragraph in re.findall(r"<p[^>]*>(.*?)</p>", body, flags=re.S):
            front, back = split_definition(strip_tags(paragraph))
            if front:
                cards.append({"group": group, "front": front, "back": back, "evidence": ""})
        if cards:
            break
    return cards


def split_definition(text):
    """Split 'Term: definition' into a recall front and its answer."""
    if not text:
        return "", ""
    recall = ""
    recall_match = re.search(r"Rapid recall:\s*(.*)$", text, flags=re.S)
    if recall_match:
        recall = recall_match.group(1).strip()
        text = text[:recall_match.start()].strip()
    if ":" in text:
        term, _, definition = text.partition(":")
        term = term.strip()
        definition = definition.strip()
        # "A measure mu:F->[0,infty] has ..." is a prose sentence, not a
        # term/definition pair, so only split on a short leading label.
        if 0 < len(term) < 60 and definition and len(term.split()) <= 4:
            return term, recall or definition
    if recall:
        return text[:110].strip(), recall
    return "", ""


def build_module(code: str) -> dict:
    folder = ROOT / code
    most_asked = folder / "most_asked.html"
    families = []
    if most_asked.exists():
        families = extract_families(most_asked.read_text(encoding="utf-8"))

    # Topic guides carry the paper-derived practice prompts.
    sheets = []
    sheet_cards = []
    for guide in sorted(folder.glob("*_revision_sheet.html")):
        page = guide.read_text(encoding="utf-8")
        title = sheet_title(page, guide.stem)
        sheets.append({
            "file": guide.name,
            "title": title,
            "purpose": extract_sheet_purpose(page),
            "refresher": extract_sheet_refresher(page),
            "practice": extract_sheet_practice(page),
            "mistakes": extract_sheet_mistakes(page),
        })
        sheet_cards.extend(extract_sheet_cards(page, title))
        structure = extract_sheet_structure(page, title)
        if structure:
            sheets[-1]["structure"] = structure

    decks = []
    flashcards = folder / "flashcards.html"
    if flashcards.exists():
        cards = extract_cards(flashcards.read_text(encoding="utf-8"))
        if cards:
            decks.append({"file": "flashcards.html", "cards": cards})
    calculation = folder / "calculation_flashcards.html"
    if calculation.exists():
        cards = extract_cards(calculation.read_text(encoding="utf-8"))
        if cards:
            decks.append({"file": "calculation_flashcards.html", "cards": cards})

    if not decks and sheet_cards:
        decks.append({"file": "topic guides", "cards": sheet_cards})

    details_page = folder / "details.html"
    details = extract_details(details_page.read_text(encoding="utf-8")) if details_page.exists() else {}
    details["code"] = code
    details["name"] = module_title(code, details)

    families.sort(key=lambda item: (item["rank"] is None, item["rank"] or 0, item["title"]))

    # MA4344 and MA490 state the paper structure as Q1..Q4 lines rather than
    # as named families, so turn each line into a family.
    if not families:
        for index, line in enumerate(details.get("exam_block", []), start=1):
            if not re.match(r"^Q\d", line):
                continue
            label, _, body = line.partition(":")
            body = body.strip()
            if not body:
                continue
            families.append({
                "id": slugify(label + " " + body[:40]),
                "rank": index,
                "title": body.split(".")[0][:80],
                "frequency": "",
                "appearances": [],
                "marks": 0,
                "question": body,
                "answer": "",
            })

    # Some modules (CT4111) keep their families in the study space instead.
    study_page = folder / "study.html"
    if study_page.exists():
        page = study_page.read_text(encoding="utf-8")
        if details["name"] == code:
            heading = re.search(r"<h1[^>]*>(.*?)</h1>", page, flags=re.S)
            if heading:
                details["name"] = strip_tags(heading.group(1))
        if not families:
            families = extract_study_topics(page)
        if not decks:
            inline = extract_inline_cards(page)
            if inline:
                decks.append({"file": "study.html", "cards": inline})

    if code == "CT4111":
        bank = folder / "revision_questions.html"
        families, sheets, cards = extract_ct4111_revision_bank(bank.read_text(encoding="utf-8"))
        decks = [{"file": bank.name, "cards": cards}] if cards else []
        details.update({
            "assessment": "70% written / 30% CA",
            "exam_pattern": "No local past papers are available. These questions follow the official learning outcomes; question wording, paper structure and marks are unknown.",
            "predictability": "Not established",
            "papers": [],
        })

    # Modules with no paper archive still have topic guides; each guide is a
    # study family with its own purpose and practice prompts.
    if not families and sheets:
        for index, sheet in enumerate(sheets, start=1):
            families.append({
                "id": slugify(sheet["title"]),
                "rank": index,
                "title": sheet["title"],
                "frequency": "",
                "appearances": [],
                "marks": 0,
                "question": sheet["purpose"],
                "answer": "",
                "sheet": sheet["file"],
            })

    # Reviewed Canvas cards live in the data layer because the source decks
    # stay private. Keep them when regenerating the paper-derived data.
    current_path = DATA_DIR / (code + ".json")
    if current_path.exists():
        current = json.loads(current_path.read_text(encoding="utf-8"))
        reviewed = [card for deck in current.get("decks", [])
                    for card in deck.get("cards", []) if card.get("source_url")]
        if reviewed:
            if not decks:
                decks.append({"file": "canvas-review", "cards": []})
            existing_fronts = {card["front"] for deck in decks for card in deck["cards"]}
            decks[0]["cards"].extend(card for card in reviewed
                                     if card["front"] not in existing_fronts)

        if code == "CT561":
            for paper in current.get("details", {}).get("papers", []):
                if paper.endswith(" (Canvas)") and paper not in details["papers"]:
                    details["papers"].append(paper)
            old_families = {family["id"]: family for family in current.get("families", [])}
            for family in families:
                previous = old_families.get(family["id"], {})
                additions = [item for item in previous.get("appearances", [])
                             if item.startswith("2022/23 ") and item not in family["appearances"]]
                family["appearances"] = additions + family["appearances"]
                family["marks"] += sum(parse_marks(item) for item in additions)

    return {
        "code": code,
        "name": details["name"],
        "details": details,
        "families": families,
        "decks": decks,
        "sheets": sheets,
    }


def main() -> None:
    DATA_DIR.mkdir(exist_ok=True)
    index = []
    for code in MODULES:
        data = build_module(code)
        (DATA_DIR / ("%s.json" % code)).write_text(
            json.dumps(data, indent=1, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        cards = sum(len(deck["cards"]) for deck in data["decks"])
        index.append({
            "code": code,
            "name": data["name"],
            "families": len(data["families"]),
            "cards": cards,
            "papers": len(data["details"].get("papers", [])),
            "predictability": data["details"].get("predictability", ""),
            "assessment": data["details"].get("assessment", ""),
        })
        print("%-7s %2d families, %3d cards, %d papers" % (code, len(data["families"]), cards, index[-1]["papers"]))
    (DATA_DIR / "index.json").write_text(
        json.dumps({"modules": index}, indent=1, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
