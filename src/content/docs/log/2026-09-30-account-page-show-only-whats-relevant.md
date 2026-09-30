---
title: 'Making a Drupal account page show only what’s relevant'
description: 'Replaced always-on headings with sections that appear only when they have something to show, made their wording deployable config, and safely retired an old content block — with 79 automated checks behind it.'
date: 2026-09-30
time: 3h 30m
gdoc: https://docs.google.com/document/d/1AQoCVCe5q73uKRTX9HLllHoSIH2VRqywg_bJTf6kLDA/edit
tags: [drupal, claude-code, testing, caching, config-management, git]
cover: ../../../assets/covers/2026-09-30-account-page-show-only-whats-relevant.svg
coverAlt: 'A member account page with three sections that each appear only under a condition, old heading fields hidden but left untouched, a test panel showing 79 checks passing, and a database transaction that tries a deletion and rolls it back.'
ksbs:
  - code: K4
    why: "Made every change reversible and tried the risky one first: the old fields are hidden per page render with their settings untouched, so switching my sections off brings them straight back, and I rehearsed deleting the welcome block inside a database transaction and rolled it back before writing the real update."
  - code: K14
    why: "Wrote 79 automated checks across three layers — 41 server-side, 23 HTTP requests as real logged-in users, and 15 for the new messaging. The first run had 5 failures (1 real bug, 4 test mistakes), a later run found a second real bug, and all now pass."
  - code: K15
    why: "Split the work deliberately: the AI coding assistant did most of the investigating and code writing, while I made the decisions — including the rule not to edit another developer's fields — and reviewed and tested what it produced."
  - code: K18
    why: "Built access control into the page itself: the details section counts only what the viewer is allowed to see (a staff account had exposed an empty heading), headings are plain text so they can't carry HTML, and Drupal's lock on text formats a user can't use stayed in place."
  - code: K25
    why: "Checked the approach against current Drupal 11 practice before writing code — object-oriented hooks with PHP attributes, `#config_target` on config forms, config schema and cache metadata — so nothing new uses deprecated APIs; testing also taught me the Drupal 10.3 rule that translatable config must declare a language code."
  - code: S2
    why: "Kept testing from reaching real systems or data: test scripts set the existing inbound-sync flag so no test data was sent to our CRM, and member details only ever show to viewers entitled to see them."
  - code: S12
    why: "Iterated from what testing showed: fixed the staff-visibility bug, removed a double render the tests exposed (the old field was being built and thrown away on every page), and switched headings to plain text so they always show exactly as typed."
  - code: S28
    why: "Documented the change for review and handover: documentation, a commit message, a pull request description and an acceptance checklist for a colleague, plus a byte-for-byte check of the welcome block's backup before an update function deletes it."
---

This follows on from last week's
[rework of the same account page](/log/2026-09-24-member-account-page-rework-with-ai/).
That work reorganised the memberships table; this time the problem was the
headings and help text around it. Some always showed, even with nothing under
them — a "Your details" heading appeared for members with no details on
record. The text also came from "markup" fields bolted onto the user entity,
a clumsy way to manage page copy, and a separate welcome panel was a custom
block whose text is stored as content, so it didn't travel between
environments with our deployments.

I worked through it with an AI coding assistant (Claude Code) in my editor.
I made the decisions and reviewed and tested the results; the assistant did
most of the investigating and code writing.

## What I did

1. **Analysed the current setup** — the user entity's fields and display
   settings, the theme template, and the custom module that already
   arranged the page. There were four markup fields acting as headings, one
   of which wasn't even displaying.
2. **Checked ownership before changing anything.** `git log` and
   `git blame` showed the markup fields had been created by another
   developer, so I set a rule: don't edit or delete their work, build around
   it. The custom module was mine, so new code went there.
3. **Chose an approach.** Each "heading field" became a *pseudo-field*: a
   piece of the page that builds its heading, content and help text
   together, and returns nothing when there's nothing to show. The wording
   is editable on a small settings form and stored as configuration, so it
   deploys with the code.
