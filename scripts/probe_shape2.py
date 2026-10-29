import json
from pathlib import Path
D = Path("study_data")
for f in sorted(D.glob("*.json")):
    if f.name == "index.json":
        continue
    d = json.loads(f.read_text())
    print(f"{d['code']:7} {d['details'].get('exam_shape',''):11} | {d['details'].get('paper_format','')[:70]}")
