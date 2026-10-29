import re, sys
sys.path.insert(0, "scripts")
from build_study_data import strip_tags
for path in ["CS4423/bfs_shortest_paths_revision_sheet.html", "MA342/compactness_revision_sheet.html", "CT4100/retrieval_models_revision_sheet.html", "MA3491/bounds_revision_sheet.html"]:
    page = open(path, encoding="utf-8").read()
    print("="*12, path)
    for mm in re.finditer(r'<h2[^>]*>(.*?)</h2>(.*?)(?=<h2|\Z)', page, flags=re.S):
        t = strip_tags(mm.group(1))
        if re.search(r"practice|marks", t, flags=re.I):
            print(f"  [{t}]")
            print("   ", strip_tags(mm.group(2))[:200])
