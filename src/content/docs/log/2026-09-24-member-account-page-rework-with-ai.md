---
title: 'Prompting an AI coding agent through a real Drupal rework'
description: 'Refined a structured prompt with Claude Code over three drafts, then used it to rework the member account page on our Drupal site: tested, reversible, kept apart from an agency’s code, and responsive on phones.'
date: 2026-09-24
time: 2h 20m
gdoc: https://docs.google.com/document/d/1bmzdW_t_PiI0vxX3XpVARMN-8ttjPbNFwnvshWepF68/edit
tags: [prompting, claude-code, drupal, testing, accessibility, responsive-design]
cover: ../../../assets/covers/2026-09-24-member-account-page-rework-with-ai.svg
coverAlt: 'A prompt going through three drafts, each closing questions the AI raised, feeding a member account page that shows a memberships table on desktop and the same memberships as cards on a phone, with a checklist of tests that passed.'
ksbs:
  - code: S8
    why: "Wrote a Context / Objective / Audience / Constraints / Task prompt and refined it over three drafts, asking the AI to critique each one before any work began. Each draft closed gaps it found: move or copy, what counts as reversible, who sees the button, and where the documentation goes."
  - code: K15
    why: "Kept the decisions with me: the AI asked before anything outward-facing, and when its safety check blocked it from discarding local changes, it stopped and gave me the exact commands to run myself instead of finding a way round."
  - code: K23
    why: "Didn't take the AI’s reports at face value. A “verify everything again” pass found two real problems it had missed, and when a test summary said it had “found” a name containing `<script>`, I questioned it. It turned out to be a test string it had created, reported misleadingly."
  - code: K14
    why: "Tested across a matrix of cases, not one happy path: household, individual and no-subscription members, a staff view, anonymous access (403), a replayed form token, HTML injection in a group name, switching hidden sections back on, uninstalling the module, and phone, tablet and desktop widths."
  - code: S1
    why: "When a test email reached a real colleague, I made a lasting fix rather than just being more careful: every email from my local site now reroutes to me. I also had user-typed group names tested to confirm they’re shown as text, never run as code."
  - code: K11
    why: "Replaced a table that phone users had to scroll sideways with a card per membership below 992px wide, and added ARIA roles so screen readers still read the cards as a table once the CSS changes its layout."
  - code: S12
    why: "Iterated from feedback throughout: separated the work from the agency’s code after I raised it, restyled buttons, added the group name, then the mobile cards, and fixed the spacing and README gaps that verification turned up."
  - code: S28
    why: "Documented it so it can be undone: a README that explains how each part works and how to switch every hidden section back on, a line-by-line `git blame` check that no agency code changed, and descriptive commit messages."
---

At work I look after parts of our membership website, built in Drupal.
Today I reworked what a logged-in member sees on their account page, using
Claude Code (an AI coding agent) from start to finish. The interesting part
wasn't the code. It was how much of the outcome depended on the prompt I
started with, and on questioning the AI's work as it went.

## What I did

- **Recovered the context first.** I asked the agent to recall earlier
  work on the page. It had no saved notes, so it rebuilt the history from
  git and the code, and I had it save a memory note so the next session
  wouldn't start cold.
- **Wrote the prompt, then had it critiqued before any work began.** I
  used the same structure as my
  [earlier prompt template](/log/2026-09-22-prompt-template-and-deploying-this-site/):
  Context, Objective, Audience, Constraints, Task. I asked the agent what it
  thought *before* it did anything. That produced three drafts:
  - **Draft 1** raised a technical catch I hadn't known about: the table's
    "Request to Cancel" buttons only worked inside the Preferences form, so
    the table couldn't simply be moved. It also found gaps: move or copy?
    Keep the membership number lines? Who should see the "Manage household
    members" button? How should "reversible" actually work? Where should
    the documentation go?
  - **Draft 2** answered most of those. It left open where the
    documentation should go, whether the removed lines needed to be
    reversible, and whether there was a ticket.
  - **Draft 3** closed everything: move the table, remove the number
    lines, hide two sections in a way that could be switched back on
    without code, a Markdown README in the module, no ticket.
- **Did the work, then redid it properly.** The first version worked, but
  when I asked whether it had changed code written by the external agency
  that also works on the site, a line-by-line `git blame` showed it had
  edited about 40 of their lines. I need my work kept clearly separate, so
  it was rebuilt as a new module of my own, layered on top with Drupal
  hooks. The final diff touches none of their code.
- **Kept building from there.** In the same session:
  - restyled two links as small grey buttons matching the table's buttons
  - moved the "Manage household members" button
  - showed a group membership's group name, taken from the membership
    record once it has synced with the CRM, and from the checkout order
    until then
  - added 1rem of space above a help line
- **Replaced sideways scrolling on phones with cards.** The table had a
  fixed 860px minimum width, so on a phone members had to swipe to find the
  buttons. Below 992px each membership now shows as a card. The same HTML is
  used on every device: the PHP puts each column heading on its cell as a
  `data-label` attribute, and CSS switches the table to block layout and
  writes those labels in with `::before`.
- **Asked for a full re-verification before committing.** It found two real
  problems the earlier testing had missed:
  - On phones the table was stretching the whole page, not scrolling.
  - The README didn't say that uninstalling the new module also brings back
    the hidden sections.

  Both were fixed, and I then had the work committed as two logically
  separate commits and pushed.

## What I learned

- **Asking the AI to critique the prompt was the best step of the
  day.** Its questions weren't padding. "Move or copy?" and "reversible how?"
  changed what got built. Three short drafts cost far less than building
  the wrong thing.
- **"Reversible" has to be designed, not hoped for.** Hiding the sections
  in Drupal's Manage display means they can be switched back on without
  code. The removed text lines can only come back from git, so I documented
  both routes.
- **Local testing can still reach real people.** One test "Request to
  Cancel" sent a real email to a colleague, because local mail went out
  through a real mail service and colleague addresses were allowed through.
  The fix was structural: every local email is now rerouted to me.
- **AI summaries need the same scrutiny as AI code.** A results table said
  it had "found" a name containing `<script>`. It hadn't found anything: it
  had created that name as a security test. The testing was sound, but the
  wording would have misled anyone reading it later.
- **Other people's code deserves a boundary.** `git blame` makes that
  boundary checkable line by line, and layering my changes on with hooks
  kept the agency's code exactly as they wrote it.

## Reflection

What made the difference today was treating the AI as a capable
collaborator whose work still needed checking, not as an oracle. My most
useful contributions weren't technical. They were questions: "What do you
think before you start?", "Did you change anyone else's code?", "Verify
everything again", "You *found* that?". Each one caught something that would
otherwise have shipped. Next time I'll put the separation rule and the
verification step into the first prompt, instead of adding them halfway
through.
