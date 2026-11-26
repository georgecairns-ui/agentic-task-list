# Shared version 14: what changed since version 13

Shared version 14, 26 November 2026. Everything in `SHARED-V3-CHANGES.md` to `SHARED-V13-CHANGES.md` still applies. This file lists only what's new.

**Made in Agentic Task List first,** then copied to the other 6 tools. The decisions are George's, in `specs/2026-11-26-first-timer-setup-change-request.md` (revision 3) in the Small Business Toolkit folder on the Drive. This version carries CR-2 to CR-7, CR-10 to CR-13 and the CR-9 README line. CR-1's paste prompt, CR-8, the CR-12 Connections-page button and the kit's own CLAUDE.md come with the Agentic Command Centre rebuild, after all 7 tools merge.

**Why:** on 17 November 2026 James Thorpe, who had never used Claude Code, installed the Agentic Command Centre on a call with George. Setup didn't start on its own; his work email (Microsoft 365) needed IT approval, and step 2 told Claude to stop the whole setup; his Claude screens didn't match George's; he had 2 inboxes; he'd already written up his client journey and reports in Claude and had to offer them himself; and nothing asked about the CRM he already uses (folk).

**The repository is a harness.** Every change here is instructions for Claude, in the customer's own session. Nothing is built or hosted for them.

## What version 14 does

