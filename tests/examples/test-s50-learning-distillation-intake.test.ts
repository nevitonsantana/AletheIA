import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('S50 Learning Distillation & Context Hygiene intake', () => {
  it('registers v0.7 as the current source and preserves older variants as superseded only', () => {
    const intake = read('examples/reference-intake/s50-learning-distillation-context-hygiene-intake.yaml');
    const backlog = read('docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md');

    expect(intake).toContain('REF-2026-S50-001');
    expect(intake).toContain('sha256:ba4addc4ae15743223d304a5e9284ef39e987eb2f556');
    expect(intake).toContain('current_version: v0.7');
    expect(intake).toContain('new-Pacote_Learning_Distillation_Context_Hygiene_Addendum_v0_6.zip');
    expect(intake).toContain('older variants are provenance only');
    expect(backlog).toContain('Learning Distillation & Context Hygiene Addendum v0.7');
    expect(backlog).toContain('P24/S50 current external reference');
  });

  it('keeps intake advisory and blocks implementation authority from the external pack', () => {
    const intake = read('examples/reference-intake/s50-learning-distillation-context-hygiene-intake.yaml');
    const backlog = read('docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md');

    expect(intake).toContain('posture: adapt');
    expect(intake).toContain('No runtime behavior, memory writeback or execution substrate change from intake alone.');
    expect(intake).toContain('no_memory_writeback: true');
    expect(intake).toContain('no_dashboard_or_collector: true');
    expect(intake).toContain('no_skill_mutation_without_review: true');
    expect(backlog).toContain('S50 registers v0.7 as the current source');
    expect(backlog).toContain('without implementing learning automation, memory writeback, new schemas or Adaptive Skills changes');
  });
});
