import { fileURLToPath } from "node:url";
import { validateAgainstSchema } from "../validation.js";

export const LOCAL_DETERMINISTIC_ROUTING_EXPERIMENT_VERSION = "local-deterministic-routing/v1";
export type DeclaredAvailability = boolean | "unknown";
const schemaPath = fileURLToPath(
  new URL("../../schemas/local-deterministic-routing-input.schema.json", import.meta.url),
);

export interface LocalRoutingInput {
  version: "local-deterministic-routing-input/v1";
  inventory_origin?: "synthetic_fixture" | "caller_declaration";
  capability_catalog: string[];
  request_policy: { default: "deny"; allowed_capability_ids: string[] };
  provider_policy: { default: "deny"; allowed_provider_ids: string[] };
  providers: Array<{ id: string; available: DeclaredAvailability }>;
  routes: Array<{ id: string; provider_id: string; available: DeclaredAvailability; capabilities: string[] }>;
  preference: string[];
  request: { required_capabilities: string[] };
}

export interface RouteRejection { route_id: string; reasons: string[]; }
export interface LocalRoutingResult {
  experiment_version: typeof LOCAL_DETERMINISTIC_ROUTING_EXPERIMENT_VERSION;
  input_version: LocalRoutingInput["version"];
  input: LocalRoutingInput;
  outcome: "recommended" | "no_eligible_route";
  selected_route_id: string | null;
  eligible_route_ids: string[];
  alternative_route_ids: string[];
  rejected_routes: RouteRejection[];
  rejected_required_capabilities: string[];
}

export interface DeclaredInventoryWindow {
  observed_at_ms: number | null;
  evaluated_at_ms: number;
  max_age_ms: number;
}

export interface InventoryFreshnessAssessment {
  status: "within_window" | "stale" | "undated";
  age_ms: number | null;
  window: DeclaredInventoryWindow;
  source_input: LocalRoutingInput;
  routing_input: LocalRoutingInput;
}

function duplicateIds(values: string[], label: string): void {
  const duplicate = values.find((value, index) => values.indexOf(value) !== index);
  if (duplicate) throw new Error("Invalid local routing input: duplicate " + label + " id '" + duplicate + "'.");
}

function validateReferences(input: LocalRoutingInput): void {
  duplicateIds(input.providers.map((provider) => provider.id), "provider");
  duplicateIds(input.routes.map((route) => route.id), "route");
  const providerIds = new Set(input.providers.map((provider) => provider.id));
  const routeIds = new Set(input.routes.map((route) => route.id));
  const capabilityIds = new Set(input.capability_catalog);
  for (const capabilityId of input.request_policy.allowed_capability_ids) {
    if (!capabilityIds.has(capabilityId)) throw new Error("Invalid local routing input: request allowlist references unknown capability '" + capabilityId + "'.");
  }
  for (const providerId of input.provider_policy.allowed_provider_ids) {
    if (!providerIds.has(providerId)) throw new Error("Invalid local routing input: provider allowlist references unknown provider '" + providerId + "'.");
  }
  for (const route of input.routes) {
    if (!providerIds.has(route.provider_id)) throw new Error("Invalid local routing input: route '" + route.id + "' references unknown provider '" + route.provider_id + "'.");
    for (const capability of route.capabilities) {
      if (!capabilityIds.has(capability)) throw new Error("Invalid local routing input: route '" + route.id + "' references unknown capability '" + capability + "'.");
    }
  }
  for (const routeId of input.preference) {
    if (!routeIds.has(routeId)) throw new Error("Invalid local routing input: preference references unknown route '" + routeId + "'.");
  }
  for (const routeId of routeIds) {
    if (!input.preference.includes(routeId)) throw new Error("Invalid local routing input: route '" + routeId + "' is missing from preference.");
  }
}

function snapshotInput(rawInput: unknown): LocalRoutingInput {
  const input = structuredClone(validateAgainstSchema<LocalRoutingInput>(rawInput, schemaPath));
  validateReferences(input);
  return input;
}

function validTimestamp(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) >= 0;
}

