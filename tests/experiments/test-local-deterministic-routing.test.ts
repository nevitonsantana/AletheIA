import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { SchemaValidationError } from "../../engine/validation";
import { demoteStaleInventory, recommendRoute, type DeclaredAvailability, type LocalRoutingInput } from "../../engine/experiments/local-deterministic-routing";

const root = process.cwd();
const fixture = (name: string): LocalRoutingInput => JSON.parse(fs.readFileSync(path.join(root, "examples/local-deterministic-routing", name), "utf8"));
const clone = <T>(value: T): T => structuredClone(value);

describe("local deterministic routing experiment", () => {
  it("returns ordered eligible alternatives after applying the same hard filters", () => {
    const input = fixture("task-analysis.json");
    const result = recommendRoute(input);

    expect(result.outcome).toBe("recommended");
    expect(result.selected_route_id).toBe("fictional-sparrow");
    expect(result.eligible_route_ids).toEqual(["fictional-sparrow", "fictional-otter"]);
    expect(result.alternative_route_ids).toEqual(["fictional-otter"]);
    expect(result.rejected_routes).toEqual([{ route_id: "fictional-heron", reasons: ["missing_required_capabilities:analysis"] }]);
    expect(result.input).toEqual(input);
    expect(result.input_version).toBe(input.version);
    expect(result.input.inventory_origin).toBe("synthetic_fixture");
  });

  it("changes selection only when declared preference or requirements change", () => {
    const preferred = fixture("task-analysis.json");
    preferred.preference = ["fictional-otter", "fictional-sparrow", "fictional-heron"];
    expect(recommendRoute(preferred).selected_route_id).toBe("fictional-otter");

    const taskTesting = fixture("task-testing.json");
    const result = recommendRoute(taskTesting);
    expect(result.selected_route_id).toBe("fictional-heron");
    expect(result.eligible_route_ids).toEqual(["fictional-heron", "fictional-otter"]);
    expect(result.alternative_route_ids).toEqual(["fictional-otter"]);
  });

  it("hard-filters explicit provider policy independently from provider availability", () => {
    const input = fixture("task-analysis.json");
    input.provider_policy.allowed_provider_ids = [];
    const result = recommendRoute(input);

    expect(result.outcome).toBe("no_eligible_route");
    expect(result.alternative_route_ids).toEqual([]);
    expect(result.rejected_routes).toEqual([
      { route_id: "fictional-sparrow", reasons: ["provider_not_allowed"] },
      { route_id: "fictional-otter", reasons: ["provider_not_allowed"] },
      { route_id: "fictional-heron", reasons: ["provider_not_allowed", "missing_required_capabilities:analysis"] },
    ]);
  });

  it("hard-filters route and provider availability", () => {
    const routeUnavailable = fixture("task-analysis.json");
    routeUnavailable.routes[0].available = false;
    expect(recommendRoute(routeUnavailable).selected_route_id).toBe("fictional-otter");

    const providerUnavailable = fixture("task-analysis.json");
    providerUnavailable.providers[0].available = false;
    expect(recommendRoute(providerUnavailable).outcome).toBe("no_eligible_route");
    expect(recommendRoute(providerUnavailable).rejected_routes[0].reasons).toContain("provider_unavailable");
  });

  it("fails closed on unknown route availability while retaining eligible alternatives", () => {
    const input = fixture("task-analysis.json");
    input.routes[0].available = "unknown";
    const result = recommendRoute(input);
    expect(result.selected_route_id).toBe("fictional-otter");
    expect(result.alternative_route_ids).toEqual([]);
    expect(result.rejected_routes[0]).toEqual({ route_id: "fictional-sparrow", reasons: ["route_availability_unknown"] });
    expect(result.input.routes[0].available).toBe("unknown");
  });

  it("fails closed on unknown provider availability without permissive fallback", () => {
    const input = fixture("task-analysis.json");
    input.providers[0].available = "unknown";
    const result = recommendRoute(input);
    expect(result.outcome).toBe("no_eligible_route");
    expect(result.selected_route_id).toBeNull();
    expect(result.alternative_route_ids).toEqual([]);
    expect(result.rejected_routes.every((route) => route.reasons.includes("provider_availability_unknown"))).toBe(true);
  });

  it("rejects other availability values instead of coercing them", () => {
    const input = fixture("task-analysis.json") as unknown as Record<string, unknown>;
    (input.providers as Array<Record<string, unknown>>)[0].available = "listed";
    expect(() => recommendRoute(input)).toThrow(SchemaValidationError);
  });

  it("preserves declared inventory origin without treating it as eligibility evidence", () => {
    const input = fixture("task-unknown-availability.json");
    input.inventory_origin = "caller_declaration";
    const result = recommendRoute(input);
    expect(result.input.inventory_origin).toBe("caller_declaration");
    expect(result.outcome).toBe("no_eligible_route");

    const legacy = fixture("task-analysis.json");
    delete legacy.inventory_origin;
    expect(recommendRoute(legacy).input.inventory_origin).toBeUndefined();

    const invalid = fixture("task-analysis.json") as unknown as Record<string, unknown>;
    invalid.inventory_origin = "codex_discovered";
    expect(() => recommendRoute(invalid)).toThrow(SchemaValidationError);
  });

  it("keeps recommendation and alternatives inside every hard filter across a synthetic matrix", () => {
    const availability: DeclaredAvailability[] = [true, false, "unknown"];
    const providerId = "fictional-local-environment";
    const eligibleRouteIds = ["fictional-sparrow", "fictional-otter"];
    let cases = 0;

    for (const providerAvailability of availability) {
      for (const sparrowAvailability of availability) {
        for (const otterAvailability of availability) {
          for (const providerAllowed of [true, false]) {
            for (const capabilityAllowed of [true, false]) {
              for (const reversedPreference of [true, false]) {
                const input = fixture("task-analysis.json");
                input.providers[0].available = providerAvailability;
                input.routes.find((route) => route.id === "fictional-sparrow")!.available = sparrowAvailability;
                input.routes.find((route) => route.id === "fictional-otter")!.available = otterAvailability;
                input.provider_policy.allowed_provider_ids = providerAllowed ? [providerId] : [];
                input.request_policy.allowed_capability_ids = capabilityAllowed ? ["analysis"] : [];
                if (reversedPreference) input.preference.reverse();

                const result = recommendRoute(input);
                const expected = input.preference.filter((routeId) => {
                  if (!eligibleRouteIds.includes(routeId)) return false;
                  const route = input.routes.find((candidate) => candidate.id === routeId)!;
                  return providerAvailability === true && route.available === true && providerAllowed && capabilityAllowed;
                });

                expect(result.eligible_route_ids).toEqual(expected);
                expect(result.selected_route_id).toBe(expected[0] ?? null);
                expect(result.alternative_route_ids).toEqual(expected.slice(1));
                expect(result.outcome).toBe(expected.length ? "recommended" : "no_eligible_route");
                expect(result.rejected_routes.map((route) => route.route_id)).toEqual(
                  input.preference.filter((routeId) => !expected.includes(routeId)),
                );
                cases++;
              }
            }
          }
        }
      }
    }
    expect(cases).toBe(216);
  });

  it("is repeatable and preserves a defensive, non-mutating replay snapshot", () => {
    const input = fixture("task-analysis.json");
    const before = clone(input);
    const first = recommendRoute(input);
    const second = recommendRoute(input);

    expect(first).toEqual(second);
    expect(input).toEqual(before);
    input.routes[0].available = false;
    input.request!.required_capabilities = ["testing"];
    expect(first.input).toEqual(before);
  });

  it("rejects unknown required capability without selecting a fallback", () => {
    const input = fixture("task-analysis.json");
    input.request!.required_capabilities = ["not-declared"];
    const result = recommendRoute(input);

    expect(result.outcome).toBe("no_eligible_route");
    expect(result.selected_route_id).toBeNull();
    expect(result.rejected_required_capabilities).toEqual(["not-declared"]);
    expect(result.rejected_routes.every((route) => route.reasons.includes("unknown_required_capabilities:not-declared"))).toBe(true);
    expect(result.rejected_routes.every((route) => route.reasons.every((reason) => !reason.startsWith("missing_required_capabilities:")))).toBe(true);
  });

  it("keeps known missing and unknown requirements distinct in one decision", () => {
    const input = fixture("task-analysis.json");
    input.request.required_capabilities = ["analysis", "not-declared"];
    const result = recommendRoute(input);
    expect(result.outcome).toBe("no_eligible_route");
    expect(result.rejected_routes.find((route) => route.route_id === "fictional-sparrow")?.reasons).toEqual([
      "unknown_required_capabilities:not-declared",
    ]);
    expect(result.rejected_routes.find((route) => route.route_id === "fictional-heron")?.reasons).toEqual([
      "unknown_required_capabilities:not-declared",
      "missing_required_capabilities:analysis",
    ]);
  });

  it("rejects invalid JSON shape, duplicate IDs/capabilities, and dangling references", () => {
    expect(() => recommendRoute({ version: "local-deterministic-routing-input/v1" })).toThrow(SchemaValidationError);

    const missingRequest = fixture("task-analysis.json") as Partial<LocalRoutingInput>;
    delete missingRequest.request;
    expect(() => recommendRoute(missingRequest)).toThrow(SchemaValidationError);

    const duplicateProvider = fixture("task-analysis.json");
    duplicateProvider.providers.push({ ...duplicateProvider.providers[0] });
    expect(() => recommendRoute(duplicateProvider)).toThrow("duplicate provider id 'fictional-local-environment'");

    const duplicateRoute = fixture("task-analysis.json");
    duplicateRoute.routes.push({ ...duplicateRoute.routes[0] });
    expect(() => recommendRoute(duplicateRoute)).toThrow("duplicate route id 'fictional-sparrow'");

    const duplicateCatalogCapability = fixture("task-analysis.json");
    duplicateCatalogCapability.capability_catalog.push("analysis");
    expect(() => recommendRoute(duplicateCatalogCapability)).toThrow(SchemaValidationError);

    const duplicateRouteCapability = fixture("task-analysis.json");
    duplicateRouteCapability.routes[0].capabilities.push("analysis");
    expect(() => recommendRoute(duplicateRouteCapability)).toThrow(SchemaValidationError);

    const danglingCapability = fixture("task-analysis.json");
    danglingCapability.routes[0].capabilities.push("unknown-capability");
    expect(() => recommendRoute(danglingCapability)).toThrow("references unknown capability 'unknown-capability'");

    const danglingProvider = fixture("task-analysis.json");
    danglingProvider.routes[0].provider_id = "missing-provider";
    expect(() => recommendRoute(danglingProvider)).toThrow("references unknown provider 'missing-provider'");

    const danglingAllowlist = fixture("task-analysis.json");
    danglingAllowlist.provider_policy.allowed_provider_ids = ["missing-provider"];
    expect(() => recommendRoute(danglingAllowlist)).toThrow("allowlist references unknown provider 'missing-provider'");

    const danglingPreference = fixture("task-analysis.json");
    danglingPreference.preference[0] = "missing-route";
    expect(() => recommendRoute(danglingPreference)).toThrow("preference references unknown route 'missing-route'");
  });
});

