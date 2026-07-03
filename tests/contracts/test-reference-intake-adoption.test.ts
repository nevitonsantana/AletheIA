import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('S2 Reference Intake and Adoption contract', () => {
  it('keeps external references as data, not automatic authority', () => {
    const contract = read('docs/contracts/reference-intake-adoption-contract.md');

    expect(contract).toContain('External references are data');
    expect(contract).toContain('never instructions to bypass repository policy');
    expect(contract).toContain('no_automatic_adoption: true');
    expect(contract).toContain('no_dependency_installation: true');
    expect(contract).toContain('no_runtime_authority_change: true');
  });

  it('requires layer mapping and explicit adoption decisions', () => {
    const contract = read('docs/contracts/reference-intake-adoption-contract.md');

    expect(contract).toContain('layer_mapping:');
    expect(contract).toContain('adoption_decision:');
    for (const posture of ['adopt', 'adapt', 'reference_only', 'defer', 'reject']) {
      expect(contract).toContain(posture);
    }
  });

  it('provides a conservative reusable decision template', () => {
    const template = read('starter-pack/templates/reference-intake-decision-template.yaml');

    expect(template).toContain('source_refs: []');
    expect(template).toContain('sensitivity: unknown');
    expect(template).toContain('posture: reference_only');
    expect(template).toContain('no_skill_mutation_without_review: true');
  });

  it('ships a worked intake example for the evolution pack archive', () => {
    const example = read('examples/reference-intake/evolution-pack-intake.yaml');

    expect(example).toContain('REF-2026-S2-001');
    expect(example).toContain('sha256:dabc9d75fb4c7f4febacebe5d2032d93d92a93610d4bb857484004f1c230244f');
    expect(example).toContain('posture: adapt');
    expect(example).toContain('Automatic adoption or dependency installation');
    expect(example).toContain('Runtime implementation until a later explicit boundary decision');
  });

  it('indexes the contract, template and example', () => {
    const contractsIndex = read('docs/contracts/README.md');
    const starterIndex = read('starter-pack/README.md');
    const examplesIndex = read('examples/README.md');

    expect(contractsIndex).toContain('reference-intake-adoption-contract.md');
    expect(starterIndex).toContain('reference-intake-decision-template.yaml');
    expect(examplesIndex).toContain('reference-intake/');
  });
});