/** Offline freshness rehearsal. It can only demote caller-declared availability, never attest it. */
export function demoteStaleInventory(rawInput: unknown, rawWindow: unknown): InventoryFreshnessAssessment {
  const sourceInput = snapshotInput(rawInput);
  if (rawWindow === null || typeof rawWindow !== "object" || Array.isArray(rawWindow)) {
    throw new Error("Invalid inventory window: expected an object.");
  }
  const window = structuredClone(rawWindow) as DeclaredInventoryWindow;
  if (Object.keys(window).sort().join(",") !== "evaluated_at_ms,max_age_ms,observed_at_ms" ||
      !validTimestamp(window.evaluated_at_ms) || !validTimestamp(window.max_age_ms) ||
      (window.observed_at_ms !== null && !validTimestamp(window.observed_at_ms)) ||
      (window.observed_at_ms !== null && window.observed_at_ms > window.evaluated_at_ms)) {
    throw new Error("Invalid inventory window: use nonnegative safe-integer milliseconds, an observed timestamp no later than evaluation, or null when undated.");
  }

  const age = window.observed_at_ms === null ? null : window.evaluated_at_ms - window.observed_at_ms;
  const status = age === null ? "undated" : age > window.max_age_ms ? "stale" : "within_window";
  const routingInput = structuredClone(sourceInput);
  if (status !== "within_window") {
    for (const provider of routingInput.providers) if (provider.available === true) provider.available = "unknown";
    for (const route of routingInput.routes) if (route.available === true) route.available = "unknown";
  }
  return { status, age_ms: age, window, source_input: sourceInput, routing_input: routingInput };
}

/** Pure local experiment; it does not invoke providers or change runtime, harness, or kernel behavior. */
export function recommendRoute(rawInput: unknown): LocalRoutingResult {
  const input = snapshotInput(rawInput);

  const providers = new Map(input.providers.map((provider) => [provider.id, provider]));
  const routes = new Map(input.routes.map((route) => [route.id, route]));
  const required = input.request.required_capabilities;
  const catalog = new Set(input.capability_catalog);
  const allowedRequiredCapabilities = new Set(input.request_policy.allowed_capability_ids);
  const allowedProviders = new Set(input.provider_policy.allowed_provider_ids);
  const rejectedRequired = required.filter((capability) => !catalog.has(capability) || !allowedRequiredCapabilities.has(capability));
  const unknownRequired = required.filter((capability) => !catalog.has(capability));
  const disallowedRequired = required.filter((capability) => catalog.has(capability) && !allowedRequiredCapabilities.has(capability));
  const eligible: string[] = [];
  const rejectedRoutes: RouteRejection[] = [];

  for (const routeId of input.preference) {
    const route = routes.get(routeId)!;
    const provider = providers.get(route.provider_id)!;
    const reasons: string[] = [];
    if (!allowedProviders.has(provider.id)) reasons.push("provider_not_allowed");
    if (route.available === false) reasons.push("route_unavailable");
    if (route.available === "unknown") reasons.push("route_availability_unknown");
    if (provider.available === false) reasons.push("provider_unavailable");
    if (provider.available === "unknown") reasons.push("provider_availability_unknown");
    if (unknownRequired.length > 0) reasons.push("unknown_required_capabilities:" + unknownRequired.join(","));
    if (disallowedRequired.length > 0) reasons.push("required_capabilities_not_allowed:" + disallowedRequired.join(","));
    const missing = required.filter((capability) => catalog.has(capability) && !route.capabilities.includes(capability));
    if (missing.length > 0) reasons.push("missing_required_capabilities:" + missing.join(","));
    if (reasons.length === 0) eligible.push(route.id);
    else rejectedRoutes.push({ route_id: route.id, reasons });
  }

  return { experiment_version: LOCAL_DETERMINISTIC_ROUTING_EXPERIMENT_VERSION, input_version: input.version, input, outcome: eligible.length > 0 ? "recommended" : "no_eligible_route", selected_route_id: eligible[0] ?? null, eligible_route_ids: eligible, alternative_route_ids: eligible.slice(1), rejected_routes: rejectedRoutes, rejected_required_capabilities: rejectedRequired };
}
