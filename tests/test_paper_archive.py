"""Check that focused practice includes every locally available exam paper."""

import json
import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MODULES = ("CT417", "CT4100", "CT4101", "CT561")


class PaperArchiveTests(unittest.TestCase):
    def test_catalog_covers_all_local_pdfs(self):
        catalog = json.loads((ROOT / "study_data/paper_archive.json").read_text())
        self.assertEqual(set(catalog), set(MODULES))
        for module in MODULES:
            listed = {paper["paper"] for paper in catalog[module]}
            local = {file.name for file in (ROOT / module).glob("*.pdf")}
            self.assertEqual(listed, local, module)
            for paper in catalog[module]:
                numbers = [number for number, _ in paper["questions"]]
                self.assertEqual(numbers, list(range(1, len(numbers) + 1)))
                self.assertTrue(all(page >= 2 for _, page in paper["questions"]))

    def test_worked_questions_match_catalog(self):
        catalog = json.loads((ROOT / "study_data/paper_archive.json").read_text())
        worked = json.loads((ROOT / "study_data/paper_questions.json").read_text())
        for module in MODULES:
            known = {(paper["paper"], number)
                     for paper in catalog[module]
                     for number, _ in paper["questions"]}
            for question in worked[module]:
                number = int(re.search(r"q(\d+)$", question["id"]).group(1))
                self.assertIn((question["paper"], number), known)

    def test_recent_questions_have_topic_guides(self):
        catalog = json.loads((ROOT / "study_data/paper_archive.json").read_text())
        worked = json.loads((ROOT / "study_data/paper_questions.json").read_text())
        missing = []
        for module in MODULES:
            data = json.loads((ROOT / "study_data" / (module + ".json")).read_text())
            worked_questions = {(item["paper"], int(re.search(r"q(\d+)$", item["id"]).group(1)))
                                for item in worked[module]}
            for paper in catalog[module]:
                if int(paper["year"][:4]) < 2023:
                    continue
                for number, _ in paper["questions"]:
                    pattern = re.compile(r"\bQ%d(?!\d)" % number, re.I)
                    matching = [family for family in data["families"]
                                if family.get("answer") and any(paper["year"] in appearance and pattern.search(appearance)
                                       for appearance in family.get("appearances", []))]
                    if not matching and module == "CT417" and paper["year"] == "2023/24":
                        matching = [family for family in data["families"]
                                    if family.get("answer") and any(not re.search(r"\d{4}/\d{2}", appearance)
                                           and pattern.search(appearance)
                                           for appearance in family.get("appearances", []))]
                    if not matching and (paper["paper"], number) not in worked_questions:
                        missing.append("%s %s Q%d" % (module, paper["year"], number))
        self.assertFalse(missing, ", ".join(missing))


if __name__ == "__main__":
    unittest.main()
