#!/usr/bin/env node
/**
 * Portfolio MCP server.
 *
 * ── The whole shape of an MCP server ────────────────────────────────────────
 *  1. Create an McpServer (name + version — this is what shows up in clients).
 *  2. Register capabilities: TOOLS (model-invoked), RESOURCES (user/app-attached),
 *     PROMPTS (user-invoked templates).
 *  3. Connect it to a transport. stdio = the client spawns this process and
 *     speaks JSON-RPC 2.0 over stdin/stdout.
 *
 * ── The rule that bites everyone once ───────────────────────────────────────
 *  On stdio, stdout IS the protocol channel. A stray console.log() injects
 *  garbage into the JSON-RPC stream and the client drops the connection with a
 *  parse error. Log to stderr (console.error) or not at all.
 */
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  auditContent,
  getProfile,
  listCaseStudies,
  readCaseStudy,
  REPO_ROOT,
  searchPortfolio,
} from "./portfolio.js";

const server = new McpServer({
  name: "portfolio",
  version: "0.1.0",
});

/** Every tool result is a content array. Text is the one every client renders. */
const text = (body: string) => ({ content: [{ type: "text" as const, text: body }] });

/**
 * Tool errors are RESULTS, not exceptions. Setting isError lets the model see
 * what went wrong and retry with better arguments; throwing turns it into a
 * protocol-level failure the model can't reason about.
 */
const failure = (message: string) => ({
  content: [{ type: "text" as const, text: `Error: ${message}` }],
  isError: true,
});

// ---------------------------------------------------------------------------
// TOOLS — the model decides when to call these.
//
// The description and the schema ARE the prompt. This is the highest-leverage
// text in the whole server: a vague description means the model never reaches
// for the tool, or reaches for the wrong one.
// ---------------------------------------------------------------------------

server.registerTool(
  "list_case_studies",
  {
    title: "List case studies",
    description:
      "List every case study on the portfolio with its title, one-line summary, and tags. " +
      "Also reports whether each entry has a published page. Start here when you need to " +
      "know what work exists before reading any of it.",
    inputSchema: {
      tag: z
        .string()
        .optional()
        .describe('Filter to one tag, e.g. "Accessibility" or "UX Strategy". Omit for all.'),
    },
    // outputSchema is optional. When present, you must also return
    // structuredContent — clients that support it get typed JSON instead of
    // re-parsing your prose.
    outputSchema: {
      caseStudies: z.array(
        z.object({
          slug: z.string(),
          title: z.string(),
          summary: z.string(),
          tags: z.array(z.string()),
          hasPage: z.boolean(),
          registered: z.boolean(),
        })
      ),
    },
    // Annotations are hints to the CLIENT, not the model. readOnlyHint lets a
    // host auto-approve the call instead of prompting the user.
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ tag }) => {
    const studies = await listCaseStudies(tag);
    if (studies.length === 0) {
      return text(tag ? `No case studies tagged "${tag}".` : "No case studies found.");
    }

    const lines = studies.map((s) => {
      const flags = [
        s.hasPage ? null : "NO PAGE",
        s.registered ? null : "UNREGISTERED",
      ].filter(Boolean);
      const suffix = flags.length ? `  [${flags.join(", ")}]` : "";
      return `- ${s.slug} — ${s.title}: ${s.summary}${
        s.tags.length ? ` (${s.tags.join(", ")})` : ""
      }${suffix}`;
    });

    return {
      ...text(lines.join("\n")),
      structuredContent: { caseStudies: studies },
    };
  }
);

server.registerTool(
  "read_case_study",
  {
    title: "Read a case study",
    description:
      "Read the full text of one case study by slug. Use format='prose' (default) for the " +
      "written narrative with JSX components stripped out — this is what you want for " +
      "summarizing, quoting, or critiquing. Use format='source' only when you need the raw " +
      "MDX including components and image references.",
    inputSchema: {
      slug: z.string().describe('Case study slug, e.g. "pay-equity-analysis". Get these from list_case_studies.'),
      format: z
        .enum(["prose", "source"])
        .default("prose")
        .describe("prose = readable narrative only; source = raw MDX."),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ slug, format }) => {
    try {
      const study = await readCaseStudy(slug, format);
      const header = [
        `# ${study.title}`,
        study.description ? `\n${study.description}` : "",
        `\n(${study.wordCount} words of prose)\n`,
      ].join("");
      return text(`${header}\n${study.body}`);
    } catch (error) {
      return failure(error instanceof Error ? error.message : String(error));
    }
  }
);

