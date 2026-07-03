import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const capturePath = path.join(root, "examples/domain-governance-usage/s35-domain-governance-usage-evidence-capture.json");
const templatePath = path.join(root, "starter-pack/templates/domain-governance-usage-evidence-template.yaml");

interface S35Capture {
  review_id: string;
  source_refs: Record<string, string>;
  capture_contract: {
    required_minimum: string[];
    real_usage_requirement: string;
  };
  template_status: {
    is_real_usage_evidence: boolean;
    success_rate_claim: string;
  };
  guardrails: Record<string, boolean>;
}

const readCapture = (): S35Capture => JSON.parse(fs.readFileSync(capturePath, "utf8")) as S35Capture;

describe("S35 domain governance usage evidence capture", () => {
  it("defines a future capture contract without counting as real usage", () => {
    const capture = readCapture();

    expect(capture.review_id).toBe("s35-domain-governance-usage-evidence-capture-2026-07-03");
    expect(capture.capture_contract.required_minimum).toEqual(
      expect.arrayContaining(["work_slice_ref", "pack_refs", "source_refs", "applicability.evidence_source"]),
    );
    expect(capture.capture_contract.real_usage_requirement).toContain("real_work_slice");
    expect(capture.template_status.is_real_usage_evidence).toBe(false);
    expect(capture.template_status.success_rate_claim).toBe("unavailable");
  });

  it("keeps expansion and metric guardrails off", () => {
    const capture = readCapture();

    expect(capture.guardrails).toMatchObject({
      created_new_domain_pack: false,
      created_scanner: false,
      created_policy_engine: false,
      created_runtime_enforcement: false,
      created_dashboard: false,
      created_schema: false,
      changed_adaptive_skills: false,
      activated_s18: false,
      claimed_real_usage: false,
      claimed_success_rate: false,
    });
  });

  it("resolves source refs and indexes the capture template", () => {
    const capture = readCapture();

    for (const ref of Object.values(capture.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const template = fs.readFileSync(templatePath, "utf8");
    const examplesIndex = fs.readFileSync(path.join(root, "examples/README.md"), "utf8");
    const reviewIndex = fs.readFileSync(path.join(root, "examples/domain-governance-usage/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(template).toContain("domain_governance_usage_evidence:");
    expect(template).toContain("evidence_source: unavailable");
    expect(examplesIndex).toContain("captura S35");
    expect(reviewIndex).toContain("s35-domain-governance-usage-evidence-capture.json");
    expect(backlog).toContain("### S35 — Domain Governance Usage Evidence Capture");
    expect(backlog).toContain("delivered` by AletheIA PR #331");
    expect(systemState).toContain("S35 Domain Governance Usage Evidence Capture");
  });
});
