import { fileURLToPath } from "node:url";
import { validateAgainstSchema } from "../validation.js";
import {
  demoteStaleInventory, recommendRoute,
  type DeclaredInventoryWindow, type LocalRoutingInput,
} from "./local-deterministic-routing.js";

const schemaPath = fileURLToPath(new URL("../../schemas/local-routing-advisory-draft.schema.json", import.meta.url));

export interface AdvisoryClaim {
  kind: "provider_availability" | "route_availability" | "route_capability";
  subject_id: string;
  capability_id?: string;
  source_reference: string;
}

export interface AdvisoryDraftInput {
  version: "local-routing-advisory-draft/v1";
  task_reference: string;
  input: LocalRoutingInput;
  window: DeclaredInventoryWindow;
  claims: AdvisoryClaim[];
}

function claimKey(claim: Pick<AdvisoryClaim, "kind" | "subject_id" | "capability_id">): string {
  return JSON.stringify([claim.kind, claim.subject_id, claim.capability_id ?? null]);
}

/** Local draft only: validates declared provenance, never verifies the source or executes a route. */
export function prepareAdvisoryDraft(raw: unknown) {
  const draft = structuredClone(validateAgainstSchema<AdvisoryDraftInput>(raw, schemaPath));
  if (draft.input.inventory_origin !== "caller_declaration") {
    throw new Error("Invalid advisory draft: inventory_origin must be caller_declaration.");
  }
  // The base validator checks IDs, references and all routing fields before claim matching.
  const freshness = demoteStaleInventory(draft.input, draft.window);
  const expected = new Set<string>();
  for (const provider of freshness.source_input.providers) {
    expected.add(claimKey({ kind: "provider_availability", subject_id: provider.id }));
  }
  for (const route of freshness.source_input.routes) {
    expected.add(claimKey({ kind: "route_availability", subject_id: route.id }));
    for (const capability of route.capabilities) {
      expected.add(claimKey({ kind: "route_capability", subject_id: route.id, capability_id: capability }));
    }
  }
  const seen = new Set<string>();
  for (const claim of draft.claims) {
    if ((claim.kind === "route_capability") !== (claim.capability_id !== undefined)) {
      throw new Error("Invalid advisory draft: capability_id is required only for route_capability claims.");
    }
    const key = claimKey(claim);
    if (!expected.has(key)) throw new Error("Invalid advisory draft: claim does not match a declared availability or capability.");
    if (seen.has(key)) throw new Error("Invalid advisory draft: duplicate claim.");
    seen.add(key);
  }
  if (seen.size !== expected.size) throw new Error("Invalid advisory draft: every declared availability and route capability requires a source reference.");
  return {
    status: "draft_requires_human_review" as const,
    declaration: draft,
    freshness,
    recommendation: recommendRoute(freshness.routing_input),
  };
}
