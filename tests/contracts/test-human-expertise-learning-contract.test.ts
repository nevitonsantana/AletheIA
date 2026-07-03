import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('Human Expertise & Evidence-Based Learning contract', () => {
  it('keeps human expertise scoped and non-automatic', () => {
    const contract = read('docs/contracts/human-expertise-learning-contract.md');

    expect(contract).toContain('Domain Expertise Brief');
    expect(contract).toContain('decision_boundaries');
    expect(contract).toContain('Human expertise is not universal truth');
    expect(contract).toContain('do not bypass governance gates');
    expect(contract).toContain('automatic skill evolution');
  });

  it('keeps learning evidence separate from self-evolution', () => {
    const contract = read('docs/contracts/human-expertise-learning-contract.md');

    expect(contract).toContain('Evidence-Based Learning Record');
    expect(contract).toContain('MUST NOT apply that change automatically');
    expect(contract).toContain('converted_to_proposal');
    expect(contract).toContain('capability fitness rankings');
  });

  it('provides conservative templates for expertise and learning records', () => {
    const brief = read('starter-pack/templates/domain-expertise-brief-template.yaml');
    const learning = read('starter-pack/templates/evidence-based-learning-record-template.yaml');

    expect(brief).toContain('source_refs: []');
    expect(brief).toContain('restricted_sources: metadata_only');
    expect(brief).toContain('cannot_authorize: []');

    expect(learning).toContain('observed_result: unavailable');
    expect(learning).toContain('automatic_change_allowed: false');
    expect(learning).toContain('status: captured');
  });

  it('ships a synthetic S25 example with human authority and no automation', () => {
    const example = read('examples/human-expertise-learning/s25-domain-expertise-learning-synthetic.yaml');

    expect(example).toContain('work_slice_ref: WS-S25-HUMAN-EXPERTISE');
    expect(example).toContain('authority: human_expert');
    expect(example).toContain('automatic_change_allowed: false');
    expect(example).toContain('status: captured');
    expect(example).toContain('Does not create capability fitness ranking or learning automation.');
  });
});
