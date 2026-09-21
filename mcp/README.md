# portfolio-mcp

An MCP server over this portfolio's content. Built to learn the protocol, useful enough to keep.

```bash
npm --prefix mcp install
npm --prefix mcp run build
npm --prefix mcp run smoke     # exercises every capability via a real MCP client
```

Registered for Claude Code in `.mcp.json` at the repo root. Restart Claude Code to pick it up.

## What it exposes

**Tools** (model-invoked)

| Tool | Purpose |
|---|---|
| `list_case_studies` | Every case study + tags, flagging entries with no page and pages with no entry |
| `read_case_study` | Full text of one study; `prose` strips JSX, `source` gives raw MDX |
| `search_portfolio` | Case-insensitive line search across MDX + `lib/content.ts` |
| `get_profile` | Work history and competencies |
| `audit_content` | Registry/page drift, missing metadata, broken image paths, figures without alt |

**Resource** — `portfolio://case-study/{slug}`, with a list callback (so it appears in a client's picker) and slug completion.

**Prompt** — `critique_case_study`, which loads a study and frames a hiring-manager review.

## Layout

```
mcp/
├── server.js        entry shim — what clients spawn
├── smoke.mjs        an MCP *client*; the other half of the protocol
├── src/
│   ├── portfolio.ts domain logic — reads the repo, knows nothing about MCP
│   └── server.ts    protocol wiring — the only file that imports the SDK
└── dist/            tsc output (gitignored)
```

The split is the point. `portfolio.ts` is ordinary TypeScript you could call from a script or a route handler; `server.ts` only adapts it to the protocol. Servers that tangle the two are hard to test and impossible to reuse.

`tsc` roots output at the repo root so it can also compile the shared `lib/content.ts`, which is why the real entry lands at `dist/mcp/src/server.js`. `server.js` hides that.

## Things worth knowing

**stdout is the protocol.** On stdio transport, a stray `console.log` injects garbage into the JSON-RPC stream and the client drops the connection with a parse error. Log to stderr.

**Descriptions are prompt engineering.** The tool description and JSON Schema are all the model sees when deciding whether to call you. `"Search"` gets ignored; a description that says *when* to reach for the tool gets used.

**Tool errors are results, not exceptions.** Return `{ isError: true }` with a message the model can act on — `read_case_study` lists valid slugs when given a bad one, so the model self-corrects instead of failing. Throwing produces a protocol error it can't reason about.

**Annotations are hints to the client, not the model.** `readOnlyHint: true` lets a host auto-approve rather than prompting the user on every call.

**Don't wrap an API endpoint-for-endpoint.** Forty thin tools flood the context window and the model can't choose between them. `audit_content` is the model here: it answers a question a person actually has by doing five checks server-side and returning one short summary.

## Seeing the wire

```bash
printf '%s\n' \
'{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"by-hand","version":"0"}}}' \
'{"jsonrpc":"2.0","method":"notifications/initialized"}' \
'{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}' \
| node mcp/server.js
```

That's the entire handshake: `initialize` negotiates version and capabilities, `notifications/initialized` acknowledges, then the client discovers what you offer.

## Next step

`npm --prefix mcp run inspect` opens the official MCP Inspector — a browser UI for calling tools and reading responses interactively.
