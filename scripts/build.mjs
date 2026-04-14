import { build } from "esbuild";
import { mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");

async function run() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  await build({
    entryPoints: {
      "background/service-worker": "src/background/service-worker.ts",
      "content/main": "src/content/main.ts",
      "popup/popup": "src/popup/popup.ts",
      "options/options": "src/options/options.ts"
    },
    outdir: dist,
    bundle: true,
    format: "iife",
    target: ["chrome110"],
    sourcemap: false,
    minify: false,
    logLevel: "info"
  });

  console.log("Build complete. Load project root in chrome://extensions");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
