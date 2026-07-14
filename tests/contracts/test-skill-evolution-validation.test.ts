import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('Skill Evolution Validation Contract', () => {
  it('keeps Work Slice learnings as evidence before Adaptive Skills changes', () => {
    const contract = read('docs/contracts/skill-evolution-validation-contract.md');

    expect(contract).toContain('Work Slice learning bridge');
    expect(contract).toContain('can become an Adaptive Skills evolution signal only as evidence');
    for (const category of [
      'observe_only',
      'validation_case_candidate',
      'module_candidate',
      'skill_update_candidate',
      'new_skill_candidate',
    ]) {
      expect(contract).toContain(category);
    }
    expect(contract).toContain('does not authorize automatic skill mutation');
    expect(contract).toContain('proposal candidate that must follow the authorized flow');
  });
});
