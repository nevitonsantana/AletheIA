# Web App Security Review Checklist

Use this checklist when a Work Slice changes a web app, API, integration, model context path, logging behavior or security-sensitive client/server boundary.

## 1. Client/server authority

- Does the client only request/display, or does it decide sensitive behavior?
- Are price, permission, eligibility, payment, quota or critical transitions verified by an authoritative layer?
- Is UI visibility being mistaken for authorization?

## 2. Secrets and config

- Could secrets appear in frontend bundles, public config, logs, traces, examples or handoffs?
- Are public and secret configuration paths separated?
- Are missing checks marked `unavailable` instead of assumed safe?

## 3. Auth and data isolation

- Is authorization explicit and source-backed?
- Is tenant/user isolation enforced outside the UI?
- Could a broader query, retrieval path or cache expose another tenant/user?

## 4. Model/agent context scoping

- Is context scoped before inference?
- Does a model or agent receive only context it is allowed to see?
- Are external/retrieved contents classified as evidence/context rather than authority?

## 5. Inbound integrations

- Are state-changing webhooks or inbound events verified?
- Is idempotency/replay considered?
- Are unverified events prevented from committing state?

## 6. Logs, traces and artifacts

- Are sensitive payloads minimized/redacted?
- Do handoffs/learnings/examples avoid copying secrets or restricted content?
- Are operational artifacts reviewed as possible leak paths?

## 7. Untrusted rendering/content

- Is external/user-generated content treated as untrusted?
- Are content, evidence and commands separated?
- Is rendering safety reviewed for user-visible and operator-visible surfaces?

## 8. Decision posture

Choose one:

- `proceed` — required boundaries are source-backed and low-risk.
- `proceed_with_conditions` — bounded follow-up is required.
- `require_human_review` — evidence is missing or risk is high.
- `block` — clear secret exposure, cross-tenant leak or unauthorized critical logic.
