import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const guide = fs.readFileSync(path.join(root, "docs/guides/getting-started.md"), "utf8");
const brief = fs.readFileSync(
  path.join(root, "starter-pack/templates/explainable-change-brief-template.md"),
  "utf8",
);

describe("S17 explainable first-use journey", () => {
  it("uses one confirmed journey across four explanation depths", () => {
    for (const mode of ["plain", "guided", "professional", "expert"]) {
      expect(guide).toContain(`\`${mode}\``);
    }
    expect(guide).toContain("Do not infer expertise automatically");
  });

  it("includes expected output, validation, troubleshooting and escalation", () => {
    expect(guide).toContain("## Troubleshooting");
    expect(guide).toContain("Expected result:");
    expect(guide).toContain("require the appropriate software engineering, security or governance reviewer");
  });

  it("keeps plain language and technical precision together", () => {
    expect(brief).toContain("## Technical note");
    expect(brief).toContain("## Terms explained");
    expect(brief).toContain("Requires technical review");
    expect(brief).toContain("Simpler language must not remove risk or uncertainty");
  });
});

