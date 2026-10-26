"""Assemble the publishable static site into dist/.

The Sites packaging step expects a `dist` directory that contains the
whole site: every module's pages, the study data, the past papers and
the shared stylesheets. Only files the site actually serves are copied,
so local scratch directories stay out of the published output.
"""

from __future__ import annotations

import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

TOP_LEVEL = [
    "index.html",
    "home_study.js",
    "lecture_study.html",
    "module_research.html",
    "module_page.css",
    "module_research.css",
    "study_space.css",
    "study_space.js",
]

# The published site serves pages and past papers. Markdown files in the
# working tree are authoring sources, not pages the site renders.
MODULE_SUFFIXES = (".html", ".pdf")

# Only these directories are part of the published site. Everything else in
# the working tree is local scratch, private notes or tooling.
PUBLISHED_DIRS = {
    "CS402", "CS4423", "CT4100", "CT4101", "CT4104", "CT4108", "CT4111",
    "CT413", "CT417", "CT420", "CT421", "CT561", "MA342", "MA3491",
    "MA4102", "MA4344", "MA490",
}


def copy_module(code: str) -> None:
    source = ROOT / code
    if not source.is_dir():
        return
    target = DIST / code
    target.mkdir(parents=True, exist_ok=True)
    for item in sorted(source.iterdir()):
        if not item.is_file():
            continue
        if item.suffix not in MODULE_SUFFIXES:
            continue
        shutil.copy2(item, target / item.name)


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    for name in TOP_LEVEL:
        source = ROOT / name
        if source.is_file():
            shutil.copy2(source, DIST / name)

    shutil.copytree(ROOT / "study_data", DIST / "study_data")

    for code in sorted(PUBLISHED_DIRS):
        copy_module(code)

    files = sum(1 for _ in DIST.rglob("*") if _.is_file())
    size = sum(f.stat().st_size for f in DIST.rglob("*") if f.is_file())
    print("dist: %d files, %.1f MB" % (files, size / 1024 / 1024))


if __name__ == "__main__":
    main()
