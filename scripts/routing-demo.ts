import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { recommendRoute } from "../engine/experiments/local-deterministic-routing.js";

const root = process.cwd();
const fixtureDirectory = path.join(root, "examples/local-deterministic-routing");
const fixtures = ["task-analysis.json", "task-testing.json", "task-unknown-availability.json"];
const decisions = fixtures.map((fixture) => {
  const input: unknown = JSON.parse(fs.readFileSync(path.join(fixtureDirectory, fixture), "utf8"));
  const started = performance.now();
  const decision = recommendRoute(input);
  return { fixture, calculation_duration_ms: performance.now() - started, decision };
});

console.log(JSON.stringify({ experiment: "local-deterministic-routing/v1", decisions }, null, 2));
