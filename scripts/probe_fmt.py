import re, sys
sys.path.insert(0, "scripts")
from build_study_data import strip_tags
for code in ["CS402","CS4423","CT4100","CT4101","CT417","CT420","CT421","CT561","MA342","MA3491","MA4102","MA4344","MA490"]:
    page = open(f"{code}/details.html", encoding="utf-8").read()
    # The first "Repetitive Topics To Drill" bullet usually states the format
    m = re.search(r'Repetitive Topics To Drill</summary>\s*<div class="details-body">\s*<ul>\s*<li[^>]*>(.*?)</li>', page, flags=re.S)
    first = strip_tags(m.group(1)) if m else ""
    # Also try the exam block first line
    b = re.search(r'<h2 id="exam-repetition-heading">Exam Repetition</h2>\s*<p>(.*?)</p>', page, flags=re.S)
    print(f"{code:7} | drill1: {first[:95]}")
