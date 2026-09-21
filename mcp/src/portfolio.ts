/**
 * Domain layer. Reads the portfolio repo from disk and answers questions about it.
 *
 * Deliberately knows NOTHING about MCP. Keeping the protocol wiring out of here
 * means this file stays unit-testable and reusable (a CLI, a script, a route
 * handler could all call it). server.ts is the only file that talks protocol.
 */
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { caseStudies, competencies, experience } from "../../lib/content.js";

/** Walk up from this module until we find the portfolio repo root. */
function findRepoRoot(): string {
  const override = process.env.PORTFOLIO_ROOT;
  if (override) return resolve(override);

  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 10; i++) {
    if (existsSync(join(dir, "lib", "content.ts")) && existsSync(join(dir, "app", "work"))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(
    "Could not locate the portfolio repo root. Set PORTFOLIO_ROOT to the repo directory."
  );
}

export const REPO_ROOT = findRepoRoot();
const WORK_DIR = join(REPO_ROOT, "app", "work");

const mdxPathFor = (slug: string) => join(WORK_DIR, slug, "page.mdx");

/** Slugs that have an actual MDX page on disk, whether or not they're registered. */
async function slugsOnDisk(): Promise<string[]> {
  const entries = await readdir(WORK_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && existsSync(mdxPathFor(e.name)))
    .map((e) => e.name)
    .sort();
}

// ---------------------------------------------------------------------------
// MDX parsing. All heuristic — these files are hand-authored MDX, not frontmatter.
// ---------------------------------------------------------------------------

/** Pull `title` / `description` out of `export const metadata = { ... }`. */
function extractMetadata(source: string): { title?: string; description?: string } {
  const start = source.indexOf("export const metadata");
  if (start === -1) return {};

  // Brace-match so a `}` inside a string value doesn't end the block early.
  const open = source.indexOf("{", start);
  if (open === -1) return {};
  let depth = 0;
  let end = open;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const block = source.slice(open, end + 1);
  const field = (name: string) =>
    block.match(new RegExp(`${name}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"))?.[1]?.replace(/\\"/g, '"');

  return { title: field("title"), description: field("description") };
}

/**
 * Reduce MDX to readable prose: drop imports, the metadata export, and
 * top-level JSX blocks, keeping headings and paragraphs.
 */
function stripToProse(source: string): string {
  // MDX comments {/* ... */} are authoring notes, not prose. Strip them up front
  // so multi-line comment blocks do not survive the line-by-line pass below.
  const lines = source.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").split("\n");
  const out: string[] = [];
  let skippingJsx = false;
  let skippingMeta = false;
  let metaDepth = 0;

  for (const line of lines) {
    if (skippingMeta) {
      metaDepth += (line.match(/\{/g)?.length ?? 0) - (line.match(/\}/g)?.length ?? 0);
      if (metaDepth <= 0) skippingMeta = false;
      continue;
    }
    if (skippingJsx) {
      // Top-level JSX in these files always closes at column 0.
      if (/^(\/>|<\/[A-Z][\w.]*>)/.test(line)) skippingJsx = false;
      continue;
    }
    if (/^import\s/.test(line)) continue;
    if (/^export const metadata/.test(line)) {
      skippingMeta = true;
      metaDepth = (line.match(/\{/g)?.length ?? 0) - (line.match(/\}/g)?.length ?? 0);
      if (metaDepth <= 0) skippingMeta = false;
      continue;
    }
    if (/^<[A-Z]/.test(line)) {
      // Self-closing or fully-closed on one line? Then it isn't a block.
      if (!/\/>\s*$/.test(line) && !/<\/[A-Z][\w.]*>\s*$/.test(line)) skippingJsx = true;
      continue;
    }
    out.push(line);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type CaseStudyListing = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  hasPage: boolean;
  registered: boolean;
};

export async function listCaseStudies(tag?: string): Promise<CaseStudyListing[]> {
  const onDisk = new Set(await slugsOnDisk());
  const listings: CaseStudyListing[] = caseStudies.map((cs) => ({
    ...cs,
    hasPage: onDisk.has(cs.slug),
    registered: true,
  }));

  // Pages that exist but aren't in the registry still belong in the list —
  // hiding them would make this tool lie about what's on the site.
  const registered = new Set(caseStudies.map((cs) => cs.slug));
  for (const slug of onDisk) {
    if (registered.has(slug)) continue;
    const meta = extractMetadata(await readFile(mdxPathFor(slug), "utf8"));
    listings.push({
      slug,
      title: meta.title ?? slug,
      summary: meta.description ?? "(not in lib/content.ts)",
      tags: [],
      hasPage: true,
      registered: false,
    });
  }

  if (!tag) return listings;
  const needle = tag.toLowerCase();
  return listings.filter((l) => l.tags.some((t) => t.toLowerCase() === needle));
}

export async function readCaseStudy(
  slug: string,
  format: "prose" | "source" = "prose"
): Promise<{ slug: string; title: string; description?: string; wordCount: number; body: string }> {
  const path = mdxPathFor(slug);
  if (!existsSync(path)) {
    const available = await slugsOnDisk();
    throw new Error(`No case study page for "${slug}". Available: ${available.join(", ")}`);
  }
  const source = await readFile(path, "utf8");
  const meta = extractMetadata(source);
  const body = format === "source" ? source : stripToProse(source);

  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description,
    wordCount: stripToProse(source).split(/\s+/).filter(Boolean).length,
    body,
  };
}

export type SearchHit = { file: string; line: number; text: string };

export async function searchPortfolio(query: string, limit = 20): Promise<SearchHit[]> {
  const needle = query.toLowerCase();
  const files = [
    ...(await slugsOnDisk()).map((s) => ({ rel: `app/work/${s}/page.mdx`, abs: mdxPathFor(s) })),
    { rel: "lib/content.ts", abs: join(REPO_ROOT, "lib", "content.ts") },
  ];

  const hits: SearchHit[] = [];
  for (const { rel, abs } of files) {
    const lines = (await readFile(abs, "utf8")).split("\n");
    for (const [i, line] of lines.entries()) {
      if (!line.toLowerCase().includes(needle)) continue;
      hits.push({ file: rel, line: i + 1, text: line.trim().slice(0, 300) });
      if (hits.length >= limit) return hits;
    }
  }
  return hits;
}

export function getProfile() {
  return { experience, competencies };
}

export type AuditFinding = {
  severity: "error" | "warning";
  file: string;
  issue: string;
};

/**
 * The one tool here that isn't a thin read. It answers a question a person
 * actually has ("is my content consistent?") instead of exposing a data store.
 */
export async function auditContent(): Promise<AuditFinding[]> {
  const findings: AuditFinding[] = [];
  const onDisk = new Set(await slugsOnDisk());
  const registered = new Set(caseStudies.map((cs) => cs.slug));

  for (const cs of caseStudies) {
    if (!onDisk.has(cs.slug)) {
      findings.push({
        severity: "error",
        file: "lib/content.ts",
        issue: `"${cs.slug}" is listed in caseStudies but app/work/${cs.slug}/page.mdx does not exist — the card links to a 404.`,
      });
    }
  }

  for (const slug of onDisk) {
    const rel = `app/work/${slug}/page.mdx`;
    if (!registered.has(slug)) {
      findings.push({
        severity: "warning",
        file: rel,
        issue: `Page exists but "${slug}" is missing from caseStudies in lib/content.ts — it is unreachable from the work index.`,
      });
    }

    const source = await readFile(mdxPathFor(slug), "utf8");
    const meta = extractMetadata(source);
    if (!meta.title) {
      findings.push({ severity: "warning", file: rel, issue: "Missing metadata.title." });
    }
    if (!meta.description) {
      findings.push({
        severity: "warning",
        file: rel,
        issue: "Missing metadata.description — hurts SEO and link previews.",
      });
    }

    for (const [, src] of source.matchAll(/src="(\/[^"]+)"/g)) {
      if (!existsSync(join(REPO_ROOT, "public", src!))) {
        findings.push({
          severity: "error",
          file: rel,
          issue: `References ${src} but public${src} does not exist — broken image.`,
        });
      }
    }

    for (const [block] of source.matchAll(/<Figure\b[\s\S]*?\/>/g)) {
      if (!/\balt=/.test(block)) {
        findings.push({
          severity: "error",
          file: rel,
          issue: `A <Figure> has no alt text: ${block.slice(0, 80).replace(/\s+/g, " ")}…`,
        });
      }
    }
  }

  return findings;
}
