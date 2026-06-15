#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  projectGitHubPullRequest,
  renderGitHubPullRequestProjectionMarkdown,
  type GitHubPullRequestProjectionInput,
} from "../engine/visual-operations-projector.js";

export interface VisualOpsCliOptions {
  input: string;
  jsonOutput?: string;
  markdownOutput?: string;
  check: boolean;
}

export interface VisualOpsCliIo {
  stdout: (message: string) => void;
  stderr: (message: string) => void;
}

export const VISUAL_OPS_CHECK_STALE_EXIT_CODE = 2;

const helpText = `Usage:
  pnpm visual-ops:project -- --input <evidence.json> [--json <snapshot.json>] [--markdown <dashboard.md>]
  pnpm visual-ops:project -- --input <evidence.json> [--json <snapshot.json>] [--markdown <dashboard.md>] --check

Options:
  --input       Authorized local GitHub PR evidence JSON.
  --json        Write the projected JSON snapshot.
  --markdown    Write the projected Markdown snapshot.
  --check       Do not write; exit 2 when an output is missing or stale.
  --help        Show this help.

At least one output is required. The CLI performs no network access and does not collect GitHub data.`;

function requireValue(args: string[], index: number, option: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${option} requires a value`);
  return value;
}

export function parseVisualOpsCliArgs(args: string[]): VisualOpsCliOptions | "help" {
  let input: string | undefined;
  let jsonOutput: string | undefined;
  let markdownOutput: string | undefined;
  let check = false;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--") continue;
    if (arg === "--help" || arg === "-h") return "help";
    if (arg === "--check") {
      check = true;
      continue;
    }
    if (arg === "--input") {
      input = requireValue(args, index, arg);
      index += 1;
      continue;
    }
    if (arg === "--json") {
      jsonOutput = requireValue(args, index, arg);
      index += 1;
      continue;
    }
    if (arg === "--markdown") {
      markdownOutput = requireValue(args, index, arg);
      index += 1;
      continue;
    }
    throw new Error(`unknown option: ${arg}`);
  }

  if (!input) throw new Error("--input is required");
  if (!jsonOutput && !markdownOutput) {
    throw new Error("at least one of --json or --markdown is required");
  }

  return { input, jsonOutput, markdownOutput, check };
}

interface OutputArtifact {
  label: "json" | "markdown";
  target: string;
  content: string;
}

function resolveArtifacts(options: VisualOpsCliOptions, input: GitHubPullRequestProjectionInput): OutputArtifact[] {
  const projection = projectGitHubPullRequest(input);
  const artifacts: OutputArtifact[] = [];
  if (options.jsonOutput) {
    artifacts.push({
      label: "json",
      target: path.resolve(options.jsonOutput),
      content: `${JSON.stringify(projection, null, 2)}\n`,
    });
  }
  if (options.markdownOutput) {
    artifacts.push({
      label: "markdown",
      target: path.resolve(options.markdownOutput),
      content: renderGitHubPullRequestProjectionMarkdown(projection),
    });
  }
  return artifacts;
}

function validatePaths(inputPath: string, artifacts: OutputArtifact[]): void {
  const targets = artifacts.map((artifact) => artifact.target);
  if (new Set(targets).size !== targets.length) {
    throw new Error("JSON and Markdown outputs must use different paths");
  }
  if (targets.includes(inputPath)) {
    throw new Error("an output path must not overwrite the input evidence file");
  }
  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    const stat = fs.lstatSync(target);
    if (!stat.isFile() || stat.isSymbolicLink()) {
      throw new Error(`output path must be a regular file or not exist: ${target}`);
    }
  }
}

function tempPath(target: string, suffix: string): string {
  return path.join(
    path.dirname(target),
    `.${path.basename(target)}.${process.pid}.${Date.now()}.${suffix}`,
  );
}

export function writeArtifactsAtomically(artifacts: OutputArtifact[]): void {
  const staged = artifacts.map((artifact) => ({
    ...artifact,
    temp: tempPath(artifact.target, "tmp"),
    backup: tempPath(artifact.target, "bak"),
    hadOriginal: fs.existsSync(artifact.target),
    installed: false,
  }));

  try {
    for (const artifact of staged) {
      fs.mkdirSync(path.dirname(artifact.target), { recursive: true });
      fs.writeFileSync(artifact.temp, artifact.content, { encoding: "utf8", flag: "wx" });
    }
    for (const artifact of staged) {
      if (artifact.hadOriginal) fs.renameSync(artifact.target, artifact.backup);
    }
    for (const artifact of staged) {
      fs.renameSync(artifact.temp, artifact.target);
      artifact.installed = true;
    }
  } catch (error) {
    for (const artifact of [...staged].reverse()) {
      if (artifact.installed && fs.existsSync(artifact.target)) fs.unlinkSync(artifact.target);
      if (artifact.hadOriginal && fs.existsSync(artifact.backup)) {
        fs.renameSync(artifact.backup, artifact.target);
      }
      if (fs.existsSync(artifact.temp)) fs.unlinkSync(artifact.temp);
    }
    throw error;
  }
  for (const artifact of staged) {
    if (!artifact.hadOriginal || !fs.existsSync(artifact.backup)) continue;
    try {
      fs.unlinkSync(artifact.backup);
    } catch {
      // Outputs are already committed. A retained backup is safer than destructive rollback.
    }
  }
}

function checkArtifacts(artifacts: OutputArtifact[]): string[] {
  return artifacts
    .filter(
      (artifact) =>
        !fs.existsSync(artifact.target) || fs.readFileSync(artifact.target, "utf8") !== artifact.content,
    )
    .map((artifact) => artifact.target);
}

function readInput(inputPath: string): GitHubPullRequestProjectionInput {
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`could not read input JSON: ${message}`);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("input JSON must contain an object");
  }
  return parsed as GitHubPullRequestProjectionInput;
}

export function runVisualOpsCli(
  args: string[],
  io: VisualOpsCliIo = {
    stdout: (message) => process.stdout.write(`${message}\n`),
    stderr: (message) => process.stderr.write(`${message}\n`),
  },
): number {
  try {
    const options = parseVisualOpsCliArgs(args);
    if (options === "help") {
      io.stdout(helpText);
      return 0;
    }

    const inputPath = path.resolve(options.input);
    const input = readInput(inputPath);
    const artifacts = resolveArtifacts(options, input);
    validatePaths(inputPath, artifacts);

    if (options.check) {
      const stale = checkArtifacts(artifacts);
      if (stale.length > 0) {
        io.stderr(`Visual Operations outputs are missing or stale:\n${stale.join("\n")}`);
        return VISUAL_OPS_CHECK_STALE_EXIT_CODE;
      }
      io.stdout(`Visual Operations outputs are current (${artifacts.length}).`);
      return 0;
    }

    writeArtifactsAtomically(artifacts);
    io.stdout(`Wrote ${artifacts.length} Visual Operations output(s).`);
    return 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    io.stderr(`visual-ops project failed: ${message}`);
    return 1;
  }
}

const isDirectExecution =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectExecution) process.exitCode = runVisualOpsCli(process.argv.slice(2));
