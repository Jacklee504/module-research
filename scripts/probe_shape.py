import json
from pathlib import Path
D = Path("study_data")
for f in sorted(D.glob("*.json")):
    if f.name == "index.json":
        continue
    d = json.loads(f.read_text())
    p = (d["details"].get("exam_pattern") or "")[:150]
    print(f"{d['code']:7} | {p}")
