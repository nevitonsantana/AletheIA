import pr201ProjectionJson from "../../../../examples/visual-operations/github-pr-201-dogfood-output.json";
import pr207ProjectionJson from "../../../../examples/visual-operations/github-pr-207-dogfood-output.json";
import type { GitHubPullRequestProjection } from "../../../../engine/visual-operations-projector";
import { adaptGitHubPullRequestProjection } from "./githubPullRequestProjectionAdapter";

const sourceProjections = [
  pr207ProjectionJson as GitHubPullRequestProjection,
  pr201ProjectionJson as GitHubPullRequestProjection,
];

export const projectionEvidenceRecords = sourceProjections.map(adaptGitHubPullRequestProjection);
