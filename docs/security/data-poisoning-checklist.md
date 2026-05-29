# Data-Poisoning Checklist

## Goal

Make sure a knowledge source is **trustworthy before it can influence anything**.
Poisoning is the risk that a source's content has been altered, fabricated, or
silently changed so that governed decisions inherit bad input. The defense is
provenance, validation, version control, change history, and rollback.

Apply this checklist when a source is **registered**, **re-indexed**, or **updated**
— not on every read. It complements the
[prompt-injection-in-sources-checklist](prompt-injection-in-sources-checklist.md):
injection is about content acting as instruction; poisoning is about content being
untrustworthy in the first place.

---

## The checklist

### 1. Provenance is recorded

- [ ] The source has an owner (person or team), not just an uploader.
- [ ] Origin is documented: where the content came from and who authored it.
- [ ] `source_integrity_notes` (or equivalent provenance field) are present and
      specific enough to be reviewable.
- [ ] For external sources, the chain from origin to registry is traceable.

### 2. Validate before indexing

- [ ] Content is reviewed for plausibility and authenticity before it enters the registry.
- [ ] A source with weak or absent provenance is **not** eligible for `governed`
      maturity — at most `minimal`.
- [ ] Sensitivity and authority are assigned from the owner's classification, not inferred.

### 3. Version control

- [ ] The source is pinned to a specific version (`source_version`, semver).
- [ ] Consumers reference a version; they do not float to "latest" implicitly.
- [ ] The version in use is captured in the audit log on every consumption.

### 4. Change history

- [ ] Updates produce a new version and a change-log entry, not an in-place overwrite.
- [ ] Each change records what changed, who changed it, and why.
- [ ] A change that raises sensitivity or authority triggers re-evaluation.

### 5. Rollback

- [ ] A prior known-good version can be restored.
- [ ] Rollback is possible without losing the audit trail of what was in use when.
- [ ] If a poisoned or compromised version is detected, consumers can be repointed to
      the last trusted version.

---

## Outcome

- `pass` — provenance, versioning, and rollback are all in place.
- `warn` — usable at reduced maturity (`minimal` / `operational`); record the gap and
      the required fix.
- `fail` — provenance insufficient or rollback impossible; refuse registration / use
      until fixed.

Record the assessment per [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md).

---

## What this is not

This is operational discipline, not cryptographic supply-chain attestation. Content
signing, hash chains, and automated integrity verification are future work. The
`pack_integrity_hash` field in the audit-log spec is the seam where such tooling
would attach.

---

## See also

- [knowledge-source-contract](../contracts/knowledge-source-contract.md) — provenance and ownership requirements
- [prompt-injection-in-sources-checklist](prompt-injection-in-sources-checklist.md)
- [knowledge-audit-log-spec](../contracts/knowledge-audit-log-spec.md)
