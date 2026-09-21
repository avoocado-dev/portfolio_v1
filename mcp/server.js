#!/usr/bin/env node
/**
 * Stable entry point.
 *
 * tsc roots its output at the repo root (it has to, so it can also compile the
 * shared lib/content.ts), which buries the real entry at dist/mcp/src/server.js.
 * This shim keeps that detail out of every client config.
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const entry = join(dirname(fileURLToPath(import.meta.url)), "dist/mcp/src/server.js");
if (!existsSync(entry)) {
  console.error("[portfolio-mcp] Not built yet. Run: npm --prefix mcp run build");
  process.exit(1);
}
await import(entry);
