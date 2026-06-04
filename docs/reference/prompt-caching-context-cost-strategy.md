# Prompt Caching and Context Cost Strategy

## Purpose

Reduce cost and latency without reducing quality. The rule is: reduce waste through context architecture, not by impoverishing necessary context.

This reference details the stable/volatile split, deterministic serialization, the compaction trade-off, telemetry, and anti-patterns referenced by the [Agent Harness Governance Extension](../contracts/agent-harness-governance-extension.md).

## Stable prefix and volatile suffix

```yaml
prompt_caching_strategy:
  stable_prefix:
    - "tool_definitions_in_deterministic_order"
    - "static_system_and_developer_instructions"
    - "stable_scoped_instructions"
    - "stable_skill_index_or_reference_map"
    - "stable_schemas_and_output_contracts"
    - "stable_reusable_context_when_relevant"
  volatile_suffix:
    - "current_user_task"
    - "dynamic_runtime_state"
    - "latest_tool_observations"
    - "fresh_retrieved_snippets"
    - "approval_request_or_response"
    - "timestamps_request_ids_session_ids_when_needed"
```

## Ordering rule

Bad:

```txt
timestamp + request_id + fresh search result + system instructions + tools + task
```

Better:

```txt
stable tools + stable instructions + stable schemas + stable reference map + dynamic state + current task
```

## Deterministic serialization

```yaml
deterministic_serialization:
  required:
    - "stable_tool_order"
    - "stable_json_key_order"
    - "stable_schema_formatting"
    - "stable_instruction_block_order"
    - "stable_skill_listing_order"
    - "versioned_prompt_bundles"
    - "versioned_tool_bundles"
```

## Context relevance still wins

Cache-friendly does not mean loading everything. Rules:

- include stable content only when relevant;
- use progressive disclosure for skills and tools;
- retrieve just-in-time;
- keep broad instructions small;
- keep volatile snippets near the end.

## Compaction trade-off

Compaction can reduce context but can also break cache reuse. Use it at explicit boundaries: approaching the context window, large outputs, the planning→execution transition, a pause for approval, resuming long work, or a workflow milestone.

Avoid rewriting the summary constantly, reordering tools or schemas, changing stable instructions mid-run, or placing timestamps in the stable prefix.

## Cache telemetry

```yaml
cache_telemetry:
  fields:
    - "request_id"
    - "session_id"
    - "provider"
    - "model"
    - "prompt_bundle_version"
    - "tool_bundle_version"
    - "system_prompt_hash"
    - "tools_hash"
    - "input_tokens_new"
    - "cache_read_tokens"
    - "cache_write_tokens"
    - "cached_tokens"
    - "output_tokens"
    - "time_to_first_token_ms"
    - "total_latency_ms"
    - "estimated_cost"
```

## Cache-killing anti-patterns

Avoid:

- a timestamp at the start of the system prompt;
- a request ID in the stable prefix;
- random tool order;
- random JSON key order;
- volatile retrieval before stable instructions;
- secrets in the prefix;
- rewriting history every turn;
- changing schemas without versioning;
- loading all tools and skills up front.

## Relationship to AletheIA

This strategy complements the Runtime Effort Governance Contract, the Knowledge Governance Layer, the Runtime Adapter Contract, and Resource-Aware Operations.
