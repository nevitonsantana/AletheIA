import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("S29 Web App Security & Trust Boundaries pack", () => {
  it("defines reusable web/API trust boundaries without executable enforcement", () => {
    const pack = read("docs/domain-governance-packs/web-app-security-trust-boundaries.md");

    expect(pack).toContain("Public surfaces may request and display");
    expect(pack).toContain("authoritative layers decide, verify, isolate and commit");
    expect(pack).toContain("Client/server separation");
    expect(pack).toContain("Tenant-scoped retrieval and model context");
    expect(pack).toContain("Inbound integrations");
    expect(pack).toContain("does not");
    expect(pack).toContain("create scanners or enforcement engines");
    expect(pack).toContain("claim AletheIA technically enforces web security");
  });

  it("ships a checklist and template with unavailable-first posture", () => {
    const checklist = read("docs/reference/web-app-security-review-checklist.md");
    const template = read("starter-pack/templates/web-app-security-review-template.yaml");

    expect(checklist).toContain("Client/server authority");
    expect(checklist).toContain("Secrets and config");
    expect(checklist).toContain("Model/agent context scoping");
    expect(checklist).toContain("require_human_review");
    expect(template).toContain("web_app_security_review:");
    expect(template).toContain("authoritative_layer_ref: unavailable");
    expect(template).toContain("runtime_enforcement_added: false");
    expect(template).toContain("framework_core_expanded: false");
  });

  it("includes an evaluation example that blocks client-owned critical logic", () => {
    const example = read("examples/web-app-security/trust-boundary-review.yaml");

    expect(example).toContain("client_owned_critical_logic");
    expect(example).toContain("cross_tenant_context");
    expect(example).toContain("posture: block");
    expect(example).toContain("authoritative server/API layer");
    expect(example).toContain("vendor_tutorial_added: false");
  });

  it("is indexed and reflected in planning surfaces", () => {
    const docsIndex = read("docs/index.md");
    const examplesIndex = read("examples/README.md");
    const starterIndex = read("starter-pack/README.md");
    const backlog = read("docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md");
    const systemState = read("SYSTEM_STATE.md");

    expect(docsIndex).toContain("domain-governance-packs/web-app-security-trust-boundaries.md");
    expect(examplesIndex).toContain("web-app-security/");
    expect(starterIndex).toContain("web-app-security-review-template.yaml");
    expect(backlog).toContain("### S29 — Web App Security & Trust Boundaries domain-pack minimum");
    expect(backlog).toContain("delivered` by AletheIA PR #318");
    expect(systemState).toContain("S29 Web App Security is delivered");
    expect(systemState).toContain("S30 Enterprise / constrained adoption evidence loop");
  });
});
