import re, sys
sys.path.insert(0, "scripts")
from build_study_data import strip_tags
for path in ["CT420/time_synchronisation_revision_sheet.html", "MA342/compactness_revision_sheet.html", "CS402/classical_ciphers_revision_sheet.html"]:
    page = open(path, encoding="utf-8").read()
    print("="*12, path)
    for mm in re.finditer(r'<h3[^>]*>(.*?)</h3>(.*?)(?=<h3|<h2|\Z)', page, flags=re.S):
        t = strip_tags(mm.group(1))
        if "practice" in t.lower() or "bridge" in t.lower() or "worked" in t.lower():
            print(f"  [{t}]")
            print("   ", strip_tags(mm.group(2))[:180])
            break