1. **Setup starts on its own** (CR-1, the CLAUDE.md part). When `Setup: not done yet`, Claude starts setup instead of offering it, whatever the person's first message says, with one line first, and any "get this going" wording routes to it ("install and run", "set this up", "get it going"). The setup skill's description lists the same words.
2. **Every inbox, then one inbox** (CR-2). The first questions ask for every work email address and where they check meetings, and whether each Microsoft address is work or personal. The email step lists them back in a table (address, where it lives, can Claude connect it), connects each one that has a connector, proves each, reads the last 30 days of each, and every tool reads them as one inbox. An inbox with no connector forwards into a connected one. No third-party service. `connections.json` has one row per inbox; one inbox with email and calendar from the same provider still shares 1 row. A draft replies from the address the email came to (`draft.from`, and `draft.provider` when it isn't their main inbox, so Draft opens in the right place).
3. **Waiting on IT doesn't stop setup** (CR-3). New status `waiting`, with `waitingOn` ("IT"). It is parked, everything else connects, and setup goes on. The Home Connections box shows "Waiting on IT" with a **Finish connecting** button, which brings Claude back to `connect-a-tool` ("Waiting on someone else") to connect, prove and read its last 30 days. When nothing at all can be connected for email yet, setup still goes on and says what won't work. A person who chooses not to connect email at all still gets the one-line warning and the choice to stop (unchanged). "Email and calendar come before any other connection" becomes "ask about email and calendar before any other connection": the order stays, the gate goes. The hand-over lists every `waiting` item with the one thing to do next, and its checklist accepts `waiting`.
4. **Talk instead of type** (CR-4). One line just before the first message of questions, in every guide mode: press the microphone button in the message box and speak. Beginner mode adds that rambling is fine.
5. **Ask their plan, then go by their screen** (CR-5). The first questions ask Pro, Max, Team or Enterprise, recorded as `Claude plan:` in `setup/progress.md`. Every connector direction now says "open Connectors" and points at one shared file, `setup/connections/where-to-click.md`, which has the path per plan, the Team and Enterprise approval (Request, the Owner, Organization settings), and "ask for a screenshot and guide from it" when their screen doesn't match. Team and Enterprise hear once that an administrator may need to approve a connection.
6. **Talk to Claude like a colleague** (CR-6). In `START-HERE.md`, straight after the guide mode question, the colleague line. Whenever they hesitate, skip a question, say "I don't know" or hit a blocker, a one-line invitation in context.
7. **Learn as you go** (CR-7). `setup/learn-as-you-go.md`: in beginner mode each step ends with one "You just learned" line; at hand-over, in every mode, a 10-minute "how to use Claude day to day" lesson in the same chat, built round their own tools, which can be declined and asked for again ("show me how to use Claude").
8. **Supported plans** (CR-9). README "What you need": Pro, Max, Team or Enterprise, with the line that on Team and Enterprise an administrator may need to approve connections and the screens may look different.
9. **Claude finds it, then confirms it** (CR-10). `setup/first-questions.md` asks computer, plan, where their files are, email addresses, what they already use and their goal; then, with their yes, Claude reads their synced folders, website and connected apps, shows one "here's what I found about your business" summary with where each fact came from, and asks only what it couldn't find. It never moves or changes their files.
10. **Files they promise to share** (CR-11). `## Files you said you'd share` in `setup/progress.md` (`to find`, `found`, `added`); look for the file by name first ("Is this the one?"); repeat the list before each new step; read a pasted claude.ai artifact link with the artifact tool (or ask for its text) and import what it holds; remind at hand-over.
11. **Join up what they already use, or book a call** (CR-12). The first questions ask what they already use (CRM, dashboards, task tools), and the step that connects apps puts those first. No connector: the no-connector sentence, recorded with what the app does for them, and a one-line book-a-call offer. The Home box labels `no-connector` "Not supported yet" and shows **Book a call** next to `no-connector` and `export-only` rows. New guide `setup/connections/folk.md`.
12. **Built around their goal** (CR-13). New `context/goal.md`. Every `CLAUDE.md` opens with "Their goal": read it before any job and judge every suggestion, check-in and build by it. The goal is asked in the first questions, in their words with numbers. The check-in opens with one line on progress towards it, when something moved. `keep-context-fresh` updates it when it's met or changes. The hand-over opens with it.

## What every tool copies, byte for byte

Copy each path from Agentic Task List's branch with `rsync -a`. Only the guides a tool already ships are copied, plus `folk.md` and `where-to-click.md` (see below).

| Path | Change |
|---|---|
| `apps/shared/js/connections.js` | `waiting` status (rank after `needs-attention`), `label()` ("Waiting on IT"), `no-connector` reads "Not supported yet", counts include `waiting`, `finishPrompt()`, `canBookCall()`, `bookingUrl()` |
| `apps/shared/js/connections-box.js` | Finish connecting on `waiting` rows, Book a call on `no-connector` and `export-only` rows (catalogue `booking.url`, tagged with the first installed tool's id) |
| `apps/shared/VERSION` | `14` and `2026-11-26` |
| `maintainers/test-connections.js` | 16 checks (6 new) |
| `.claude/skills/connect-a-tool/SKILL.md` | Plan and where-to-click; screenshot when they can't find it; new part 2a "Waiting on someone else"; part 4 records what the app does and gives the book-a-call line |
| `setup/connections/where-to-click.md` | New. Every tool ships it |
| `setup/connections/folk.md` | New. Every tool that ships `hubspot.md` ships it too |
| `setup/connections/<app>.md` for every guide the tool ships | "in the Claude desktop app, Customize, then Connectors, then" became "open Connectors (`setup/connections/where-to-click.md` says where, for their plan), then"; "isn't listed: Customize, then Connectors, then the + button" became "isn't listed: in Connectors, the + button". `microsoft-365.md` rewritten for personal accounts and the Team and Enterprise approvals, with `waiting` |
| `setup/first-questions.md` | New. CR-2 question, CR-4, CR-5, CR-10, CR-11, CR-12 question, CR-13 |
| `setup/learn-as-you-go.md` | New. CR-7 |
| `context/goal.md` | New. Ships blank ("Status: not filled in yet"), so the release check's blank-context rule covers it |
| `maintainers/SHARED-V14-CHANGES.md` | This file |

## Each tool adapts

Agentic Task List's own versions are the reference. "Its own equivalent" means the same change in the tool's own file or wording.

- **`CLAUDE.md`:**
  - A new first section, "## Their goal", word for word from Agentic Task List.
  - "Setup: not done yet" goes under a "## Setup" heading, and the paragraph after it becomes the start-straight-away paragraph, word for word except the tool's own setup time.
  - The context table gains the `context/goal.md` row, first.
  - Rule 3's connections line gains the `waiting` sentence.
  - The skills table: the setup row gains "install and run", "set this up", "get it going"; new rows for "Show me how to use Claude" and "My goal has changed".
- **`.claude/skills/setup/SKILL.md`:** the description lists "install and run", "set this up" or "get it going".
- **`context/README.md`:** the `goal.md` row, first.
- **`START-HERE.md`:**
  - The intro line for the person: "Open this folder in the Claude desktop app (the Code tab) and type anything, even "hello". Setup starts from there. (Or type **/setup**.)"
  - The beginner row of the guide-mode table ends with the "You just learned" sentence.
  - "email and calendar come before any other connection" becomes "you ask about email and calendar before any other connection" (tools without email keep their own wording around it).
  - The colleague line, straight after the guide-mode paragraph, word for word.
  - The steps table: the first-question step names `setup/first-questions.md` first; tools with an email step say every inbox and calendar, and that one waiting on IT is parked.
  - After "After each step", the beginner "You just learned" sentence and the hesitation paragraph, word for word.
  - Two new ground rules, word for word: "Waiting on someone else doesn't stop setup" and "Keep track of what they promise to share".
- **`README.md`:** "What you need" plan line, word for word.
- **`setup/progress.md`:** `Claude plan: not asked yet` under `Guide mode:`, and a `## Files you said you'd share` section before "Notes for next time".
- **The first-question step** (Task List `01-quick-questions.md`, Pipeline `01-quick-questions.md`, Proposals `01-quick-questions.md`, Content `content-01-your-business.md`, Money View `money-01-your-accounts.md`, Ads `ads-02-where-your-ads-are.md` or its first question step, Skill and Folder Map `skill-map-01-first-scan.md`): starts with "First, follow `setup/first-questions.md` ...", and drops its own questions that file now asks (email, calendar, computer, plan, goal).
- **The email step** (Task List, Pipeline, Proposals `02-connect-email-and-calendar.md`): its own equivalent of Agentic Task List's rewrite: 2.1 table of inboxes, 2.2 the Outlook.com row and the `waiting` row, 2.3 per inbox, 2.4 every inbox and drafts from the address it came to, 2.5 the 3 endings and "setup still goes on", 2.6 one row per inbox. Tools without email gain none of this.
- **The step that connects other apps:** what they already use goes on the shortlist first; no connector means the book-a-call line once; `waiting` is a valid end.
- **The "get to know the business" step (`05-get-to-know-the-business.md`):** starts from what `first-questions.md` found and their goal, and asks nothing already answered.
- **The hand-over step (`09-check-and-hand-over.md`):** the checklist accepts `waiting` (every inbox, calendar and shortlisted app) and checks `context/goal.md`; the summary opens with their goal; new items for anything still waiting, files still to find, joining up the rest (book a call), and the 10-minute lesson offer. Tools without email adapt only the parts that fit.
- **The check-in skill:** reads every connected inbox (tools that read email); leaves `waiting` rows alone in its Connections step; opens with one line on progress towards their goal.
- **`triage-inbox`** (and Pipeline's own inbox reader): every connected inbox, as one; drafts carry `from` and `provider`.
- **`keep-context-fresh`:** `goal.md` in its file list and the goal line.
- **The step that fills the app first** (Task List `07-first-run.md`): with no inbox or calendar connected yet (each `no-connector` or `waiting`), leave the inbox part out and say it fills in once one is. The hand-over checklist accepts an empty `replies` and shows the empty Inbox instead of the Draft test.
- **Every calendar, merged:** the email step's calendar copy and the check-in's calendar step copy from every connected calendar into one list.
- **The tool's own app,** where it opens drafts (Task List: `app.js`, `drawer.js`, `view-replies.js`; Pipeline: its own equivalent): a draft's own `provider` wins over `settings.emailProvider`, and when a draft has `from`, the panel and the toast say "Send it from <address>". Document `from` and `provider` in the tool's `apps/<tool>/CLAUDE.md`.
- **`setup/connections/README.md`:** keep your own table, add the folk row if you ship `folk.md`; take the intro line about `where-to-click.md` and the whole "Recording a connection" section, which is identical in every tool.
- **The tool's own connect step tables** that list CRMs: add folk where HubSpot and Pipedrive are listed.
- **`toolkit.json`:** `sharedVersion` `"14"`.
- **`maintainers/make-release.sh`:** add `setup/connections/where-to-click.md`, `setup/first-questions.md`, `setup/learn-as-you-go.md` and `context/goal.md` to the must-exist list.
- **`maintainers/MAINTAINING.md`:** shared version 14, latest changes file `SHARED-V14-CHANGES.md`.

## Decisions made while building

1. **One shared file for the first questions,** `setup/first-questions.md`, rather than the same paragraphs pasted into 7 different first steps. 4 tools have no `01-quick-questions.md`, and the kit asks everything once; one byte-for-byte file keeps the wording identical everywhere and passes `build.py`'s "differing files" rule. It is not a numbered step, so `setup/progress.md` gains no tick for it.
2. **The release check's give-up phrases still apply.** CR-3's "park it and carry on" is written as "go on to step 3" in connection files, because "and carry on" is a give-up phrase there. The meaning is George's: parking is a recorded state with a Finish connecting button, not giving up.
3. **Microsoft 365 takes personal accounts now.** Anthropic's page (rechecked 26 November 2026) says Pro and Max can connect Outlook.com, Hotmail, Live or MSN as a **Personal account**, with no administrator. Team and Enterprise get only work or school accounts, switched on by the Claude Owner, with a one-time Microsoft Entra consent. This answers CR-2's open point: setup asks which kind each address is. James was on a Team-style plan with a work account, so his IT approval fits. Older text said Outlook.com had no connector; it's corrected in `microsoft-365.md` and step 2.
4. **folk has its own connector.** folk's help page (22 September 2026) gives `https://mcp.folk.app/mcp` and says to add it from Claude's directory; a search of Claude's directory on 26 November 2026 found nothing for "folk". So `folk.md` uses the directory first and the maker's own address as a custom connector second, the same pattern as HubSpot. Tool names aren't published, so pre-approval uses the mechanical rule.
5. **"Not supported yet"** is the label for `no-connector`, not a new status. `export-only` and `no-connector` both get Book a call.
6. **Book-a-call tags:** `utm_source=<first installed tool id>&utm_medium=app&utm_campaign=join-it-up` on the catalogue's `booking.url` (Joey's claude-chat Calendly). The demos use `utm_source=<tool>-demo&utm_medium=demo`. George may want different tags.
7. **2 addresses on one connector:** if a connector takes only one account at a time, the second address forwards into the connected one. Whether Claude's Gmail connector takes 2 accounts is not confirmed, so the wording is conditional.
8. **The goal line in check-ins** appears only when the run found something that moves it, so scheduled runs stay quiet.
9. **Step 5's priorities question** is asked only if the goal doesn't already say it.
10. **Setup time stays 30 to 40 minutes** in Agentic Task List's `CLAUDE.md` line, matching its README and START-HERE, not the spec's "about 20 minutes" example. Each tool uses its own setup time.
11. **"Setup starts on its own" means on their first message.** In the Code tab Claude never speaks first, so the person types anything ("hello") and `CLAUDE.md` starts setup whatever it says. The kit's paste prompt (CR-1, kit) tells them this when it hands over the folder.
12. **The reply address is shown, not set.** Gmail's compose link has no documented way to choose the sending account, so a draft's `from` is shown in the panel and the toast ("Send it from ..."). `provider` still picks Gmail or Outlook.
13. **Name, business and website move into the first questions,** so the search in `first-questions.md` section 3 knows their website. Task List's step 1 then asks only what the business does, if the search didn't say.
14. **Saying things once.** The Team and Enterprise admin line is marked `(admin line said)` after the plan in `setup/progress.md`, and the work-or-personal answer for each Microsoft address is written in `context/tools.md`, so `where-to-click.md` and `microsoft-365.md` don't repeat them.
15. **Finish connecting redoes the check-in pre-approval** for the newly connected app, so scheduled check-ins don't stop at a permission prompt.

**Whole-branch review (26 November 2026)** of Agentic Task List found 2 must-fix (James's real details in examples, now Sam and Fern & Finch; "setup starts on its own" with nobody typing) and 7 should-fix items (decisions 11 to 15, every calendar merged, the no-inbox route in steps 7 and 9). All fixed before the other tools copied the final wording.

## Not checked yet (before release)

- **CR-4:** where the microphone button sits in the Code tab, on Mac and on Windows. Anthropic's pages say dictation works in the Code tab but don't say where. The tip says "the microphone button in the message box".
- **CR-5:** `where-to-click.md` is from Anthropic's pages (26 November 2026) and James's screen. It must be checked on a real Pro, Team and Enterprise account.
- **CR-10:** the approval prompts when Claude reads `~/Library/CloudStorage` or a Windows synced folder (setup warns a beginner to expect them).
- **CR-2:** a real setup with 2 inboxes, and with a personal Outlook.com address on Pro or Max, and a work Microsoft 365 address waiting on IT.
- **CR-11:** reading a pasted claude.ai artifact link in a customer's Code tab (documented for Claude Code on paid plans; not tried here).
- **CR-12:** `folk.md` on a real folk account.
- **CR-10:** the "here's what I found" summary on a test business with files in Google Drive.
- A real `claude -p` or desktop setup run end to end.

## Tested

In Agentic Task List, on `claude/first-timer-setup`: `bash maintainers/make-release.sh` passes; `node maintainers/test-connections.js` 16 checks pass; the helper tests and the Home box in a browser are in the PR description.

## What the other 6 tools do

1. `git fetch origin && git switch -c claude/first-timer-setup origin/main`.
2. Copy the byte-for-byte files above.
3. Make the "Each tool adapts" changes in the tool's own files.
4. Run `bash maintainers/make-release.sh`, `node maintainers/test-connections.js`, the tool's own tests, and (in a terminal tab) both helper tests.
5. Commit "Shared version 14: first-timer setup" and open a PR that names Agentic Task List's PR. Nothing merges without George's yes.

## For the Agentic Command Centre rebuild (after all 7 merge)

The kit's overlay patches some of the files changed here with `.replace-json` edits (`02-connect-email-and-calendar.md`, `04-connect-other-apps.md` and others), which need exact old text. Expect `build.py` to fail on them until each is updated. The kit also needs its own `toolkit-01`, `toolkit-04`, its Connections page (`waiting`, Finish connecting, Book a call) and `check.py`'s allowed statuses (add `waiting`), plus CR-1's paste prompt, CR-8, CR-12's button and CR-13 in its own CLAUDE.md.
