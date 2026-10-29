import json
d = json.load(open("study_data/CT4100.json"))
print("keys:", list(d))
print("family 0:", json.dumps(d["families"][0], indent=1)[:900])
print("deck 0:", json.dumps(d["decks"][0]["cards"][0], indent=1))
print("sheet 0 keys:", list(d["sheets"][0]))
print("practice 0:", json.dumps(d["sheets"][0]["practice"][0], indent=1)[:700])
