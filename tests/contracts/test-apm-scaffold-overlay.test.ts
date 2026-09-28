import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const root = process.cwd();
const temporaryDirectories: string[] = [];

function createConsumer(): { consumer: string; script: string; pack: string } {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "aletheia-apm-scaffold-test-"));
  temporaryDirectories.push(temporaryRoot);
  const consumer = path.join(temporaryRoot, "consumer");
  const pack = path.join(temporaryRoot, "apm_modules", "nevitonsantana", "aletheia", "packs", "operating-overlay");
  fs.mkdirSync(consumer, { recursive: true });
  fs.mkdirSync(path.dirname(pack), { recursive: true });
  fs.cpSync(path.join(root, "packs/operating-overlay"), pack, { recursive: true });
  return { consumer, pack, script: path.join(pack, "scripts/scaffold-overlay.sh") };
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});

describe("APM operating-overlay scaffold", () => {
  it("merges identical APM-installed files and materializes the root scaffold without --force", () => {
    const { consumer, pack, script } = createConsumer();
    for (const relativePath of [".claude/settings.json", ".claude/rules/ops-ai.md", ".claude/rules/src.md", ".claude/rules/tests.md"]) {
      const installedTarget = path.join(consumer, relativePath);
      fs.mkdirSync(path.dirname(installedTarget), { recursive: true });
      fs.copyFileSync(path.join(pack, relativePath), installedTarget);
    }
    const additionalApmRule = path.join(consumer, ".claude/rules/aletheia-package.md");
    fs.writeFileSync(additionalApmRule, "APM-integrated package rule\n");

    execFileSync("bash", [script], { cwd: consumer, encoding: "utf8" });

    for (const relativePath of ["AGENTS.md", "CLAUDE.md", ".claude/settings.json", ".claude/rules/src.md", "ops/ai/constitution/README.md", "ops/ai/handoffs/README.md"]) {
      expect(fs.existsSync(path.join(consumer, relativePath)), relativePath).toBe(true);
    }
    expect(fs.readFileSync(additionalApmRule, "utf8")).toBe("APM-integrated package rule\n");
  });

  it("still refuses to replace differing existing overlay content without --force", () => {
    const { consumer, script } = createConsumer();
    const agents = path.join(consumer, "AGENTS.md");
    fs.writeFileSync(agents, "consumer-owned instructions\n");

    const result = spawnSync("bash", [script], { cwd: consumer, encoding: "utf8" });

    expect(result.status).toBe(4);
    expect(result.stderr).toContain("AGENTS.md");
    expect(fs.readFileSync(agents, "utf8")).toBe("consumer-owned instructions\n");
  });
});
