# Web App Security & Trust Boundaries Pack

> Status: S29 minimum domain-governance pack. Docs-first, provider-agnostic, no runtime enforcement.

## Goal

Define the smallest reusable operating layer for web app and API trust boundaries in AletheIA:

- client/server separation;
- secrets and credential exposure;
- authorization and data isolation;
- tenant-scoped retrieval and context assembly;
- authoritative business logic;
- inbound integration trust;
- telemetry, logging and artifact hygiene;
- untrusted content handling and rendering safety.

This pack converts the concept source into reviewable domain guidance. It does **not** create an AppSec scanner, compliance framework, runtime policy engine, vendor tutorial, code generator or executable enforcement.

## Authority boundary

AletheIA defines the review language and evidence requirements. The application, platform, runtime, security tooling and project-local policy remain authoritative for actual enforcement.

Core rule:

> Public surfaces may request and display; authoritative layers decide, verify, isolate and commit security-sensitive behavior.

## Trust-boundary model

| Boundary | Default posture | Review question |
|---|---|---|
| Public client | untrusted for authority | Is it only requesting/displaying, or is it deciding sensitive truth? |
| Server/API/authoritative service | decision layer | Does it verify identity, authorization, invariants and side effects? |
| Data store | scoped authority | Are tenant/user boundaries enforced outside the UI? |
| Model/agent context | derived context | Was context scoped before inference? |
| Inbound integration | untrusted until verified | Is origin/signature/idempotency/replay handled? |
| Logs/traces/artifacts | potential leak path | Are secrets and sensitive payloads minimized or redacted? |
| External/rendered content | untrusted input | Is rendering/content handling safe and separated from commands? |

## Required review areas

### 1. Client/server separation

- The client must not contain secrets or sensitive business logic.
- UI visibility is not proof of authorization.
- Security-sensitive state transitions require an authoritative layer.

### 2. Secrets and credentials

- Secrets must not appear in frontend bundles, logs, traces, handoffs or examples.
- Public config and secret config must be explicitly separated.
- Missing evidence about secret handling is `unavailable`, not assumed safe.

### 3. Auth and data isolation

- Authorization must be explicit and reviewable.
- Tenant/user-scoped data must be isolated by an authoritative layer such as policy, query scoping or equivalent controls.
- Cross-tenant or cross-user retrieval must be treated as high risk.

### 4. Tenant-scoped retrieval and model context

- Context sent to a model or agent must be scoped before inference.
- Broad retrieval must not silently become cross-tenant exposure.
- The model does not decide what private context is allowed to be assembled.

### 5. Authoritative business logic

Pricing, payment, permissions, eligibility, quota, approvals and critical transitions belong in the authoritative layer. The client can submit an intent; it cannot be the source of truth.

### 6. Inbound integrations

- Webhooks and inbound events should verify origin, signature or equivalent trust signal when state-changing.
- Idempotency and replay protection should be considered for repeated inbound events.
- Unverified inbound events must not silently commit state.

### 7. Logs, telemetry and artifact hygiene

- Logs and traces must not store secrets or sensitive payloads unless explicitly permitted and minimized.
- Handoffs, learnings and examples should use metadata, redaction or source references.
- Operational artifacts can become leak paths and must be reviewed as part of security posture.

### 8. Untrusted content and rendering safety

- External content is untrusted by default.
- Content, evidence and commands must not collapse into one trust category.
- Rendering safety must be reviewed where user-generated or external content appears.

## Minimal review record

```yaml
web_app_security_review:
  review_id: WASR-YYYYMMDD-001
  work_slice_ref: WS-...
  source_refs: []
  boundary_review:
    public_client_authority: unavailable
    authoritative_layer_ref: unavailable
    auth_data_isolation: unavailable
    tenant_context_scoping: unavailable
    inbound_integration_trust: unavailable
    logs_artifacts_hygiene: unavailable
    untrusted_content_handling: unavailable
  findings:
    - id: WAS-FINDING-001
      category: secret_exposure | cross_tenant_context | unverified_webhook | client_owned_critical_logic | unsafe_rendering | unavailable
      severity: low | medium | high | critical | unavailable
      evidence_refs: []
      required_action: human_review_required
  decision:
    posture: proceed | proceed_with_conditions | require_human_review | block
    rationale: ...
```

## Evaluation scenarios

A minimum pack should be tested against:

1. secret appears in a client bundle, log or handoff;
2. UI hides data but API/data layer lacks authorization evidence;
3. retrieval assembles cross-tenant context before model inference;
4. webhook or inbound event commits state without verification;
5. client controls price, permission or critical state transition;
6. external content is rendered or reused without safe handling.

## Non-goals

This pack does not:

- replace professional security review;
- provide vendor-specific Supabase/Vercel/Next.js instructions;
- create scanners or enforcement engines;
- add schemas, databases, collectors or dashboards;
- claim AletheIA technically enforces web security.

## Related sources

- [Web App Security & Trust Boundaries concept](../concepts/web-app-security-trust-boundaries.md)
- [Domain Governance Packs](../concepts/domain-governance-packs.md)
- [Restricted Knowledge Usage Policy](../contracts/restricted-knowledge-usage-policy.md)
- [Tool Permission Matrix](../reference/tool-permission-matrix.md)
- [AI Agent Security & Prompt Injection Pack](ai-agent-security-prompt-injection.md)
