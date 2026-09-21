/**
 * A minimal MCP CLIENT. This is the other half of the protocol — the same thing
 * Claude Code does when it launches your server. Run it to exercise the server
 * without wiring it into a host app.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"],
});
const client = new Client({ name: "smoke-test", version: "0.1.0" });
await client.connect(transport);

const rule = (s) => console.log(`\n${"─".repeat(70)}\n${s}\n${"─".repeat(70)}`);
const say = (r) => console.log(r.content.map((c) => c.text).join("\n"));

rule("DISCOVERY");
const { tools } = await client.listTools();
for (const t of tools) console.log(`  tool     ${t.name}`);
const { resourceTemplates = [] } = await client.listResourceTemplates();
for (const r of resourceTemplates) console.log(`  resource ${r.uriTemplate}`);
const { prompts } = await client.listPrompts();
for (const p of prompts) console.log(`  prompt   ${p.name}`);

rule("list_case_studies");
const listed = await client.callTool({ name: "list_case_studies", arguments: {} });
say(listed);
console.log("\nstructuredContent slugs:", listed.structuredContent.caseStudies.map((c) => c.slug));

rule("audit_content");
say(await client.callTool({ name: "audit_content", arguments: {} }));

rule("search_portfolio  query='p-value'");
say(await client.callTool({ name: "search_portfolio", arguments: { query: "p-value", limit: 5 } }));

rule("read_case_study  (first 400 chars of prose)");
const read = await client.callTool({
  name: "read_case_study",
  arguments: { slug: "global-pay-reports" },
});
console.log(read.content[0].text.slice(0, 400) + "…");

rule("read_case_study  with a bad slug → isError, not a crash");
const bad = await client.callTool({ name: "read_case_study", arguments: { slug: "nope" } });
console.log("isError:", bad.isError, "|", bad.content[0].text);

rule("resource read  portfolio://case-study/right-to-information");
const res = await client.readResource({ uri: "portfolio://case-study/right-to-information" });
console.log(res.contents[0].text.slice(0, 220) + "…");

rule("prompt  critique_case_study");
const prompt = await client.getPrompt({
  name: "critique_case_study",
  arguments: { slug: "pay-equity-analysis" },
});
console.log(prompt.messages[0].content.text.slice(0, 300) + "…");

await client.close();
