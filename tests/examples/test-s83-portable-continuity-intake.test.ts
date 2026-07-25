import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('S83 Portable Continuity reference intake', () => {
  it('registers the source and narrows continuity to the existing Restart Package', () => {
    const intake = read('examples/reference-intake/s83-portable-continuity-intake.yaml');
    const backlog = read('docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md');

    expect(intake).toContain('REF-2026-S83-001');
    expect(intake).toContain(
      'sha256:d2e91b2429245472418b2c0a84b0277da34670505e222fe762fb763d91886f21',
    );
    expect(intake).toContain('posture: adapt');
    expect(intake).toContain('new_artifact_count: 0');
    expect(intake).toContain('canonical_continuity_artifact: Restart Package');
    expect(backlog).toContain('AletheIA Portable Governed Work Evolution Pack v0.1');
    expect(backlog).toContain('P25/S83 intake-only source');
  });

  it('authorizes only S84 compatibility review and keeps implementation blocked', () => {
    const intake = read('examples/reference-intake/s83-portable-continuity-intake.yaml');
    const backlog = read('docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md');
    const systemState = read('SYSTEM_STATE.md');
    const review = read('docs/reports/s84-restart-package-portability-compatibility-review.md');
    const pilot = read('docs/pilots/s85-codex-to-codex-restart-pilot.md');
    const decision = read('docs/reports/s86-same-runtime-portability-value-decision.md');

    expect(intake).toContain('verdict: proceed_to_compatibility_review');
    expect(intake).toContain('residual_gap_status: hypothesis_only');
    expect(intake).toContain('authorized_next_slice: S84 only');
    expect(intake).toContain('implementation_authority: none');
    expect(intake).toContain('no_schema_or_composer: true');
    expect(intake).toContain('no_skill_mutation_without_review: true');
    expect(backlog).toContain('S84 — Restart Package portability compatibility review');
    expect(backlog).toContain('S85 remains blocked until S84');
    expect(systemState).toContain('**Active:** S86 Same-Runtime Portability Value Decision.');
    expect(systemState).toContain('S87-S89 and all template/schema/composer/adapter adoption remain blocked');
    expect(backlog).toContain('S84 delivered a pilot-only optional profile');
    expect(review).toContain('**Verdict:** `refine`');
    expect(review).toContain('**Canonical artifact count:** `0`');
    expect(review).toContain('**Unavailable destination semantics:**');
    expect(pilot).toContain('## Complete receiving-session outputs');
    expect(pilot).toContain('The candidate makes the bounded metadata legible');
    expect(decision).toContain('**Outcome:** `insufficient_evidence`');
  });

  it('does not introduce the rejected schema or composer surfaces', () => {
    expect(
      existsSync(join(root, 'schemas/aletheia-portable-governed-work-state.schema.json')),
    ).toBe(false);
    expect(existsSync(join(root, 'engine/portable-work-state-composer.ts'))).toBe(false);
  });
});
