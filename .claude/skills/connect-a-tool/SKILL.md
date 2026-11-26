---
name: connect-a-tool
description: Connects any app (email, calendar, accounts, customer records, call recorder and so on) so Claude can read it and help with it, checking the connection for itself and proving it with a real read. Use during setup, or any time the person says "connect my Xero", "can you see my calendar", "hook up my email", or when a connection needs attention.
---

# Connect a tool

## When to use

Setup, or whenever the person wants to connect an app or fix one, for example "connect my Xero", "can you see my calendar", "hook up my email", or a **Fix it** or **Finish connecting** button.

## What you need

- The connector status tool in the Claude desktop app (`session_connectors_status`). Connector tools are often not loaded until you search for them, so before deciding you're not in the desktop app, search your tools for `session_connectors_status` and call it. Only if it can't be found or the call fails, say "Connecting apps needs the Claude desktop app. Open it, choose the Code tab, pick this folder and ask me again." and stop.
- The other tools named here (`set_session_connector_enabled`, `reconnect_session_connector`, `search_mcp_registry`, `suggest_connectors`) may need searching for first in the same way.
- `apps/home/data/connections.json` and `context/tools.md`, to check what's already connected and to record the result.
- The guide mode in `setup/progress.md` (beginner, some or confident), for how much to explain, and their Claude plan (`Claude plan:`), for where to click (`setup/connections/where-to-click.md`).

## 1. Find the route, never guess

1. If `setup/connections/<app>.md` exists, follow it exactly. `setup/connections/README.md` lists them.
2. If there's no guide, search Claude's connector directory (`search_mcp_registry` with the app's name, or `suggest_connectors`). A connector published by the app's maker or listed in Claude's directory counts. Anything else doesn't.
3. Nothing found: go to 4.

## 2. Check, switch on, or point to Connect

Look up this session's connections (`session_connectors_status`) and act on what you find:

| What you find | What you do |
|---|---|
| It's there and on | Go to 3 |
| It's there but switched off for this session | Switch it on (`set_session_connector_enabled`). They'll be asked to approve. It works from your next message: end this one by saying what you switched on and that you'll check it next |
| It isn't there | Give them the path from the guide: open Connectors (`setup/connections/where-to-click.md` says where, for their plan), then the app's name, then Connect, then sign in on the app's own page and approve. For a custom-address connector, only the address in our guide. Ask them to say when it's done, then look again. If they say they can't see it, ask for a screenshot and guide them from that (`where-to-click.md`, "When their screen doesn't match") |
| It needs signing in (`needs_auth`) | Tell them to open Connectors (or type `/mcp` here), choose it and sign in. Then look again |
| It's not working (`failed`) | Reconnect it (`reconnect_session_connector`). It's ready from your next message: say so, then look again |

Keep going round until it's on, unless it's waiting on someone else (2a). Describe where things are in their guide mode. Check the status yourself rather than asking them to describe their screen; a screenshot is only for when they can't find what you described.

## 2a. Waiting on someone else

Sometimes a connection can't be finished today because someone else has to act: their IT administrator or Claude Owner has to approve the connector, or they need a password reset. Don't stop setup for it.

1. Offer to draft the message they can send that person. You never send it.
2. Record it in `apps/home/data/connections.json` as `"status": "waiting"`, with `waitingOn` (who, in a word or two, such as "IT") and a `note` of the one thing still to do. Add a line to "Notes for next time" in `setup/progress.md`.
3. Say in one line what won't work until it's in, then go on to the next connection or step.

When it's sorted (they press **Finish connecting** on Home, or tell you), come back here: switch on or connect it, prove it with a read, do what setup would have done with it (for an inbox, read its last 30 days as in the email step; for a calendar, copy it in alongside any others), then record it as `connected`. If check-ins are already set up, redo the pre-approval step of this folder's check-in setup for this app too, using the rule in its guide, so scheduled check-ins can read it without stopping.

## 3. Prove it, then record it

Do one harmless read from the guide (for example "show me the last 3 emails" or "what's my next calendar event") and say what you found in one line, without quoting anything private. Only then record it:
- `apps/home/data/connections.json` (format in `setup/connections/README.md`, "Recording a connection"): `"status": "connected"`, today's date in `checked`.
- `context/tools.md`: the app, how it's connected, today's date, what you may do (read and draft only, unless they say otherwise), and what you must never do.

If the read fails, go back to 2.

After a **Fix it** that reconnected or re-added an app, check that `.claude/settings.local.json` still lists that app's read tools under their current names (the names include an id that may change). If it doesn't, redo the pre-approval step of this folder's check-in setup for that app, using the rule in its guide.

## 4. No connector

Say exactly this, with the app's name: "There's no Claude connector for <app>, so I can't connect to it live. If you export a CSV or PDF from it and drop it in the files folder, I'll read it whenever you ask." Record it as `export-only` (or `no-connector` if they don't want to export), with the reason and what the app does for them in `note`. The app shows these with a **Book a call** link.

Then offer once: "Want this joined up with something you already use? Get AI Powers can help on a call with Joey or George." Give the booking link from `apps/shared/catalogue.json` (`booking.url`). Say it once and never push it.

## 5. If it still won't connect

Outside the email and calendar step of setup (where each inbox and calendar ends proven, with no connector, or `waiting`), an app that still won't connect after the loop is recorded as `needs-attention`, with what went wrong in `note`. The Connections box shows a **Fix it** button, which brings you back here.

## Rules

- Never ask the person to paste a password, key or token into the chat, or anywhere in this folder.
- Never add a connector address that isn't in our guide, and never set up a server outside Claude's Connectors screen.
- Default access is read and draft only. Anything that sends, pays, deletes or posts needs the person's say-so each time, even once connected.
- Xero draft invoices (`setup/connections/xero-drafts.md`) is an optional extra that comes with Agentic Money View and the Agentic Command Centre: only when the person asks for Claude to put invoices into Xero. Never offer it in setup. If that file isn't in this folder, tell them it comes with Agentic Money View.
