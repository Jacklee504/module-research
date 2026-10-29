import re, sys
sys.path.insert(0, "scripts")
from build_study_data import strip_tags
page = open("CT4100/retrieval_models_revision_sheet.html", encoding="utf-8").read()
for mm in re.finditer(r'<(h2|h3|h4)[^>]*>(.*?)</\1>(.*?)(?=<h2|<h3|<h4|\Z)', page, flags=re.S):
    t = strip_tags(mm.group(2))
    if re.search(r"practice|marks|\[", t, flags=re.I):
        print(f"  [{mm.group(1)} {t[:90]}]")
        print("   ", strip_tags(mm.group(3))[:170])
        print()
