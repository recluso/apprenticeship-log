---
title: 'Turning a security-update workflow into a reusable Claude Code skill'
description: 'Patched a real set of Drupal vulnerabilities on a live client site, then captured the process as a saved skill so it can be triggered the same way next time.'
date: 2026-09-23
time: 2h 30m
gdoc: https://docs.google.com/document/d/1_jGcBYBfObdH6_iShq4yeQukqaMaEwfvYn1JQfSogmc/edit
tags: [drupal, security, composer, automation, claude-code]
cover: ../../../assets/covers/2026-09-23-drupal-security-check-skill.svg
coverAlt: 'A terminal showing composer audit going from 12 vulnerabilities to 0, a green shield with a tick, and a saved skill card listing the steps: audit, branch, dry-run, update, verify.'
ksbs:
  - code: K14
    why: "Ran `composer update --dry-run` before changing anything, then re-ran the audit afterwards to confirm zero vulnerabilities remained, rather than trusting that version numbers had moved."
  - code: K15
    why: "Built human checkpoints into the automated skill: it stops before pushing further than asked, and overwriting the local credentials file was treated as a decision for me, not a default."
  - code: K18
    why: "Audited every installed package against its locked version, found 12 exploitable vulnerabilities across 7 packages and fixed them, carrying each advisory's severity through so critical issues weren't lost among minor ones."
  - code: K23
    why: "When the dry run proposed removing an unused package, I searched the custom code before accepting it rather than assuming Composer knew everything — a small guard against over-trusting automated suggestions."
  - code: S1
    why: "Fixed a stale credential for a private repository by issuing a fresh token from an already-authenticated session rather than guessing at the old one, and asked before overwriting the credentials file."
  - code: S6
    why: "Mapped the manual workflow — find vulnerabilities, branch, dry-run, fix, verify, commit, stop — and separated general principles from repo-specific steps before turning it into a reusable skill."
  - code: S7
    why: "Configured automation tools to do the work next time: a saved Claude Code skill, and a scheduled watch that checked for the pending release infrequently at first and more often once the release window opened."
  - code: S12
    why: "Improved the skill from feedback: when asked whether it covered the periodic release check, I found the gap and added it; I also traced a surprising config change to confirm it was cosmetic before committing."
---

## What I did

- Started the day checking whether a rumoured "critical Drupal security
  update" was real. It was — Drupal's security team had posted a
  pre-announcement (a PSA) warning of a critical contributed-module release
  later that day, deliberately withholding which module until the release
  window opened.
- While waiting on that, ran a proper audit of the actual client codebase:
  `composer audit` against every installed package, cross-referenced against
  the exact locked versions in `composer.lock`. Found 12 real, currently
  exploitable vulnerabilities across 7 packages — Drupal core itself plus six
  contributed modules and libraries.
- Created a branch following the repo's existing naming convention (checked
  past branches first rather than inventing a new pattern), then did a
  `composer update --dry-run` before touching anything for real — Composer
  can simulate the entire dependency resolution without changing a single
  file, so there's no reason to skip that step even under time pressure.
- Hit a real blocker mid-dry-run: the project depends on several private
  GitHub repos, and the stored credential for one had gone stale. Fixed it by
  minting a fresh token from an already-authenticated `gh` CLI session rather
  than guessing at the old one — but asked before overwriting the local
  credentials file, since that's the kind of thing that should be a decision,
  not a default.
- Ran the update for real, then had to trace one larger-than-expected config
  diff by hand — a module update had re-serialised an array from
  key-value pairs into a plain list. Looked alarming in the diff, but reading
  where the field was actually consumed in code (`in_array()`, which doesn't
  care about key structure) confirmed it was cosmetic, not a behaviour
  change. Re-ran the audit afterwards to confirm zero vulnerabilities
  remained, not just that version numbers had moved.
- Set up a background watch for the still-pending PSA using a scheduling
  tool that checks in on its own — infrequently while the release window was
  still hours away, more often once it opened — so I didn't have to remember
  to keep checking manually.
- Then went a level up: turned the whole process into a saved Claude Code
  skill (`drupal-security-check`) in the client project's own repo, so the
  same workflow — find vulnerabilities, branch, dry-run, fix, verify, commit,
  stop before pushing further than asked — triggers automatically next time
  instead of being reconstructed from scratch.

## What I learned

- **A vulnerability scanner's "failure" isn't always a failure.**
  `composer audit` exits with a nonzero status the moment it *finds*
  anything, which looks identical to a broken command until you actually
  read the output. Worth checking what a tool's exit code means before
  assuming red text is a bug.
- **Automated dependency removal deserves a second look, not blind trust.**
  When the dry run proposed dropping an unused package, I grepped the
  custom code first rather than assuming Composer's dependency graph knew
  everything about how the code was actually used. It was fine — but
  confirming took seconds, and the alternative (a silent breakage weeks
  later) would have cost a lot more to trace back.
- **Severity labels are load-bearing, not decoration.** Drupal ranks
  advisories on a five-tier scale and third-party libraries use a separate
  low/medium/high/critical scale; if you flatten every finding into one
  undifferentiated list, a genuinely critical issue can get lost among
  several minor ones. Carrying the severity through into the report and the
  commit message turned out to matter more than I expected going in.
- **A process worth doing twice is worth writing down once.** The
  instinct to just "get it done" and move on would have left this whole
  workflow living only in one afternoon's memory. Writing it as a skill
  forced me to notice which parts were actually general principles (verify
  before trusting automation, keep scope narrow, stop before the
  higher-stakes step) versus which parts were specific to this one repo.

## Reflection

The most useful moment wasn't the fix itself — it was being asked, partway
through, "does the skill include the periodic check for the release?" It
didn't, and I'd have shipped it without that gap if I hadn't been asked
directly. That's a good habit to borrow: after writing something down as a
reusable process, go back over what actually happened today and check for
anything that got done in the moment but didn't make it into the write-up.
The gap between "what I did" and "what I documented" is exactly where a
skill quietly stops being reusable.
