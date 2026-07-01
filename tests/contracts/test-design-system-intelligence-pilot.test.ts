import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('Design System Intelligence pilot contract', () => {
  it('keeps S24 bounded to source-backed review without scanner or promotion authority', () => {
    const contract = read('docs/contracts/design-system-intelligence-pilot.md');

    expect(contract).toContain('source_refs');
    expect(contract).toContain('Pattern Generalization Gate');
    expect(contract).toContain('MUST NOT');
    expect(contract).toContain('automatic design-system scanner');
    expect(contract).toContain('Pulso package dependency');
    expect(contract).toContain('new source of truth for Pulso');
  });

  it('provides a template with conservative defaults for missing evidence', () => {
    const template = read('starter-pack/templates/design-system-intelligence-review-template.yaml');

    expect(template).toContain('review_id: DSIR-YYYYMMDD-001');
    expect(template).toContain('design_system_ref:');
    expect(template).toContain('source_refs: []');
    expect(template).toContain('recurrence_evidence: unavailable');
    expect(template).toContain('outcome: needs_more_evidence');
    expect(template).toContain('disposition: human_review_required');
  });

  it('ships a Pulso pilot example with an actionable finding but no promotion decision', () => {
    const example = read('examples/design-system-intelligence/pulso-pilot-review.yaml');

    expect(example).toContain('work_slice_ref: WS-S24-PULSO-PILOT');
    expect(example).toContain('id: pulso');
    expect(example).toContain('finding: candidate_issue');
    expect(example).toContain('recommended_next_step: human_review_required');
    expect(example).toContain('outcome: needs_more_evidence');
    expect(example).toContain('Do not add automatic scanning or Pulso package dependency in S24.');
  });
});
