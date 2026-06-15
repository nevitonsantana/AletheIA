import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  VISUAL_OPS_CHECK_STALE_EXIT_CODE,
  parseVisualOpsCliArgs,
  runVisualOpsCli,
  writeArtifactsAtomically,
} from "../../scripts/visual-ops-project";

const tempDirs: string[] = [];

function tempDir(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "aletheia-visual-ops-cli-"));
  tempDirs.push(directory);
  return directory;
}

function copyInput(directory: string): string {
  const target = path.join(directory, "evidence.json");
  fs.copyFileSync(
    path.resolve(process.cwd(), "examples/visual-operations/github-pr-projector-input.json"),
    target,
  );
  return target;
}

function captureIo(): { stdout: string[]; stderr: string[]; io: { stdout: (value: string) => void; stderr: (value: string) => void } } {
  const stdout: string[] = [];
  const stderr: string[] = [];
  return {
    stdout,
    stderr,
    io: {
      stdout: (value) => stdout.push(value),
      stderr: (value) => stderr.push(value),
    },
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  for (const directory of tempDirs.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});

describe("Visual Operations local CLI", () => {
  it("parses explicit local input and output options", () => {
    expect(
      parseVisualOpsCliArgs([
        "--",
        "--input",
        "evidence.json",
        "--json",
        "snapshot.json",
        "--markdown",
        "dashboard.md",
        "--check",
      ]),
    ).toEqual({
      input: "evidence.json",
      jsonOutput: "snapshot.json",
      markdownOutput: "dashboard.md",
      check: true,
    });
  });

  it("writes deterministic JSON and Markdown outputs", () => {
    const directory = tempDir();
    const input = copyInput(directory);
    const json = path.join(directory, "snapshot.json");
    const markdown = path.join(directory, "dashboard.md");
    const capture = captureIo();

    expect(
      runVisualOpsCli(
        ["--input", input, "--json", json, "--markdown", markdown],
        capture.io,
      ),
    ).toBe(0);
    expect(JSON.parse(fs.readFileSync(json, "utf8"))).toMatchObject({
      projection: { mode: "read_only", projector: "github_pull_request" },
      work_slice_visual_state: { work_slice_id: "github-pr-193" },
    });
    expect(fs.readFileSync(markdown, "utf8")).toContain(
      "# Visual Operations Snapshot — github-pr-193",
    );
    expect(capture.stdout).toEqual(["Wrote 2 Visual Operations output(s)."]);
  });

  it("checks current outputs without writing", () => {
    const directory = tempDir();
    const input = copyInput(directory);
    const json = path.join(directory, "snapshot.json");
    const markdown = path.join(directory, "dashboard.md");
    const args = ["--input", input, "--json", json, "--markdown", markdown];

    expect(runVisualOpsCli(args, captureIo().io)).toBe(0);
    const before = fs.statSync(json).mtimeMs;
    const capture = captureIo();
    expect(runVisualOpsCli([...args, "--check"], capture.io)).toBe(0);
    expect(fs.statSync(json).mtimeMs).toBe(before);
    expect(capture.stdout).toEqual(["Visual Operations outputs are current (2)."]);
  });

  it("returns exit code 2 when an output is stale", () => {
    const directory = tempDir();
    const input = copyInput(directory);
    const json = path.join(directory, "snapshot.json");
    fs.writeFileSync(json, "{}\n");
    const capture = captureIo();

    expect(
      runVisualOpsCli(["--input", input, "--json", json, "--check"], capture.io),
    ).toBe(VISUAL_OPS_CHECK_STALE_EXIT_CODE);
    expect(capture.stderr[0]).toContain("missing or stale");
    expect(fs.readFileSync(json, "utf8")).toBe("{}\n");
  });

  it("refuses to overwrite its input evidence", () => {
    const directory = tempDir();
    const input = copyInput(directory);
    const original = fs.readFileSync(input, "utf8");
    const capture = captureIo();

    expect(runVisualOpsCli(["--input", input, "--json", input], capture.io)).toBe(1);
    expect(capture.stderr[0]).toContain("must not overwrite the input");
    expect(fs.readFileSync(input, "utf8")).toBe(original);
  });

  it("refuses non-file and symbolic-link output targets", () => {
    const directory = tempDir();
    const input = copyInput(directory);
    const outputDirectory = path.join(directory, "snapshot.json");
    fs.mkdirSync(outputDirectory);
    const captureDirectory = captureIo();

    expect(
      runVisualOpsCli(["--input", input, "--json", outputDirectory], captureDirectory.io),
    ).toBe(1);
    expect(captureDirectory.stderr[0]).toContain("must be a regular file or not exist");

    const linkedOutput = path.join(directory, "linked-output.json");
    fs.symlinkSync(input, linkedOutput);
    const captureLink = captureIo();
    expect(runVisualOpsCli(["--input", input, "--json", linkedOutput], captureLink.io)).toBe(1);
    expect(captureLink.stderr[0]).toContain("must be a regular file or not exist");
  });

  it("restores all previous outputs when installation fails", () => {
    const directory = tempDir();
    const json = path.join(directory, "snapshot.json");
    const markdown = path.join(directory, "dashboard.md");
    fs.writeFileSync(json, "old-json");
    fs.writeFileSync(markdown, "old-markdown");
    const rename = fs.renameSync.bind(fs);
    let calls = 0;
    vi.spyOn(fs, "renameSync").mockImplementation((oldPath, newPath) => {
      calls += 1;
      if (calls === 4) throw new Error("synthetic install failure");
      return rename(oldPath, newPath);
    });

    expect(() =>
      writeArtifactsAtomically([
        { label: "json", target: json, content: "new-json" },
        { label: "markdown", target: markdown, content: "new-markdown" },
      ]),
    ).toThrow("synthetic install failure");
    expect(fs.readFileSync(json, "utf8")).toBe("old-json");
    expect(fs.readFileSync(markdown, "utf8")).toBe("old-markdown");
    expect(fs.readdirSync(directory).sort()).toEqual(["dashboard.md", "snapshot.json"]);
  });

  it("reports malformed JSON without creating an output", () => {
    const directory = tempDir();
    const input = path.join(directory, "evidence.json");
    const output = path.join(directory, "snapshot.json");
    fs.writeFileSync(input, "{broken");
    const capture = captureIo();

    expect(runVisualOpsCli(["--input", input, "--json", output], capture.io)).toBe(1);
    expect(capture.stderr[0]).toContain("could not read input JSON");
    expect(fs.existsSync(output)).toBe(false);
  });
});
