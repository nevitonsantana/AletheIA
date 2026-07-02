import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("S28 AI Agent Security & Prompt Injection pack", () => {
  it("defines the minimum domain governance boundary without runtime claims", () => {
    const pack = read("docs/domain-governance-packs/ai-agent-security-prompt-injection.md");

    expect(pack).toContain("External, retrieved, monitored or tool-returned content enters as data, evidence or context");
    expect(pack).toContain("does not become an instruction unless a trusted authority explicitly reclassifies it");
    expect(pack).toContain("instruction trust hierarchy");
    expect(pack).toContain("Tool least privilege");
    expect(pack).toContain("Retrieval and memory safety");
    expect(pack).toContain("does not");
    expect(pack).toContain("implement technical enforcement");
    expect(pack).toContain("claim that AletheIA can perfectly detect every injection");
  });

  it("ships a reusable checklist and starter template", () => {
    const checklist = read("docs/reference/ai-agent-security-review-checklist.md");
    const template = read("starter-pack/templates/ai-agent-security-review-template.yaml");

    expect(checklist).toContain("Source classification");
    expect(checklist).toContain("Prompt-injection signals");
    expect(checklist).toContain("Tool boundary");
    expect(checklist).toContain("require_human_review");
    expect(template).toContain("agent_security_review:");
    expect(template).toContain("content_trust: unavailable");
    expect(template).toContain("runtime_enforcement_added: false");
    expect(template).toContain("perfect_defense_claimed: false");
  });

  it("includes an adversarial example that blocks untrusted tool coercion", () => {
    const example = read("examples/agent-security/prompt-injection-review.yaml");

    expect(example).toContain("source_category: retrieved_content");
    expect(example).toContain("instruction_authority: none");
    expect(example).toContain("prompt_injection_attempt");
    expect(example).toContain("allowed_by_envelope: false");
    expect(example).toContain("posture: block");
    expect(example).toContain("runtime_enforcement_added: false");
  });

  it("is indexed and reflected in current planning surfaces", () => {
    const docsIndex = read("docs/index.md");
    const examplesIndex = read("examples/README.md");
    const starterIndex = read("starter-pack/README.md");
    const backlog = read("docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md");
    const systemState = read("SYSTEM_STATE.md");

    expect(docsIndex).toContain("domain-governance-packs/ai-agent-security-prompt-injection.md");
    expect(examplesIndex).toContain("agent-security/");
    expect(starterIndex).toContain("ai-agent-security-review-template.yaml");
    expect(backlog).toContain("### S28 — AI Agent Security & Prompt Injection domain-pack minimum");
    expect(backlog).toContain("delivered` by AletheIA PR #316");
    expect(systemState).toContain("S28 AI Agent Security is delivered");
  });
});
