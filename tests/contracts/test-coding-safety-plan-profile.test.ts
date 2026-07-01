import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('S9 Coding Safety Plan Profile', () => {
  it('requires base state, scope, verification, drift, rollback and stop conditions', () => {
    const contract = read('docs/contracts/coding-safety-plan-profile.md');

    for (const field of [
      'base_state:',
      'in_scope:',
      'out_of_scope:',
      'expected_results:',
      'drift_control:',
      'rollback:',
      'stop_conditions:',
    ]) {
      expect(contract).toContain(field);
    }
  });

  it('keeps coding safety human-reviewed and non-runtime', () => {
    const contract = read('docs/contracts/coding-safety-plan-profile.md');

    expect(contract).toContain('Human merge remains human');
    expect(contract).toContain('No hidden runtime expansion');
    expect(contract).toContain('does not create a new lifecycle, runtime, command, policy engine or');
    expect(contract).toContain('implementation-planning-advisor');
    expect(contract).toContain('not promoted by this contract');
  });

  it('provides a conservative template with explicit blocked actions', () => {
    const template = read('starter-pack/templates/coding-safety-plan-template.yaml');

    expect(template).toContain('dirty_state: unknown');
    expect(template).toContain('auto_merge');
    expect(template).toContain('deploy');
    expect(template).toContain('strategy: unavailable');
    expect(template).toContain('required: true');
  });

  it('ships a non-engineer checklist and worked Standard example', () => {
    const checklist = read('docs/reference/coding-safety-non-engineer-checklist.md');
    const example = read('examples/coding-safety/s9-standard-docs-slice.yaml');

    expect(checklist).toContain('what is explicitly out of scope');
    expect(checklist).toContain('Passing tests are treated as evidence');
    expect(example).toContain('WS-S9-CODING-SAFETY-DOCS');
    expect(example).toContain('behavior_change: docs_only');
    expect(example).toContain('plans/');
    expect(example).toContain('implementation-planning-advisor');
  });

  it('indexes the contract, template, checklist and example', () => {
    const contractsIndex = read('docs/contracts/README.md');
    const referenceIndex = read('docs/reference/README.md');
    const starterIndex = read('starter-pack/README.md');
    const examplesIndex = read('examples/README.md');

    expect(contractsIndex).toContain('coding-safety-plan-profile.md');
    expect(referenceIndex).toContain('coding-safety-non-engineer-checklist.md');
    expect(starterIndex).toContain('coding-safety-plan-template.yaml');
    expect(examplesIndex).toContain('coding-safety/');
  });
});
