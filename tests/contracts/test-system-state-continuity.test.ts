import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const statePath = path.join(root, "SYSTEM_STATE.md");
const state = fs.readFileSync(statePath, "utf-8");
const finalizationTemplate = fs.readFileSync(
  path.join(root, "starter-pack/templates/slice-finalization-review-template.md"),
  "utf-8",
);
const restartTemplate = fs.readFileSync(
  path.join(root, "starter-pack/templates/restart-bootstrap-prompt-template.md"),
  "utf-8",
);

describe("S15 SYSTEM_STATE and continuity reconciliation", () => {
  it("keeps SYSTEM_STATE compact, explicit about authority, and operationally complete", () => {
    expect(state.split("\n").length).toBeLessThanOrEqual(120);
    expect(state).toContain("not a universal source of truth");

    for (const heading of [
      "## Project identity",
      "## Current architecture summary",
      "## Delivered evolution baseline",
      "## Active and planned evolution",
      "## Deprecated or merged plans",
      "## Documentation health",
      "## Cognitive debt and open risks",
      "## Next safe steps",
      "## Last reviewed",
    ]) {
      expect(state).toContain(heading);
    }
  });

  it("resolves every local Markdown reference in SYSTEM_STATE", () => {
    const refs = [...state.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
    expect(refs.length).toBeGreaterThan(0);

    for (const ref of refs) {
      expect(fs.existsSync(path.resolve(root, ref)), `${ref} should resolve`).toBe(true);
    }
  });

  it("extends Restart Package instead of introducing a competing capsule", () => {
    for (const field of [
      "User Intent",
      "Active Decisions and Evidence Refs",
      "Context Intentionally Discarded",
      "Documentation Updates Needed",
      "Reload Required Before Acting",
    ]) {
      expect(finalizationTemplate).toContain(`**${field}:**`);
    }

    expect(restartTemplate).toContain("Before acting, perform the post-resume check");
    expect(restartTemplate).toContain("Missing or unavailable");
    expect(restartTemplate).toContain("Human or technical review still required");
  });
});
