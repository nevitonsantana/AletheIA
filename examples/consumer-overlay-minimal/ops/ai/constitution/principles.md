# Principles

Non-negotiable rules. Violating these is a stop-the-world event, not a code-review comment.

1. **Never silently drop an alert.** Every ingested event reaches a sink, or a higher-priority alert is emitted explaining why it did not.
2. **No PII in logs or prompts.** Region IDs, service names, and incident IDs are fine. Person identifiers, customer names, and account numbers are not.
3. **No direct writes to the `incidents` table.** All writes go through the `incident-service` API so that dedup, audit, and webhook fan-out remain consistent.
4. **Detection latency budget is 5 minutes p95.** Any change that pushes p95 above 5 minutes must be feature-flagged and rolled back if the budget is exceeded for 24h.
5. **No new external dependencies without a `learnings/` entry.** Cost: every dep is a supply-chain surface and a runtime risk. The justification must be durable, not Slack-thread.
6. **Schema migrations require a paired rollback migration.** No exceptions.
7. **Alert sinks fail loud.** A sink that swallows a failure is a worse outcome than one that double-alerts. Prefer the latter.
