import json
d = json.load(open("study_data/CT4100.json"))
for s in d["sheets"]:
    for p in s["practice"]:
        if "Integrated" in p["title"] or p["marks"]:
            print(s["file"][:30], "|", p["title"][:60], "| marks", p["marks"])
