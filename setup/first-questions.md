# Before the first question

This file is the same in every Agentic tool. The first question step of setup starts here, then asks only its own questions that this didn't answer. Do it once per setup: if `setup/progress.md` already has a `Claude plan:` other than `not asked yet` and `context/goal.md` is filled in, it's done.

The idea: find out as much as you can yourself, show them what you found, and ask only for what you couldn't find. This is their first proper look at what Claude can do.

## 1. Tell them they can talk

Just before your first message of questions, one line:

> You can talk your answers instead of typing: press the microphone button in the message box and just speak.

In beginner mode, add: "It's fine to ramble. I'll sort it out."

## 2. The first questions

Leave out anything you already know (from this conversation, `setup/progress.md`, `context/`, or the folder's path), and say in one line what you already know. Ask in their guide mode (beginner: 2 at a time).

> 1. Are you on a Mac or Windows?
> 2. Which Claude plan are you on: Pro, Max, Team or Enterprise?
> 3. Where do you keep your work files: Google Drive, OneDrive, Dropbox, or just on this computer? And roughly which folders?
> 4. Which email addresses do you use for work, and where do you check your meetings? (Lots of people have more than one. Tell me all of them.)
> 5. What do you already use to run this side of the business? For example a CRM, your own dashboards or reports, a task app or a spreadsheet.
> 6. What do you want this to help you achieve over the next 3 months? In your own words, with a number if you can.

Ask question 4 only if this folder's setup connects email (it has a step that connects email and calendar). For every Microsoft address, ask whether it's a work account their business or IT team manages, or a personal Outlook.com or Hotmail address: don't assume.

Write down:
- The plan in `setup/progress.md` (`Claude plan: Pro`, `Max`, `Team` or `Enterprise`). On Team or Enterprise, say once: "On a Team or Enterprise plan, your administrator may need to approve a connection before you can use it. If that happens, I'll park it and we'll carry on with the rest."
- The computer, storage and plan in `context/tools.md` ("Your setup").
- Every email address, its provider, and whether it's work or personal, in `context/tools.md`. The email step lists them back to them.
- What they already use, in `context/tools.md` ("Connected apps"), one row each, "to do". The step that connects apps connects each one that has a connector (`.claude/skills/connect-a-tool`); anything without one is recorded as not supported yet, with what it does for them, and gets the book-a-call line from that skill.
- Their goal in `context/goal.md` (section 5).

## 3. Look for it yourself, then show them

Ask once: "With your OK, I'll look through your files, your website and the apps you've already connected for what I need, so I don't have to ask you. I only read. I won't move or change anything."

With a yes, look in:
- The folders they named. Google Drive, OneDrive and Dropbox usually sync to this computer (on a Mac, look in `~/Library/CloudStorage` first; on Windows, in their user folder), so you can read them like any folder here.
- Their website.
- Every app this session is already connected to (`session_connectors_status`), for example Google Drive.

Look for what the tools need: what they sell and for how much, who their customers are, their brand, how a client goes from first contact to finished work, the reports they send, the jobs they repeat, and how they invoice. Read file names first, open only the files that look right, and read only what's needed. Never move, rename, change or delete anything. Note where each fact came from.

Then show one summary and ask them to confirm or correct it:

> Here's what I found about your business. Tell me what's wrong.
> **What you sell:** Social media management for hospitality, from £1,200 a month (your website, Pricing page).
> **Your clients:** Greenway Café, Marlow Dental and 6 more (Drive, Clients folder).
> **How you work with a client:** a 7-step journey from enquiry to monthly report (Drive, "Client journey.docx").

Group it by what each part of the app needs (in the Agentic Command Centre, by tool). Put what they confirm into the right `context/` files, with the source. From then on, every question in setup is only for what the search didn't find.

## 4. Files they say they'll share

Whenever they say something like "I've got that in a document" or "I can share that", add it under `## Files you said you'd share` in `setup/progress.md`: the file's name, what it's for, and `to find`.

- **Look first.** Before asking them for it, search their synced folders and connected storage by name, and ask: "Is this the one? [file name, in which folder]". Mark it `found` when they say yes.
- **Claude artifact links.** If they paste a link to something they made in Claude (it starts `https://claude.ai/artifact/` or `https://claude.ai/code/artifact/`), read it with your artifact tool (search your tools for "Artifact" if it isn't in your list). If you can't read it, ask them to open it and paste its text here. Put what it holds into the right part of the app and `context/`, and note the link as the source. Mark it `added`.
- **Repeat them back** before you move to the next step, by name: "Drop in your client journey and your monthly report template when you can."
- At hand-over, list any still `to find`.

## 5. Their goal

The whole folder is built around helping them reach their goal. Fill in `context/goal.md` in their words, with the numbers. For example: "Improve client results, and sign 2 new clients worth £5,000 a month in total, by the end of February 2027."

If they're vague, ask one follow-up: "What would tell you it's worked? A number of clients, an amount a month, hours saved?" Change its status line to `Status: filled in on <date>`.
