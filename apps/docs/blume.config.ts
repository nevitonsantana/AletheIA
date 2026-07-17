import { defineConfig } from "blume";

export default defineConfig({
  title: "AletheIA Docs",
  description: "Official documentation for AletheIA governance, contracts, guides, and reference material.",
  content: {
    sources: [{ type: "filesystem", root: "../../docs" }],
  },
  deployment: {
    site: "https://nevitonsantana.github.io",
    base: "/AletheIA",
  },
  navigation: {
    sidebar: {
      display: "page",
      items: [
        "/",
        {
          label: "Start here",
          items: [
            "/getting-started/overview",
            "/getting-started/installation-guide",
            "/guides/getting-started",
            "/guides/core-operating-path",
            "/getting-started/catalog",
            "/getting-started/faq",
          ],
        },
        {
          label: "Use AletheIA",
          items: [
            "/guides/apply-to-existing-project",
            "/guides/adoption-mode-guidance",
            "/guides/slice-finalization-and-restart",
            "/guides/project-handoff-conventions",
            "/guides/agent-runtime-decision-guide",
            "/guides/setting-up-harnesses",
            "/guides/install-via-apm",
          ],
        },
        {
          label: "Operating model",
          items: [
            "/concepts/overview",
            "/concepts/work-slice-pattern",
            "/concepts/governance",
            "/concepts/canonical-vocabulary",
            "/concepts/durable-decisions",
            "/concepts/agent-handoffs",
            "/concepts/enforcement-boundaries",
            "/concepts/quality",
          ],
        },
        {
          label: "Execution and capabilities",
          items: [
            "/concepts/execution-pattern-governance",
            "/concepts/execution-pattern-library",
            "/concepts/execution-vehicle-selection",
            "/concepts/agent-harness-contract",
            "/reference/agent-role-catalog",
            "/reference/runtime-adapter-codex",
            "/reference/runtime-adapter-claude-code",
            "/reference/runtime-adapter-qwen",
          ],
        },
        {
          label: "Adaptive Skills",
          items: [
            "/concepts/ecosystem-map",
            "/contracts/capability-routing-reconciliation",
            "/contracts/skill-catalog-governance-contract",
            "/contracts/skill-knowledge-dependency-contract",
            "/contracts/skill-evolution-validation-contract",
          ],
        },
        {
          label: "Security and trust",
          items: [
            "/security/README",
            "/concepts/domain-governance-packs",
            "/domain-governance-packs/ai-agent-security-prompt-injection",
            "/domain-governance-packs/web-app-security-trust-boundaries",
            "/reference/ai-agent-security-review-checklist",
            "/reference/web-app-security-review-checklist",
            "/concepts/tool-risk-taxonomy",
            "/security/human-review-criteria",
          ],
        },
        {
          label: "Observability",
          items: [
            "/concepts/visual-operations-layer",
            "/concepts/mission-control-cockpit",
            "/contracts/visual-operations-event-model",
            "/contracts/work-slice-visual-state-contract",
            "/contracts/observation-governance-contract",
            "/guides/github-pr-visual-operations-projector",
            "/guides/visual-operations-usage-evidence",
          ],
        },
        {
          label: "Cases and evidence",
          items: [
            "/pilots/README",
            "/pilots/pilot-crisis-monitor",
            "/pilots/migration-from-crisis-monitor",
            "/pilots/context-graph-decision",
            "/pilots/resource-aware-operations-review",
            "/pilots/visual-operations-adaptive-skills-dogfood",
          ],
        },
        {
          label: "Updates and evolution",
          items: [
            "/roadmaps/README",
            "/roadmaps/roadmap-alpha",
            "/roadmaps/enterprise-readiness-roadmap",
            "/roadmaps/resource-aware-operations-roadmap",
            "/roadmaps/evolution-plan",
            "/roadmaps/evolution-backlog-aletheia-adaptive-skills",
          ],
        },
        {
          label: "Maintainer reference",
          items: [
            "/adr/README",
            "/contracts/README",
            "/reference/README",
            "/concepts/architecture",
            "/contracts/system-state-registry",
            "/reference/public-doc-language-policy",
          ],
        },
      ],
    },
  },
});
