import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('S12 Agent Role Contract Reconciliation', () => {
  it('maps professional projections to portable roles without creating a second catalog', () => {
    const contract = read('docs/contracts/agent-role-contract-reconciliation.md');

    expect(contract).toContain('software_engineer');
    expect(contract).toContain('qa_governance_reviewer');
    expect(contract).toContain('implementer');
    expect(contract).toContain('reviewer');
    expect(contract).toContain('Portable role is canonical');
    expect(contract).toContain('second role catalog');
  });

  it('keeps authority, gates, merge and deployment human/governed', () => {
    const contract = read('docs/contracts/agent-role-contract-reconciliation.md');

    expect(contract).toContain('may_approve_gate: false');
    expect(contract).toContain('may_merge_or_deploy: false');
    expect(contract).toContain('No self-approval');
    expect(contract).toContain('final acceptance remains with the human owner');
  });

  it('provides a conservative role plan template', () => {
    const template = read('starter-pack/templates/agent-role-plan-template.yaml');

    expect(template).toContain('professional_projection: software_engineer');
    expect(template).toContain('portable_role: implementer');
    expect(template).toContain('approve_own_work');
    expect(template).toContain('merge_without_human');
    expect(template).toContain('may_approve_gate: false');
  });

  it('ships a worked Software Engineer and QA/Governance Reviewer example', () => {
    const example = read('examples/agent-roles/s12-software-engineer-qa-governance.yaml');

    expect(example).toContain('role-plan-s12-software-engineer');
    expect(example).toContain('role-plan-s12-qa-governance-reviewer');
    expect(example).toContain('mutate_adaptive_skill');
    expect(example).toContain('approve_as_human_owner');
    expect(example).toContain('proceed_with_human_owner_review');
  });

  it('indexes the contract, template and example', () => {
    const contractsIndex = read('docs/contracts/README.md');
    const starterIndex = read('starter-pack/README.md');
    const examplesIndex = read('examples/README.md');

    expect(contractsIndex).toContain('agent-role-contract-reconciliation.md');
    expect(starterIndex).toContain('agent-role-plan-template.yaml');
    expect(examplesIndex).toContain('agent-roles/');
  });
});
