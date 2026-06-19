import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const prototypePath = path.resolve(
  process.cwd(),
  "examples/visual-operations/prototype/mission-control-static.html",
);

describe("Mission Control static prototype initial state", () => {
  it("opens with the evidence inspector closed", () => {
    const html = fs.readFileSync(prototypePath, "utf8");

    expect(html).toContain('class="inspector-backdrop" id="inspector-backdrop"');
    expect(html).toContain(
      'class="inspector" aria-label="Evidence inspector" id="evidence-inspector" aria-hidden="true"',
    );
    expect(html).not.toContain('class="inspector-backdrop open"');
    expect(html).not.toContain('class="inspector open"');
    expect(html).not.toContain('class="slice-card selected"');
  });
});
