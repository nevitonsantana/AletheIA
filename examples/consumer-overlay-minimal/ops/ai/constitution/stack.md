# Stack

- **Language.** TypeScript (Node 20).
- **Runtime.** AWS Lambda for ingestion; ECS Fargate for the dashboard API; React/Vite for the dashboard UI.
- **Datastore.** Postgres 15 (RDS) for event/incident records; Redis (ElastiCache) for the dedup window.
- **Messaging.** SQS for ingestion fan-out; SNS for alert egress.
- **Build.** pnpm + Turborepo monorepo. Vitest for tests. ESLint + Prettier.
- **Deploy.** Terraform-managed infra; GitHub Actions for CI; Argo CD for cluster apps.
- **Observability.** Datadog APM + logs; PagerDuty for alerts.
