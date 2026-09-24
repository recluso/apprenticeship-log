---
title: 'First steps in cleaning CRM data, and prompting AI to help'
description: 'Profiled a real CRM export to see what messy business data actually looks like, mapped out a safe cleaning workflow, and built a reusable prompt template for each stage.'
date: 2026-09-24
time: 2h 30m
gdoc: https://docs.google.com/document/d/1szV54ahef4gjkzEPxBPG6lmfnUGEaquPkRgLJgom2gk/edit
tags: [data-cleaning, crm, dynamics-365, prompting, data-protection]
cover: ../../../assets/covers/2026-09-24-crm-data-cleaning-and-prompting.svg
coverAlt: 'A profile of a CRM export showing 339 columns of which 137 are empty and about 76 hold one value, a seven-part prompt template, and a seven-step cleaning workflow from purpose to documentation with AI proposing and a person approving.'
ksbs:
  - code: K2
    why: "Data protection shaped the whole plan: the export holds real names, emails and addresses, so it must not be pasted into an AI chat, only organisation-approved tools with the right data agreement should see it, and the AI and data protection policy needs checking first."
  - code: K4
    why: "Planned the work as incremental change: analyse a copy of the export, agree the rules with the data owner, test fixes in a sandbox, then apply them to the live CRM in logged batches."
  - code: K15
    why: "Set out how people and AI share the work — AI proposes, a person approves, a controlled process applies, AI verifies — with more human control as the risk rises (from trimming spaces up to merging records)."
  - code: S2
    why: "Chose to share only a column profile and a small anonymised sample with AI, and to have the AI write code that runs locally, so confidential CRM data never leaves the organisation."
  - code: S3
    why: "Assessed how ready the data is for automation: about 60% of the 339 columns are empty or hold one value, there are over 550 duplicate groups, test records and inconsistent formats — all of which would undermine any automation built on top."
  - code: S8
    why: "Built a seven-part prompt template (role, context, input, task, rules, output format, check) with one prompt per cleaning stage, placeholders for reuse on other tables, and a check step that asks the AI to list its assumptions rather than guess."
  - code: S21
    why: "Profiled a real 8,600-record CRM export, measuring how full each column is and finding duplicates, invalid records and formatting problems, and planned the preparation steps: reduce, filter, standardise, validate and de-duplicate."
  - code: S28
    why: "Planned the documentation that makes the cleaning auditable: a data dictionary, a change log recording each change's record, column, old value, new value and rule, and a green/amber/red risk rating for every type of change."
---

This is the first step in a longer piece of work: understanding what's
wrong with our CRM's organisation data, how it should be cleaned, and how
AI can help without being trusted blindly. Nothing has been changed in the
live CRM yet — that comes much later, and only through the right people.

:::note[Study guide]
The full write-up — findings, workflow, risk tiers and every prompt
template — is available as a PDF:
<a href="/downloads/2026-09-24-crm-account-data-cleaning-study-guide.pdf" download>CRM Account Data Cleaning – Study Guide</a>
(10 pages, 396 KB).
:::

## What I did

- Took an export of the Account (organisation) table from our Microsoft
  Dynamics 365 CRM — about 8,600 records across 339 columns — and
  profiled it: how full each column is, how many distinct values it
  holds, and where the obvious problems are.
- Found that the file is structurally sound (every row parses cleanly) but
  the content isn't:
  - roughly 60% of the columns are either completely empty (137) or hold
    the same value on every row (about 76), leaving 40–60 columns of real
    information;
  - around 1.9 million blank cells are stored as the literal text `NULL`,
    so a spreadsheet counts them as filled;
  - over 550 groups of likely duplicates once case, spacing and
    punctuation are ignored;
  - job titles and test records saved as if they were organisations;
  - 27 different spellings of the country (including "Untied Kingdom"),
    shortened postcodes, ALL-CAPS names, garbled characters from encoding
    errors, and founding years such as 3000 and 0.
- Wrote the findings up as a study guide covering the cleaning workflow,
  where the cleaning should actually happen, what AI can and can't safely
  do, and a prompt template for each stage.

## What I learned

### Cleaning has a fixed order

1. **Define the purpose** — what question must the clean data answer?
   That decides which columns survive.
2. **Reduce** — drop empty and single-value columns, turn `NULL` into real
   blanks.
3. **Filter** — set aside test, merged and inactive records.
4. **Standardise** — spaces, letter case, countries, postcodes, encoding.
5. **Validate** — check URLs, years and numbers against plausible ranges.
6. **De-duplicate** — last, because matching only works on standardised
   values.
7. **Document** — a data dictionary and a change log.

Two rules apply throughout: **never overwrite the original file**, and
**flag before you delete**.

### Analyse on an export, fix in the CRM

The CRM is the source of truth, so a tidy spreadsheet on my laptop helps
nobody else. The professional route is: export and profile → agree the
rules with the data owner → fix in a sandbox, then in the live CRM in
logged batches → prevent it happening again (dropdowns instead of free
text, duplicate detection rules, and fixing the integrations that keep
writing bad records). One point stood out: never de-duplicate in a
spreadsheet and re-import — deleting a record outside Dynamics' own Merge
loses everything linked to it.

It also matters to say which kind of cleaning you're doing: **cleaning the
source** fixes the CRM for everyone; **cleaning for analysis** makes a tidy
copy for one report and leaves the CRM alone.

### AI proposes, a person approves

AI is genuinely good at most of this — profiling, drafting rules, and
judgement calls like "is `F` a country code for France?" — but the pattern
is **AI proposes → person approves → controlled process applies → AI
verifies**. How much control depends on the risk:

- **Green** (trimming spaces, fixing case): automate after checking a sample.
- **Amber** (deactivating test records, correcting websites): skim the list,
  apply in batches.
- **Red** (merging, deleting): a person approves every single group.

A person stays involved because AI makes confident mistakes (two similarly
named clubs might be one organisation or two), because the data is
personal, and because someone has to own each decision. That also means
**not pasting the full export into an AI chat**: instead, give it the column
profile plus a small anonymised sample, ask it for *code* rather than
cleaned data, and run that code locally.

### A prompt template with seven parts

```md
## Role     — who the AI should act as
## Context  — why the work matters and who uses it
## Input    — exactly what it's given (profile + anonymised sample)
## Task     — one clear job per prompt
## Rules    — e.g. "Flag, never delete. Keep the record ID unchanged."
## Output   — a checkable table: rule, column, before, after, risk
## Check    — list assumptions; ask rather than guess
```

The first three stay the same across every prompt; the rest change per
stage. Placeholders like `{{DATASET_NAME}}` mean the same template will
work on the Contacts table next. Chaining prompts — pasting the approved
output of one stage into the next — and saving every prompt and response
doubles as evidence of method.

## Reflection

The biggest surprise was how much mess is invisible: a file that opens
without a single error can still be 60% noise. The second was that the
professional answer isn't "clean it with AI" — it's a governed process
where AI speeds up the analysis and a person owns the decisions. I'm
unlikely to have write access to the live CRM, and that's fine: cleaning
the export, documenting the rules and recommending fixes to the CRM team
is the correct first step.

## Next steps

- Agree two or three business questions with my manager, so "clean"
  means something specific.
- Check the organisation's AI and data protection policy, and which AI
  tools are approved for CRM data.
- Run the reduce and filter stages on a copy of the export using Python
  and pandas, with flag columns and a change log.
- Take a list of questions to the CRM team — is there a sandbox, are
  duplicate detection rules switched on, and which fields are still in use?
