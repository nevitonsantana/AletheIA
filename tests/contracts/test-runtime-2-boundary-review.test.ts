import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const adr = fs.readFileSync(
  path.join(root, "docs/adr/ADR-016-runtime-2-boundary-review.md"),
  "utf8",
);
const adrIndex = fs.readFileSync(path.join(root, "docs/adr/README.md"), "utf8");
const backlog = fs.readFileSync(
  path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
  "utf8",
);
const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

describe("S26 Runtime 2.0 boundary review", () => {
  it("records Runtime 2.0 as a north-star, not an implementation authorization", () => {
    expect(adr).toContain("strategic north-star, not an implementation track");
    for (const blocked of [
      "runtime kernel",
      "SDK",
      "CLI",
      "event bus",
      "plugin interface",
      "capability runtime",
      "provider adapter",
    ]) {
      expect(adr).toContain(blocked);
    }
    expect(adr).toContain("does not authorize");
  });

  it("preserves the AletheIA, Adaptive Skills and runtime/harness authority boundary", () => {
    expect(adr).toContain("AletheIA continues to define governance contracts");
    expect(adr).toContain("Adaptive Skills continues to define methods");
    expect(adr).toMatch(/Runtime\/harness surfaces continue to execute\s+work and produce evidence/);
  });

  it("requires unavailable rather than fabricated runtime evidence", () => {
    expect(adr).toContain("Treat missing runtime evidence as `unavailable`");
    expect(adr).toContain("instead of inventing metrics");
  });

  it("is indexed and reflected in current planning surfaces", () => {
    expect(adrIndex).toContain("ADR-016-runtime-2-boundary-review.md");
    expect(backlog).toContain("ADR-016 — Runtime 2.0 Boundary Review");
    expect(backlog).toContain("requires a later explicit implementation decision");
    expect(systemState).toContain("**Active:** none");
    expect(systemState).toContain("S26 Runtime 2.0 boundary review merged");
    expect(systemState).toContain("Runtime 2.0 implementation until a later explicit boundary decision");
  });
});
