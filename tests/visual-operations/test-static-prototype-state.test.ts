import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const prototypePath = path.resolve(
  process.cwd(),
  "examples/visual-operations/prototype/mission-control-static.html",
);
const observatoryPath = path.resolve(
  process.cwd(),
  "examples/visual-operations/prototype/resource-observatory-static.html",
);

function navigationLabels(html: string): string[] {
  return [...html.matchAll(/class="rail-button[^"]*"[^>]*aria-label="([^"]+)"/g)].map(
    (match) => match[1],
  );
}

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

  it("keeps the same icon rail and tooltips across static pages", () => {
    const home = fs.readFileSync(prototypePath, "utf8");
    const observatory = fs.readFileSync(observatoryPath, "utf8");
    const expectedLabels = [
      "Overview",
      "Evidence ledger",
      "Trace context",
      "Source records",
      "Resource observatory",
      "Configuration",
      "Audit view",
    ];

    expect(navigationLabels(home)).toEqual(expectedLabels);
    expect(navigationLabels(observatory)).toEqual(expectedLabels);

    for (const html of [home, observatory]) {
      expect(html).toContain("Canonical Mission Control rail geometry shared by both static pages.");
      expect(html).toContain("height: 40px;");
      expect(html.match(/class="nav-icon"/g)).toHaveLength(8);
      for (const label of expectedLabels) {
        expect(html).toContain(`data-tooltip="${label}"`);
      }
    }
  });
});
