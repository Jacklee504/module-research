"""Report on the generated study data so quality regressions are visible."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "study_data"

index = json.loads((DATA / "index.json").read_text())
header = ("code", "name", "fam", "famAn", "card", "emp", "prac", "noP", "noA")
print("%-7s %-30s %4s %5s %5s %5s %5s %5s %5s" % header)
for entry in index["modules"]:
    data = json.loads((DATA / (entry["code"] + ".json")).read_text())
    families = data["families"]
    practice = [p for s in data["sheets"] for p in s["practice"]]
    cards = [c for d in data["decks"] for c in d["cards"]]
    print("%-7s %-30s %4d %5d %5d %5d %5d %5d %5d" % (
        entry["code"], entry["name"][:30], len(families),
        sum(1 for f in families if f["answer"]),
        len(cards),
        sum(1 for c in cards if not c["front"] or not c["back"]),
        len(practice),
        sum(1 for p in practice if not p["prompt"]),
        sum(1 for p in practice if not p["answer"] and not p["route"]),
    ))
