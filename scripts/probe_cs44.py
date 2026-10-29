import json, re, sys
sys.path.insert(0, "scripts")
from build_study_data import strip_tags, FORMAT_PATTERN
d = json.load(open("study_data/CS4423.json"))
print("drill:", d["details"].get("drill"))
print("exam_block:", d["details"].get("exam_block"))
print("exam_pattern:", (d["details"].get("exam_pattern") or "")[:200])
page = open("CS4423/details.html", encoding="utf-8").read()
cands = [strip_tags(x) for x in re.findall(r"<li[^>]*>(.*?)</li>", page, flags=re.S)]
cands.append(strip_tags(page))
for c in cands:
    m = FORMAT_PATTERN.search(c)
    if m:
        print("MATCH:", m.group(0)[:100]); break
