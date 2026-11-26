# Connect folk

What it gives your app: contacts in People, and deals and follow-ups going quiet in Review.

**Connector:** folk's own connector, from folk (the app's maker), at `https://mcp.folk.app/mcp`. folk says to find it in Claude's connector directory; on 2026-11-26 a search of Claude's directory for "folk" found nothing, so it may need adding by its address. **Plans:** folk's page doesn't say; adding a connector by address may depend on the Claude plan, and on Team and Enterprise the organisation Owner may need to add it.
**Route:** directory, or custom-address if it isn't listed.

## Connect

1. Say "Let's connect your customer records in folk." Say "connect" and "a connection", never MCP, API, JSON or repo.
2. Look up this session's connections (`session_connectors_status`) and follow the table in `.claude/skills/connect-a-tool` ("Check, switch on, or point to Connect").
3. If they need to add it: open Connectors (`setup/connections/where-to-click.md` says where, for their plan), then Browse connectors, then search "folk", then add it, then sign in to folk and approve.
   If "folk" isn't listed: in Connectors, the + button, then Add custom connector. Name it "folk" and use exactly `https://mcp.folk.app/mcp`. Then sign in to folk and approve. Use no other address.
4. If their Claude Owner has to add it first, it's `waiting` (`.claude/skills/connect-a-tool`, "Waiting on someone else").

## If there's no connector

Say exactly: "There's no Claude connector for folk, so I can't connect to it live. If you export a CSV or PDF from it and drop it in the files folder, I'll read it whenever you ask." Record it as `export-only`. Ask the person to export their contacts or a deals view as a CSV and save it into the files folder.

## Prove it

Ask first, then search their people or deals. Say: "I can see 40 people in folk; Greenway Café's deal hasn't moved since 20 September."

## What Claude may and may not do

The connector is read and write: folk says it can create and update contacts, notes and custom fields, move deals and build reports. Never create, update or move anything unless the person asks for that one specific action in this conversation. Default to reading and suggesting tasks only.

Pre-approve for check-ins: only names that start with `get_`, `list_`, `search_`, `read_`, `find_`, `fetch_` or `query_`, or end with `_search` or `_get`, and no others; never any name containing create, update, delete, send, mark, archive, add, remove, set, move, post, reply, label, trash or write, whatever else it matches. folk's tool names couldn't be confirmed on 2026-11-26, so apply this rule to whatever the connector shows on the day.

## Record

`apps/home/data/connections.json`, key `folk`: name "folk", status `connected`, how "Claude connector: folk", checked today, note "Read people, companies and deals. Never create, update or move anything."

`context/tools.md`: "folk | Claude connector | <today> | Read people, companies and deals | Create, update or move anything, unless asked"

## Sources

Checked on 2026-11-26 from folk's own page and a search of Claude's connector directory. Not yet tried on a real folk account.
- https://help.folk.app/en/articles/15503108-mcp-how-to-connect-folk-to-claude
