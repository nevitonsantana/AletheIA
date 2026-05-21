# Scope

## In scope

- Ingesting telemetry from approved sources (Datadog, CloudWatch, internal `events-bus`).
- Classifying events into incident candidates using rule-based heuristics and a small model.
- Emitting alerts to PagerDuty, Slack `#incidents`, and the in-house dashboard.
- Maintaining a 90-day rolling history of classified events for retrospectives.

## Out of scope

- **Incident remediation.** Crisis Monitor detects and alerts; remediation lives in other systems.
- **Root cause analysis.** RCA is a downstream activity performed by the responding engineer with separate tooling.
- **Customer-facing communication.** Status-page updates are handled by the comms tool, not Crisis Monitor.
- **Long-term analytics.** Anything older than 90 days is exported and dropped from operational stores.
