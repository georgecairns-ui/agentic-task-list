# Step 1: quick questions

Goal: in a few short messages, learn what the person uses, so every later step is about their apps and nothing else.

## 1.1 Check what you can reach (quietly, before asking anything)

1. **This folder.** Read `setup/progress.md`, write a test line to its "Notes for next time" section, read it back and remove it. If you can't, stop and ask them to open this folder in the Claude desktop app's Code tab, or give the Claude app access to it.
2. **Their connections, checked for real.** Look up this session's connections (`session_connectors_status`). For each one that is for email, calendar, call recording, files, accounts, customers or payments, note its name and status: on (`connected`), switched off for this session, needs signing in (`needs_auth`) or not working (`failed`). Step 2 and step 4 act on this list. Never ask the person to describe their screen; you can see the status yourself.
3. **Where the folder lives.** From its path: Downloads or Desktop (suggest moving it to Documents first, because the task list app remembers the location), a cloud-synced folder (fine, it's backed up), or a folder shared with other people (point out that anyone with access can read their tasks).
4. **Their computer.** Mac or Windows, from the path or by running a harmless command.
5. **What they've already told you.** Read this conversation from the start, and any notes already in `context/` (files that don't say "Status: not filled in yet") or `files/`. If they've said their name, business, website, email provider or anything else the questions below ask, write it down now and don't ask it again.

## 1.2 Ask the questions

First, follow `setup/first-questions.md`: the talking tip, the first questions (their computer, Claude plan, where their files are, every email address and where they check meetings, what they already use, and their goal), then look for what you need yourself and show them what you found. Then ask the questions below, leaving out everything that already answered.

Use the guide mode from `setup/progress.md`: for `beginner`, ask the questions 2 at a time instead of all at once.

Open with what you found in 1.1, so they see you've already looked: "You've already got Gmail and Google Calendar connected to Claude, so I'll use those." Say what you actually found in 1.1, for example "I can see Gmail, but it needs signing in again, so we'll do that first." Then send the questions as a friendly, numbered message (all at once, unless their guide mode says otherwise). Leave out every question you already have the answer to from 1.1, say in one line what you already know, and renumber the rest. Tell them short answers are fine.

> To set this up properly I need to know a few things. Short answers are fine.
>
> 1. In a sentence, what does your business do? (Leave it out if what you found already says.)
> 2. Do you record your calls or meetings? If so, with what? (For example Fathom, Fireflies, Otter, Granola, tl;dv, Read AI, Zoom, Microsoft Teams or Google Meet.)
> 3. Which other apps do you use for the business? For example accounts (Xero, QuickBooks, FreeAgent), customers and sales (HubSpot, Pipedrive, folk, a spreadsheet), payments (Stripe), files (Google Drive, OneDrive), team chat (Slack, Teams), notes (Notion), bookings (Calendly).
> 4. Which days and hours do you usually work?
> 5. Is it just you, or do you hand work to anyone? (First names are enough.)

## 1.3 Write it down

Their name, business and website are already in `context/business.md` from `setup/first-questions.md`, so step 5 uses them without asking again.

Fill in `context/tools.md`:
- "Your setup": computer, Claude plan, workspace location, where their files live, every email address with its provider (work or personal), calendar provider, solo or team.
- "Connected apps": one row per app they named, with "How it's connected" left as "to do".

Set `settings.yourName`, `settings.businessName`, `settings.dayStarts` and `settings.dayEnds` in `apps/task-list/data/tasks.json`, and `settings.emailProvider` (`gmail`, `outlook-work`, `outlook-personal` or `other`) for their main work inbox and `settings.calendarProvider` (`google`, `outlook-work`, `outlook-personal` or `other`), so the app's Draft and Add to calendar buttons open the right place. (A reply to an email that came to another inbox carries that inbox's provider in its draft, so Draft opens there instead.)

Create `apps/home/data/connections.json` if it isn't there, in the format in `setup/connections/README.md` ("Recording a connection"), with one row per app they named and one row per inbox (with a single inbox, email and calendar from the same provider share one row, keyed by the guide's file name: `gmail-and-google-calendar` or `microsoft-365`; from different providers, or with more than one inbox, they get a row each, keyed as in step 2's 2.6), each `"status": "not-connected"`. Only ever set `connected` after a real read works.

Tick step 1 in `setup/progress.md`.

## What to say

> Thanks Sam. Your work email in Outlook and your meetings in Gmail, Fathom for calls, Xero for accounts, and it's you plus Priya. I'll connect those in that order. Most of them are a couple of clicks: you sign in, I do the rest.
