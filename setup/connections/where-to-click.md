# Where to click: finding Connectors on each Claude plan

Every guide in this folder says "open Connectors" and points here, so when Claude's screens change, this is the one file to update. Claude's screens differ by plan, and new screens reach Pro first, then Team, and Enterprise last.

Use the plan in `setup/progress.md` (`Claude plan:`). If it says `not asked yet`, ask: "Which Claude plan are you on: Pro, Max, Team or Enterprise?" and write the answer there.

## Pro and Max

1. In the Claude desktop app, choose **Customize** in the left sidebar, then **Connectors**. If the sidebar shows **Plugins** instead, choose **Plugins**.
2. If they see **Discover** or **Browse connectors**, choose it, then search for the app's name.
3. Choose **Connect to Claude**, **Connect** or **Add**, then sign in on the app's own page and approve.

They add connectors to their own account. No one else has to approve them.

## Team and Enterprise

1. Look in the same place: **Customize**, then **Connectors**, or **Plugins** if that's what the sidebar shows. Some Team screens put connectors under **Plugins**, with a **Find more plugins** button.
2. If their organisation has already added the connector, they choose it, then **Connect**, and sign in with their own account.
3. If they see **Request**, or a note asking them to contact an organisation Owner, their organisation hasn't added it yet. Their Claude Owner adds it for everyone (**Connect for your team** on the connector's page, or **Organization settings**, then **Connectors**). Offer to draft a short message they can send their Owner. You never send it.

Say once, the first time a connector comes up: "On a Team or Enterprise plan, your administrator may need to approve a connection before you can use it." When one is waiting on someone else, it is parked as `waiting` and setup goes on (`.claude/skills/connect-a-tool`, "Waiting on someone else").

## Switching one on in this chat

The **+** button in the message box, then **Connectors** (or **Plugins**), then the switch next to the app. You can usually do this yourself (`set_session_connector_enabled`); give them this path only when that doesn't work.

## When their screen doesn't match

If they say they can't see what you described, ask for a screenshot: "Could you take a screenshot of your Claude window and paste it here? Then I'll tell you exactly where to click." Guide them from what is on it, one click at a time. Then add a line to "Notes for next time" in `setup/progress.md` saying their plan and what their screen showed, so this file can be corrected.

## Sources

Checked against Anthropic's own pages on 26 November 2026. Not yet checked on a real account of each plan.
- https://claude.com/docs/connectors/getting-started
- https://support.claude.com/en/articles/15183774-connect-to-microsoft-365
- A Team-plan screen seen on a setup call on 17 November 2026: connectors under "plugins", with "Find more plugins".
