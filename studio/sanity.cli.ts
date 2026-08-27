import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  typegen: {
    enabled: true,
    // Only the web app's own source — never its node_modules.
    path: "../web/{app,components,lib,sanity}/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../web/sanity.types.ts",
    overloadClientMethods: true,
  },
});
