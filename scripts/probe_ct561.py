import re, sys
sys.path.insert(0, "scripts")
from build_study_data import strip_tags
page = open("CT561/feedback_loops_revision_sheet.html", encoding="utf-8").read()
print(repr(page[:1200]))
