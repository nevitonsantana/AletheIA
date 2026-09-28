import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  demoteStaleInventory,
  recommendRoute,
  type LocalRoutingInput,
} from "../../engine/experiments/local-deterministic-routing";

const directory = path.join(process.cwd(), "examples/local-deterministic-routing");
const fixture = (name = "task-analysis.json"): LocalRoutingInput =>
  JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));

interface AdvisoryScenario {
  name: string;
  input: () => LocalRoutingInput;
  selected: string | null;
  alternatives: string[];
  rejectedRoute: string;
  rejectionReason: string;
}

const scenarios: AdvisoryScenario[] = [
  {
    name: "01 baseline analysis",
    input: () => fixture(),
    selected: "fictional-sparrow",
    alternatives: ["fictional-otter"],
    rejectedRoute: "fictional-heron",
    rejectionReason: "missing_required_capabilities:analysis",
  },
  {
    name: "02 testing requirement",
    input: () => fixture("task-testing.json"),
    selected: "fictional-heron",
    alternatives: ["fictional-otter"],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "missing_required_capabilities:testing",
  },
  {
    name: "03 reversed preference",
    input: () => {
      const input = fixture();
      input.preference = ["fictional-otter", "fictional-sparrow", "fictional-heron"];
      return input;
    },
    selected: "fictional-otter",
    alternatives: ["fictional-sparrow"],
    rejectedRoute: "fictional-heron",
    rejectionReason: "missing_required_capabilities:analysis",
  },
  {
    name: "04 blocked provider",
    input: () => {
      const input = fixture();
      input.provider_policy.allowed_provider_ids = [];
      return input;
    },
    selected: null,
    alternatives: [],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "provider_not_allowed",
  },
  {
    name: "05 unknown provider availability",
    input: () => {
      const input = fixture();
      input.providers[0].available = "unknown";
      return input;
    },
    selected: null,
    alternatives: [],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "provider_availability_unknown",
  },
  {
    name: "06 unknown preferred route availability",
    input: () => {
      const input = fixture();
      input.routes[0].available = "unknown";
      return input;
    },
    selected: "fictional-otter",
    alternatives: [],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "route_availability_unknown",
  },
  {
    name: "07 all routes unavailable",
    input: () => {
      const input = fixture();
      for (const route of input.routes) route.available = false;
      return input;
    },
    selected: null,
    alternatives: [],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "route_unavailable",
  },
  {
    name: "08 unknown required capability",
    input: () => {
      const input = fixture();
      input.request.required_capabilities = ["not-declared"];
      return input;
    },
    selected: null,
    alternatives: [],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "unknown_required_capabilities:not-declared",
  },
  {
    name: "09 disallowed required capability",
    input: () => {
      const input = fixture();
      input.request_policy.allowed_capability_ids = ["testing"];
      return input;
    },
    selected: null,
    alternatives: [],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "required_capabilities_not_allowed:analysis",
  },
  {
    name: "10 stale declared inventory",
    input: () => demoteStaleInventory(fixture(), {
      observed_at_ms: 1_000,
      evaluated_at_ms: 3_001,
      max_age_ms: 2_000,
    }).routing_input,
    selected: null,
    alternatives: [],
    rejectedRoute: "fictional-sparrow",
    rejectionReason: "provider_availability_unknown",
  },
];

describe("ten synthetic advisory review scenarios", () => {
  it.each(scenarios)("$name", (scenario) => {
    const input = scenario.input();
    const result = recommendRoute(input);
    expect(input.inventory_origin).toBe("synthetic_fixture");
    expect(result.selected_route_id).toBe(scenario.selected);
    expect(result.alternative_route_ids).toEqual(scenario.alternatives);
    expect(result.rejected_routes.find((route) => route.route_id === scenario.rejectedRoute)?.reasons)
      .toContain(scenario.rejectionReason);
    expect(result.outcome).toBe(scenario.selected === null ? "no_eligible_route" : "recommended");
  });
});