server.registerTool(
  "search_portfolio",
  {
    title: "Search portfolio content",
    description:
      "Case-insensitive text search across all case study pages and the site content " +
      "registry. Returns matching lines with file and line number. Use this to find where " +
      "a topic, product name, metric, or claim is discussed before reading a whole page.",
    inputSchema: {
      query: z.string().min(2).describe("Text to search for."),
      limit: z.number().int().min(1).max(100).default(20).describe("Max matches to return."),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ query, limit }) => {
    const hits = await searchPortfolio(query, limit);
    if (hits.length === 0) return text(`No matches for "${query}".`);
    const body = hits.map((h) => `${h.file}:${h.line}  ${h.text}`).join("\n");
    return text(`${hits.length} match(es) for "${query}":\n\n${body}`);
  }
);

server.registerTool(
  "get_profile",
  {
    title: "Get professional profile",
    description:
      "Get the portfolio owner's work history (company, title, timeframe, summary) and " +
      "skill competencies grouped by area. Use this for questions about background, " +
      "experience, or capabilities rather than about a specific project.",
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () => {
    const { experience, competencies } = getProfile();
    const roles = experience
      .map((r) => `- ${r.title}, ${r.company} (${r.timeframe})\n  ${r.summary}`)
      .join("\n");
    const skills = competencies.map((c) => `- ${c.label}: ${c.items.join(", ")}`).join("\n");
    return text(`## Experience\n${roles}\n\n## Competencies\n${skills}`);
  }
);

server.registerTool(
  "audit_content",
  {
    title: "Audit portfolio content",
    description:
      "Check the portfolio for content problems: case studies registered without a page (or " +
      "vice versa), missing page metadata, images referenced but absent from public/, and " +
      "figures missing alt text. Run this before shipping content changes.",
    inputSchema: {
      severity: z
        .enum(["all", "error"])
        .default("all")
        .describe("'error' returns only issues that break the live site."),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ severity }) => {
    const all = await auditContent();
    const findings = severity === "error" ? all.filter((f) => f.severity === "error") : all;
    if (findings.length === 0) return text("No issues found. Content is consistent.");

    const body = findings
      .map((f) => `[${f.severity.toUpperCase()}] ${f.file}\n  ${f.issue}`)
      .join("\n\n");
    const errors = findings.filter((f) => f.severity === "error").length;
    return text(
      `${findings.length} finding(s), ${errors} of them site-breaking:\n\n${body}`
    );
  }
);

// ---------------------------------------------------------------------------
// RESOURCES — addressable, side-effect-free content the USER or HOST attaches.
//
// Not the same as a tool that reads a file: a resource is something a person
// picks from a list ("@-mention this case study"), like an attachment.
// ---------------------------------------------------------------------------

server.registerResource(
  "case-study",
  new ResourceTemplate("portfolio://case-study/{slug}", {
    // The list callback is what makes these show up in a client's picker.
    list: async () => {
      const studies = await listCaseStudies();
      return {
        resources: studies
          .filter((s) => s.hasPage)
          .map((s) => ({
            uri: `portfolio://case-study/${s.slug}`,
            name: s.title,
            description: s.summary,
            mimeType: "text/markdown",
          })),
      };
    },
    // Powers tab-completion of {slug} in clients that support it.
    complete: {
      slug: async (value) => {
        const studies = await listCaseStudies();
        return studies
          .filter((s) => s.hasPage && s.slug.startsWith(value))
          .map((s) => s.slug);
      },
    },
  }),
  {
    title: "Case study",
    description: "The prose of one case study, addressable by slug.",
    mimeType: "text/markdown",
  },
  async (uri, { slug }) => {
    const study = await readCaseStudy(String(slug), "prose");
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: `# ${study.title}\n\n${study.body}`,
        },
      ],
    };
  }
);

// ---------------------------------------------------------------------------
// PROMPTS — user-invoked templates. In Claude Code these surface as slash
// commands. The server does the assembly; the user just picks it.
// ---------------------------------------------------------------------------

server.registerPrompt(
  "critique_case_study",
  {
    title: "Critique a case study",
    description: "Load one case study and review it as a hiring manager would.",
    argsSchema: {
      slug: z.string().describe('Case study slug, e.g. "global-pay-reports".'),
    },
  },
  async ({ slug }) => {
    const study = await readCaseStudy(slug, "prose");
    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text:
              `Review this portfolio case study the way a hiring manager for a senior ` +
              `UX engineering role would. Be specific and direct. Call out: where the ` +
              `narrative buries the impact, where claims lack evidence, and where my ` +
              `individual contribution is ambiguous versus the team's.\n\n` +
              `---\n\n# ${study.title}\n\n${study.body}`,
          },
        },
      ],
    };
  }
);

// ---------------------------------------------------------------------------
// Connect. Nothing above talks to the network — the transport owns all I/O.
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stderr is safe; stdout would corrupt the JSON-RPC stream.
  console.error(`[portfolio-mcp] ready — serving ${REPO_ROOT}`);
}

main().catch((error) => {
  console.error("[portfolio-mcp] fatal:", error);
  process.exit(1);
});