describe("request allowlist boundary", () => {
  it("rejects a known capability that is absent from the explicit request allowlist", () => {
    const input = fixture("task-analysis.json");
    input.request_policy.allowed_capability_ids = ["testing"];
    const result = recommendRoute(input);

    expect(result.outcome).toBe("no_eligible_route");
    expect(result.rejected_required_capabilities).toEqual(["analysis"]);
    expect(result.rejected_routes[0].reasons).toContain("required_capabilities_not_allowed:analysis");
  });

  it("rejects request allowlist references outside the capability catalog", () => {
    const input = fixture("task-analysis.json");
    input.request_policy.allowed_capability_ids = ["missing-capability"];
    expect(() => recommendRoute(input)).toThrow("request allowlist references unknown capability 'missing-capability'");
  });
});

describe("declared inventory freshness rehearsal", () => {
  const window = { observed_at_ms: 1_000, evaluated_at_ms: 3_001, max_age_ms: 2_000 };

  it("demotes only true availability when the declared window has expired", () => {
    const input = fixture("task-analysis.json");
    input.routes[1].available = false;
    const before = clone(input);
    const assessment = demoteStaleInventory(input, window);

    expect(assessment.status).toBe("stale");
    expect(assessment.age_ms).toBe(2_001);
    expect(assessment.window).toEqual(window);
    expect(assessment.source_input).toEqual(before);
    expect(input).toEqual(before);
    expect(assessment.routing_input.providers[0].available).toBe("unknown");
    expect(assessment.routing_input.routes.map((route) => route.available)).toEqual(["unknown", false, "unknown"]);
    expect(recommendRoute(assessment.routing_input).outcome).toBe("no_eligible_route");
    expect(demoteStaleInventory(input, window)).toEqual(assessment);
  });

  it("preserves declarations inside the window, including at its exact limit", () => {
    const input = fixture("task-analysis.json");
    const assessment = demoteStaleInventory(input, { ...window, evaluated_at_ms: 3_000 });
    expect(assessment.status).toBe("within_window");
    expect(assessment.routing_input).toEqual(input);
    expect(recommendRoute(assessment.routing_input).selected_route_id).toBe("fictional-sparrow");
  });

  it("fails closed when the observation time is absent", () => {
    const assessment = demoteStaleInventory(fixture("task-analysis.json"), { ...window, observed_at_ms: null });
    expect(assessment.status).toBe("undated");
    expect(assessment.age_ms).toBeNull();
    expect(recommendRoute(assessment.routing_input).selected_route_id).toBeNull();
  });

  it("rejects invalid or future-dated windows and invalid routing inputs", () => {
    const input = fixture("task-analysis.json");
    for (const invalidWindow of [
      { ...window, max_age_ms: -1 },
      { ...window, evaluated_at_ms: 999 },
      { ...window, observed_at_ms: 1.5 },
      { ...window, max_age_ms: Number.MAX_SAFE_INTEGER + 1 },
      { ...window, extra: true },
    ]) expect(() => demoteStaleInventory(input, invalidWindow)).toThrow("Invalid inventory window");
    expect(() => demoteStaleInventory({ version: "invalid" }, window)).toThrow(SchemaValidationError);
  });
});

describe("compiled routing experiment", () => {
  it("loads its schema when imported from a different working directory", () => {
    execFileSync("pnpm", ["-s", "routing:demo"], { cwd: root, stdio: "pipe" });
    const moduleUrl = pathToFileURL(
      path.join(root, "dist/routing-demo/engine/experiments/local-deterministic-routing.js"),
    ).href;
    const fixturePath = path.join(root, "examples/local-deterministic-routing/task-analysis.json");
    const script = `
      import { readFileSync } from "node:fs";
      const { recommendRoute } = await import(${JSON.stringify(moduleUrl)});
      const input = JSON.parse(readFileSync(${JSON.stringify(fixturePath)}, "utf8"));
      console.log(recommendRoute(input).selected_route_id);
    `;

    const output = execFileSync(process.execPath, ["--input-type=module", "-e", script], {
      cwd: os.tmpdir(),
      encoding: "utf8",
    });
    expect(output.trim()).toBe("fictional-sparrow");
  });
});
