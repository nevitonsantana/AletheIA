import fs from "node:fs";
import { prepareAdvisoryDraft, recordAdvisoryReview } from "../engine/experiments/local-routing-advisory-draft.js";

const args = process.argv.slice(2);
const fullEvidence = args[0] === "--full-evidence";
const [declarationPath, reviewPath, ...extra] = fullEvidence ? args.slice(1) : args;
if (!declarationPath || declarationPath.startsWith("--") || extra.length > 0 || (fullEvidence && !reviewPath)) {
  console.error("Usage: pnpm routing:advisory [--full-evidence] <local-declaration.json> [local-review.json]");
  process.exitCode = 2;
} else {
  try {
    const declaration: unknown = JSON.parse(fs.readFileSync(declarationPath, "utf8"));
    const reviewed = reviewPath
      ? recordAdvisoryReview(declaration, JSON.parse(fs.readFileSync(reviewPath, "utf8")) as unknown)
      : null;
    if (fullEvidence && reviewed) {
      console.error("Confidentiality warning: full reviewed evidence follows on stdout; inspect before sharing.");
      console.log(JSON.stringify(reviewed, null, 2));
      process.exit(0);
    }
    const draft = reviewed?.review_time_draft ?? prepareAdvisoryDraft(declaration);
    console.log(JSON.stringify({
      local_advisory_only: true,
      no_execution: true,
      task_reference: draft.declaration.task_reference,
      freshness_status: draft.freshness.status,
      outcome: draft.recommendation.outcome,
      selected_route_id: draft.recommendation.selected_route_id,
      alternative_route_ids: draft.recommendation.alternative_route_ids,
      rejected_routes: draft.recommendation.rejected_routes,
      human_disposition: reviewed?.review.disposition ?? "pending",
      evidence_retention: "Keep declaration, result and review in an existing governed record; this command writes nothing.",
    }, null, 2));
  } catch {
    // JSON parse and validation errors can contain fragments of private local input.
    console.error("Advisory input rejected; inspect the local JSON and declared references.");
    process.exitCode = 1;
  }
}
