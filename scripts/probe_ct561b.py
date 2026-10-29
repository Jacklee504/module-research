import json
d = json.load(open("study_data/CT561.json"))
for s in d["sheets"][:2]:
    print(s["file"][:34], "| practice", len(s["practice"]), "| structure", len(s.get("structure", [])))
    for it in s.get("structure", [])[:3]:
        print("    -", it["title"], "| marks", it["marks"], "|", it["prompt"][:80])
