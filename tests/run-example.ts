import fs from "node:fs";
import path from "node:path";

import { runKernel } from "../engine";
import type { ContextPack, KernelRunInput, TaskBrief } from "../engine";

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export interface RunExampleScenarioInput
  extends Omit<KernelRunInput, "taskBrief" | "contextPack"> {
  exampleDir: string;
}

export function runExampleScenario(input: RunExampleScenarioInput) {
  const baseDir = path.resolve(process.cwd(), "examples", input.exampleDir);
  const taskBrief = readJsonFile<TaskBrief>(path.join(baseDir, "task-brief.json"));
  const contextPack = readJsonFile<ContextPack>(path.join(baseDir, "context-pack.json"));

  return runKernel({
    ...input,
    taskBrief,
    contextPack,
  });
}

export function printScenarioResult(result: ReturnType<typeof runExampleScenario>): void {
  console.log(result.debugText);
  console.log("\n--- decision record ---");
  console.log(JSON.stringify(result.decisionRecord, null, 2));
  console.log("\n--- execution record ---");
  console.log(JSON.stringify(result.executionRecord, null, 2));
  console.log("\n--- handoff record ---");
  console.log(JSON.stringify(result.handoffRecord, null, 2));
  console.log("\n--- learning record ---");
  console.log(JSON.stringify(result.learningRecord, null, 2));
}
