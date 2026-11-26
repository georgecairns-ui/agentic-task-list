# Connecting apps: which guide to follow

Every guide says "open Connectors": `where-to-click.md` says where that is on each Claude plan, and what to do when their screen looks different.

Use `.claude/skills/connect-a-tool/SKILL.md` for the general method (find the route, check or switch on the connection, prove it with a real read, record it, and what to do when there's no connector). This folder has the specifics for each app. Follow the file for the app the person names. Every guide has the same 6 sections, in the same order: Connect, If there's no connector, Prove it, What Claude may and may not do, Record, Sources. (Gmail and Google Calendar always has a connector, so its guide leaves out the second; Microsoft 365's is called "If their email isn't a work account".)

| App | What it gives your app | Recommended route | File |
|---|---|---|---|
| Gmail | The Inbox (drafted emails waiting to be sent) and new tasks in Review | Claude connector | `gmail-and-google-calendar.md` |
| Google Calendar | Calendar (today's and this week's meetings) | Claude connector | `gmail-and-google-calendar.md` |
| Microsoft 365 (Outlook mail and calendar) | The Inbox and the calendar in This week | Claude connector | `microsoft-365.md` |
| Microsoft Teams meeting transcripts | Calls entries and follow-up tasks in Review | Claude connector (Microsoft 365) | `microsoft-365.md` |
| Google Drive | Files found for Review and People | Claude connector | `google-drive.md` |
| Google Meet transcripts and Gemini notes | Calls entries and follow-up tasks in Review | Claude connector (Google Drive, reading the "Google Meet" folder) | `google-drive.md` |
| Fathom | Calls entries and follow-up tasks in Review | Claude connector | `fathom.md` |
| Fireflies | Calls entries and follow-up tasks in Review | Claude connector | `fireflies.md` |
| Otter | Calls entries and follow-up tasks in Review | Claude connector | `otter.md` |
| Granola | Calls entries and follow-up tasks in Review | Claude connector | `granola.md` |
| tl;dv | Calls entries and follow-up tasks in Review (covers Google Meet, Zoom and Teams recordings) | Claude connector | `tldv.md` |
| Read AI | Calls entries and follow-up tasks in Review | Claude connector | `read-ai.md` |
| Zoom | Calls entries and follow-up tasks in Review | Claude connector | `zoom.md` |
| Xero | Unpaid invoices and bills due in Review, plus cash position and profit and loss | Claude connector (read-only) | `xero.md` |
| QuickBooks Online | Unpaid invoices and estimates in Review | Claude connector ("Intuit QuickBooks", US customers only); a CSV or PDF export into `files/` for everyone else | `quickbooks.md` |
| FreeAgent | Unpaid invoices and bills due in Review | CSV export into `files/` (no connector in Claude's directory on 29 October 2026) | `freeagent.md` |
| HubSpot | Contacts in People, deals going quiet and tickets needing a reply in Review | Claude connector | `hubspot.md` |
| Pipedrive | Contacts in People, deals going quiet in Review | Claude connector | `pipedrive.md` |
| folk | Contacts in People, deals going quiet in Review | Claude connector (folk's own; add by its address if it isn't listed) | `folk.md` |
| Slack | Requests from the team in Review | Claude connector | `slack.md` |
| Notion | Notes and project trackers in People and Review | Claude connector | `notion.md` |
| Stripe | Payments to follow up on and failed charges in Review | Claude connector (Stripe's own sign-in) | `stripe.md` |
| Calendly | Upcoming bookings in Calendar and People | Claude connector | `calendly.md` |

Default for every app: read, and prepare drafts where the app allows. Claude never sends, pays, deletes, posts, cancels or changes anything on the person's behalf unless they ask for that one specific action in that conversation. Record every connection once a real read has worked (see "Recording a connection" below).

## Recording a connection

`apps/home/data/connections.json`. Claude creates it in setup; it never ships.

```json
{
  "version": 1,
  "connections": {
    "gmail-and-google-calendar": {
      "name": "Gmail and Google Calendar",
      "status": "connected",
      "how": "Claude connectors: Gmail, Google Calendar",
      "checked": "2026-10-28",
      "note": "Read; prepare drafts. Never send, delete, archive or label."
    },
    "microsoft-365": {
      "name": "Microsoft 365 (james@example.com)",
      "status": "waiting",
      "waitingOn": "IT",
      "how": "Claude connector: Microsoft 365",
      "checked": "",
      "note": "Their IT administrator has to approve the connector. Then: Finish connecting, and read its last 30 days."
    },
    "sage": {
      "name": "Sage",
      "status": "export-only",
      "how": "CSV export into files/",
      "checked": "",
      "note": "No Claude connector"
    }
  }
}
```

- Key: the guide's file name in `setup/connections/` without `.md`. For an app with no guide, the app's name in lower case with hyphens (`my-booking-system`).
- `status`: one of `connected`, `needs-attention`, `waiting`, `export-only`, `no-connector`, `not-connected`, `not-used`. The app shows `no-connector` as "Not supported yet".
- `checked`: `YYYY-MM-DD` of the last successful read. Required when `status` is `connected`.
- `waitingOn`: for `waiting` only, who it's waiting on, in a word or two ("IT", "Priya", "a password reset"). The app shows "Waiting on IT" with a **Finish connecting** button.
- More than one inbox: one row per inbox, and put the address in `name` ("Gmail (sam@fernandfinch.example)"). Each keeps its guide's key (`gmail-and-google-calendar`, `microsoft-365`). When 2 inboxes would share a key, add the address in lower case with `@` and dots as hyphens: `gmail-and-google-calendar-sam-gmail-com`. Email and calendar from the same provider still share 1 row when there is only one inbox.

Rules:
- Write `connected` only after a real read worked, with that day's date in `checked`.
- When a check-in's read fails, set `needs-attention`, keep the old `checked`, and say so in the check-in summary.
- `waiting` is for a connection someone else has to approve or fix first. Setup goes on without it. When it's finished later, prove it with a read, do what setup would have done with it (for an inbox, read its last 30 days), then set `connected`.
- `context/tools.md` stays as the note the person can read; `connections.json` is what the app shows.
