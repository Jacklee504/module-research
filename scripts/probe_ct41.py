import json
d = json.load(open("study_data/CT4100.json"))
for s in d["sheets"][:2]:
    print(s["file"], len(s["practice"]))
    for p in s["practice"][:3]:
        print("   ", p["title"][:80], "| marks", p["marks"])
        print("      prompt:", p["prompt"][:80])
        print("      answer:", p["answer"][:80])
