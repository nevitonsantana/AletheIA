import { defineConfig } from "blume";

export default defineConfig({
  title: "AletheIA Docs",
  description: "Official documentation for AletheIA governance, contracts, guides, and reference material.",
  content: {
    sources: [{ type: "filesystem", root: "../../docs" }],
  },
});
