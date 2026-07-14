import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('Readiness Gates Spec', () => {
  it('keeps the minimum sufficient solution guardrail manual and compatibility-only', () => {
    const spec = read('docs/contracts/readiness-gates-spec.md');
    const template = read('starter-pack/templates/work-slice-readiness-review-template.md');

    expect(spec).toContain('Minimum sufficient solution is justified');
    expect(spec).toContain('complexity is treated as cost before it enters the plan');
    expect(spec).toContain('not a blocker engine');
    expect(spec).toContain('does not authorize schemas, dashboards, collectors, policy engines');
    expect(template).toContain('Minimum sufficient solution is justified');
    expect(template).toContain('Smallest sufficient option considered');
    expect(template).toContain('Existing asset or small extension considered');
    expect(template).toContain('Escalation reason, if any');
  });
});
