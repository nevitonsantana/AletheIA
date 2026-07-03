import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("S30 constrained adoption evidence loop", () => {
  it("provides a structured evidence-loop template without enterprise enforcement", () => {
    const template = read("starter-pack/templates/constrained-adoption-evidence-loop-template.yaml");

    expect(template).toContain("constrained_adoption_evidence_loop:");
    expect(template).toContain("task_brief: unavailable");
    expect(template).toContain("risk_to_gate_mapping: unavailable");
    expect(template).toContain("durable_decisions:");
    expect(template).toContain("non_reusable_local_residue");
    expect(template).toContain("enterprise_product_packaging_added: false");
    expect(template).toContain("universal_compliance_preset_added: false");
    expect(template).toContain("cli_or_bootstrap_promise_added: false");
    expect(template).toContain("org_specific_policy_hardcoded: false");
    expect(template).toContain("framework_core_expanded: false");
  });

  it("ships a bounded example with local residue separated from framework learning", () => {
    const example = read("examples/pilot-conversion/s30-constrained-adoption-evidence-loop.yaml");

    expect(example).toContain("Local approval mapping for a restricted web change");
    expect(example).toContain("task brief, gates, handoff, validation and durable decisions");
    expect(example).toContain("No enterprise rollout, no compliance certification");
    expect(example).toContain("local approval matrix");
    expect(example).toContain("provider allowlist");
    expect(example).toContain("candidate_framework_learning");
    expect(example).toContain("Real acceptance and retrabalho remain unavailable");
    expect(example).toContain("Work units and value score are intentionally unavailable");
  });

  it("connects S30 through guide, starter pack, examples and backlog", () => {
    const guide = read("docs/guides/constrained-adoption-pilot.md");
    const starter = read("starter-pack/README.md");
    const examples = read("examples/README.md");
    const backlog = read("docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md");
    const systemState = read("SYSTEM_STATE.md");

    expect(guide).toContain("constrained-adoption-evidence-loop-template.yaml");
    expect(starter).toContain("starter-pack/templates/constrained-adoption-evidence-loop-template.yaml");
    expect(starter).toContain("examples/pilot-conversion/s30-constrained-adoption-evidence-loop.yaml");
    expect(examples).toContain("loop sintético S30");
    expect(backlog).toContain("### S30 — Enterprise / constrained adoption evidence loop");
    expect(backlog).toContain("delivered` by AletheIA PR #320");
    expect(systemState).toContain("S30 Enterprise / constrained adoption evidence loop is delivered");
    expect(systemState).toContain("S31 Resource-aware next-signals review");
  });
});
