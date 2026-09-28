import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { demoteStaleInventory, recommendRoute } from "../engine/experiments/local-deterministic-routing.js";

const root = process.cwd();
const fixtureDirectory = path.join(root, "examples/local-deterministic-routing");
const fixtures = ["task-analysis.json", "task-testing.json", "task-unknown-availability.json"];
const decisions = fixtures.map((fixture) => {
  const input: unknown = JSON.parse(fs.readFileSync(path.join(fixtureDirectory, fixture), "utf8"));
  const started = performance.now();
  const decision = recommendRoute(input);
  return { fixture, calculation_duration_ms: performance.now() - started, decision };
});

const snapshotInput: unknown = JSON.parse(fs.readFileSync(path.join(fixtureDirectory, "task-analysis.json"), "utf8"));
const freshnessAssessment = demoteStaleInventory(snapshotInput, {
  observed_at_ms: 1_000,
  evaluated_at_ms: 3_001,
  max_age_ms: 2_000,
});
const freshnessRehearsal = {
  synthetic: true,
  assessment: freshnessAssessment,
  decision: recommendRoute(freshnessAssessment.routing_input),
};

console.log(JSON.stringify({ experiment: "local-deterministic-routing/v1", decisions, freshness_rehearsal: freshnessRehearsal }, null, 2));
