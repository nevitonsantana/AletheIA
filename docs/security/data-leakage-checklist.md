# Data-Leakage Checklist

## Goal

Prevent sensitive content from a knowledge source from leaving its authorized
boundary — in the **final answer, logs, traces, telemetry, or handoffs**. Final
output is the obvious surface; the edges leak more often.

Apply this checklist before a source above `public` sensitivity contributes to any
output, and again before that output crosses a boundary. It operationalizes the
exposure table in [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md).

---

## What counts as leakable content

Treat the presence of any of the following, drawn from a source, as a leak risk
until a restriction is applied:

- **PII** — names, contact details, identifiers tied to a person.
- **Credentials and secrets** — keys, tokens, passwords, connection strings.
- **Strategic detail** — unreleased plans, pricing, roadmap, financials, M&A.
- **Contractual terms** — clauses, rates, SLAs, party-specific commitments.
- **Client / customer identifiers** — names, logos, account references, anything
  that attributes content to a specific third party.
- **Regulated data** — anything tied to a named regulation (privacy law, sectoral
  rule, contractual data clause); always treated as `regulated`.

---

## The checklist

Run every item. A `fail` on any item blocks the output until resolved.

### 1. Classify before you emit

- [ ] The source's `sensitivity` is known and is one of the five canonical levels.
- [ ] The destination of the output is known (in-scope, cross-boundary, external,
      log, trace, handoff).
- [ ] The action is permitted for that level + destination per the
      [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md) table.

### 2. Final answer

- [ ] No verbatim restricted excerpt appears where the table forbids it.
- [ ] No full source is reproduced; `confidential`+ uses capsule or authorized excerpt only.
- [ ] External deliverables contain at most a summary of `internal`, and nothing of
      `confidential`/`restricted`/`regulated`.
- [ ] Leakable content present in a permitted summary is masked where required.

### 3. Logs, traces, telemetry

- [ ] No restricted excerpt is written to logs — only id, version, scope, decision.
- [ ] Captured prompt/response pairs in traces have restricted segments masked.
- [ ] Incidental sensitive content (e.g. a client name appearing mid-reasoning) is
      masked at the boundary, not just in the final answer.
- [ ] No restricted excerpt is persisted into agent or session long-term memory.

### 4. Handoffs

- [ ] Restrictions travel with the content (see [logs-and-handoffs-policy](logs-and-handoffs-policy.md)).
- [ ] Cross-agent / cross-thread / cross-boundary handoffs strip restricted excerpts
      and replace them with capsule + pack id + version.

### 5. Export prohibition

- [ ] No `confidential`/`restricted`/`regulated` source is exported outside the workspace.
- [ ] `export_allowed: false` on the pack manifest is honored even when a caller requests export.
- [ ] When export is refused, the refusal names the source, version, sensitivity, and the rule.

### 6. Masking

- [ ] Where the policy says "masked" or "summary only", masking is applied to the
      content itself, not signalled and then skipped.
- [ ] Masking is concrete (redaction / placeholder), not a generic "be careful" note.

---

## Outcome

Translate findings into structured restrictions, not prose. Acceptable outputs:

- `allow` — no leakable content, or all of it is `public`.
- `allow_with_restrictions` — list the restrictions applied (`no_verbatim`,
  `mask_in_logs`, `capsule_only`, `summary_only`, `no_export`).
- `refuse` — name the failed item and the source.

Every outcome — including `allow` — is recorded per
[knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md). The log records
identifiers and decisions, never the leaked content itself.

---

## If the system cannot honor a restriction

Fail closed. If logs, traces, or handoffs cannot carry the required masking, the
source must not be used in that path — degrade to capsule, or refuse. Silent
degradation is itself a leak.

---

## See also

- [restricted-knowledge-usage-policy](../contracts/restricted-knowledge-usage-policy.md)
- [logs-and-handoffs-policy](logs-and-handoffs-policy.md)
- [human-review-criteria](human-review-criteria.md)
- [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md)
