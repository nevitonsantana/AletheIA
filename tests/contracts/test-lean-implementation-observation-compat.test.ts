import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const fixture = JSON.parse(
  fs.readFileSync(path.join(root, "examples/visual-operations/lean-implementation-activation-event.json"), "utf8"),
) as any;
const backlog = fs.readFileSync(
  path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
  "utf8",
);

describe("S22 lean implementation observation compatibility", () => {
  it("projects skill activation as read-only evidence, not governance authority", () => {
    expect(fixture.source_type).toBe("adaptive_skill");
    expect(fixture.event_type).toBe("skill.activated");
    expect(fixture.payload_metadata.skill_id).toBe("lean-implementation");
    expect(fixture.payload_metadata.governance_authority).toBe(false);
    expect(fixture.payload_metadata.decision_authority).toContain("AletheIA");
  });

  it("keeps source refs and unavailable metrics discipline compatible with S20", () => {
    expect(fixture.source_refs.length).toBeGreaterThanOrEqual(2);
    expect(fixture.evidence_refs).toEqual(
      expect.arrayContaining([
        "adaptive-skills:skills/lean-implementation/SKILL.md",
        "adaptive-skills:examples/engineering/lean-implementation-synthetic-example.md",
      ]),
    );
    expect(fixture.payload_metadata.expected_output).toContain("unavailable fields");
  });

  it("tracks S22 as the owning backlog slice", () => {
    expect(backlog).toContain("### S22 — Lean Implementation Skill");
    expect(backlog).toContain("lean-implementation");
  });
});
