import re, sys
sys.path.insert(0, "scripts")
from build_study_data import strip_tags
page = open("CT4100/retrieval_models_revision_sheet.html", encoding="utf-8").read()
i = page.find("Integrated paper-style practice")
print(repr(page[i-200:i+700]))
