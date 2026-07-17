#!/usr/bin/env python3
"""Validate AletheIA documentation classification and public truth boundaries."""

from __future__ import annotations

import fnmatch
import json
import re
import sys
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
CONFIG_PATH = DOCS / "_meta" / "docs-publication-classification.json"
NAV_PATH = ROOT / "apps" / "docs" / "blume.config.ts"


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def source_for_route(route: str) -> Path | None:
    if route == "/":
        return DOCS / "index.md"

    relative = route.removeprefix("/")
    candidates = [
        DOCS / f"{relative}.md",
        DOCS / f"{relative}.mdx",
        DOCS / relative / "index.md",
        DOCS / relative / "index.mdx",
    ]
    return next((candidate for candidate in candidates if candidate.is_file()), None)


def main() -> int:
    errors: list[str] = []
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    categories = set(config["categories"])
    rules = config["rules"]

    docs = sorted(
        path
        for extension in ("*.md", "*.mdx")
        for path in DOCS.rglob(extension)
    )
    classifications: dict[str, str] = {}

    for path in docs:
        relative = path.relative_to(DOCS).as_posix()
        matches = [rule for rule in rules if fnmatch.fnmatch(relative, rule["pattern"])]
        if not matches:
            fail(errors, f"unclassified document: docs/{relative}")
            continue
        category = matches[0]["category"]
        if category not in categories:
            fail(errors, f"unknown category {category!r} for docs/{relative}")
            continue
        classifications[relative] = category

    for name, relative in config["canonical_pages"].items():
        if not (DOCS / relative).is_file():
            fail(errors, f"canonical page {name!r} is missing: docs/{relative}")

    nav_source = NAV_PATH.read_text(encoding="utf-8")
    routes = sorted(
        route
        for route in set(re.findall(r'"(/[^" ]*)"', nav_source))
        if route != "/AletheIA"
    )
    for route in routes:
        if source_for_route(route) is None:
            fail(errors, f"navigation route has no documentation source: {route}")

    catalog_path = DOCS / config["canonical_pages"]["agent_roles"]
    catalog = catalog_path.read_text(encoding="utf-8")
    catalog_roles = set(re.findall(r"^\| `([a-z-]+)` \|", catalog, flags=re.MULTILINE))
    expected_roles = set(config["canonical_agent_roles"])
    if catalog_roles != expected_roles:
        fail(
            errors,
            "canonical agent-role catalog mismatch: "
            f"expected {sorted(expected_roles)}, found {sorted(catalog_roles)}",
        )
    for role in expected_roles:
        if not (DOCS / "reference" / f"agent-role-{role}.md").is_file():
            fail(errors, f"canonical agent-role page is missing: {role}")

    package_version = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))["version"]
    system_state = (ROOT / "SYSTEM_STATE.md").read_text(encoding="utf-8")
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    if f"**Version:** `{package_version}`" not in system_state:
        fail(errors, "SYSTEM_STATE version does not match package.json")
    if f"at **{package_version}**" not in readme:
        fail(errors, "README current status does not match package.json")
    if "**Maturity:** versioned 1.x evolution" not in system_state:
        fail(errors, "SYSTEM_STATE maturity claim is missing or changed")

    portuguese_markers = re.compile(
        r"\b(não|visão|documentação|evidência|revisão|próximo|próxima|objetivo|"
        r"segurança|aprendizado|usuário|usuários|camada|camadas)\b",
        flags=re.IGNORECASE,
    )
    public_categories = set(config["public_language_categories"])
    for relative, category in classifications.items():
        if category not in public_categories:
            continue
        text = (DOCS / relative).read_text(encoding="utf-8")
        marker = portuguese_markers.search(text)
        if marker:
            fail(errors, f"possible Portuguese marker in public docs/{relative}: {marker.group(0)!r}")

    marketing_surfaces = [ROOT / "README.md", DOCS / "index.md", *sorted((DOCS / "getting-started").glob("*.md"))]
    unsupported_metrics = re.compile(r"(?:\+\d{1,3}%|\b99\.5%\b|\b1,248\b)")
    for path in marketing_surfaces:
        match = unsupported_metrics.search(path.read_text(encoding="utf-8"))
        if match:
            fail(errors, f"unsupported presentation metric in {path.relative_to(ROOT)}: {match.group(0)}")

    counts = Counter(classifications.values())
    if errors:
        print("Documentation truth validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    summary = ", ".join(f"{category}={counts.get(category, 0)}" for category in config["categories"])
    print(f"Validated {len(docs)} classified documentation files ({summary}).")
    print(f"Validated {len(routes)} public navigation routes and {len(expected_roles)} canonical agent roles.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