4. **Built three sections:**
   - **Your details** — heading, details and help text, shown only when the
     member has details the viewer is allowed to see.
   - **Set password** — a heading shown only when the edit form has a
     password field.
   - **Additional member messaging** — a Full HTML text area, shown only on
     pages of users with the member role.
5. **Hid the old fields without touching them**, using Drupal's display
   alter hooks to remove them for each render only. Their saved settings are
   unchanged, so switching my sections off brings them straight back.
6. **Retired the welcome block safely.** Backed up its HTML, removed it from
   the template, commented out its styles and recompiled the CSS, then wrote
   a one-off update function that deletes it on every environment during
   deployment.
7. **Tested it, then documented it** — 79 automated checks, then
   documentation, a commit message, a pull request description and an
   acceptance checklist for a colleague.

**By the numbers:** 3 new sections; 4 old fields and 1 display left
untouched but hidden; 79 checks (41 server-side, 23 HTTP as logged-in users,
15 for the messaging); 5 failures on the first run, of which 1 was a real
bug, and a second real bug on a later run — both fixed; 0 coding-standard
errors and 0 deprecation notices; about 11 lines of config added, and no
existing config lines changed.

## Problems and how I solved them

- **Most of the page belonged to another developer** — so new behaviour is
  layered on top with hooks instead of editing their fields or config.
- **The settings form wouldn't save.** Since Drupal 10.3, configuration
  containing translatable text must declare a language code. Adding it
  fixed the form.
- **The help text seemed not to save in a test.** The test ran as an
  anonymous user, and Drupal deliberately locks text formats a user isn't
  allowed to use. Re-running as an administrator showed the form worked.
- **Staff could see a heading with nothing under it**, found by testing
  with a staff account. The section now counts only details the viewer is
  allowed to see.
- **Member details were built twice per page.** A "recursive rendering"
  error revealed the old field was still being built and thrown away.
  Switching to display alter hooks means it's never built at all.
- **Deleting a content block could affect the page builder.** I trialled
  the deletion inside a database transaction, rolled it back, and checked
  how an older, already-deleted block behaved: no config changes, and only a
  harmless warning the site already produces.
- **Saving test data would sync to our CRM**, so test scripts used the
  existing inbound-sync flag and nothing was sent out.
- **Awkward local testing issues** — a command argument that meant
  something other than I expected, a session-limit module blocking second
  logins, and line endings changing when copying output. Each was caught by
  checking results rather than assuming.

## What I learned

- **Run `git blame` before editing.** It shows who owns what — though
  "created by" isn't always "written by": I had edited the wording of those
  fields myself.
- **Drupal splits config from content.** Config deploys with the code;
  content, like custom blocks, doesn't. That decides where editable text
  should live.
- **Pseudo-fields and display alter hooks** change a page without touching
  anyone else's configuration.
- **Caching needs deliberate thought.** Cache tags and access results decide
  whether a change shows immediately, and whether each viewer sees the right
  version.
- **Tests find what reading the code doesn't**: the staff-visibility bug,
  the double rendering and the config language rule all surfaced in testing.
- **A rolled-back transaction is a safe rehearsal** for a destructive
  action — you see exactly what it would do, then undo it.

## Reflection

The most valuable habits today were defensive ones: checking who owned the
code before touching it, making every change reversible, and rehearsing the
one irreversible step. Working with the AI assistant made the investigation
and code fast, but the bugs that mattered were found by testing as
different kinds of user — which is exactly the part I'd start earlier next
time. I'd also check ownership at the very start of planning rather than
partway through, look at the finished page in a real browser and on a phone
sooner instead of only checking the HTML, and keep temporary debugging
markers out of shared files so they can't slip into a commit.

## Next steps

- Set up proper automated tests (PHPUnit) in the project, so these checks
  can be rerun by anyone and in CI instead of living in throwaway scripts.
- Test with every relevant user type — member, staff and administrator —
  from the first run.
- Review the finished page visually on desktop and phone before handing it
  over.
