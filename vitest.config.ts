import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["engine/**/*.ts"],
      reporter: ["text", "json-summary"],
      // No threshold yet — baseline measured after first run (see issue #124).
    },
  },
});
