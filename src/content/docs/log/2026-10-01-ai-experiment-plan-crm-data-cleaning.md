---
title: 'Planning a controlled test of AI-assisted data cleaning'
description: 'Wrote a workplace experiment plan and a 60-second pitch for testing AI-written cleaning rules on fictional CRM data, as the first step towards a repeatable routine for maintaining our datasets.'
date: 2026-10-01
time: 45m
activityType: TCG Set Tasks
gdoc: https://docs.google.com/document/d/1ePDL58_UnEWzDqcnb3Ggj-LEsLYBrtRNxfZsGhF2vTg/edit
tags: [data-cleaning, crm, experiment-design, data-protection, prompting]
cover: ../../../assets/covers/2026-10-01-ai-experiment-plan-crm-data-cleaning.svg
coverAlt: 'Two 50-record fictional datasets, A cleaned by hand and B cleaned with AI, each scored against an answer key, beside the success targets, above a five-stage route from fictional data to the live CRM and a repeatable routine for about 70,000 membership records.'
ksbs:
  - code: K4
    why: "Planned the work as a small pilot with a staged route to scale: 50 fictional records first, then a larger fictional set, real data run locally, a sandbox CRM and only then the live CRM, with each stage needing the last to succeed and its own approval."
  - code: K13
    why: "Designed the test to judge viability with test data: two fictional datasets with planted problems and an answer key, so accuracy can be scored rather than guessed, plus a check that the unchanged script still works on the second dataset."
  - code: K14
    why: "Set up a fair comparison: a manual baseline in a spreadsheet against the AI-supported method, using two equivalent datasets (A and B) to reduce any learning effect, with measures for time, issues found, false flags, human corrections and prompt revisions."
  - code: K15
    why: "Wrote down where people stay in control: I review every rule and the whole script before running it, a second reviewer samples the low-risk changes and reads every flag, and a person approves every possible duplicate. The AI suggests, but never decides."
  - code: K2
    why: "Kept personal data out of the AI tool: the real export is used only by me, on my own machine, to copy column headings and problem types. Using real membership data with AI is listed as a separate step needing data protection sign-off."
  - code: K18
    why: "Worked out the governance for writing cleaned data back to Dynamics: update by record ID in logged batches with a backup and auditing, merge duplicates with Dynamics' Merge rather than deleting them, check what flows an update triggers, and keep CRM credentials off personal laptops."
  - code: S3
    why: "Assessed whether the work is worth automating: at the manual test's pace, cleaning the roughly 70,000-record membership dataset by hand would take over 1,000 hours and need repeating, while a checked script reruns at almost no cost."
  - code: S15
    why: "Based the pitch on evidence from my earlier profiling (about 60% of columns empty or single-value, over 550 likely duplicate groups, 27 spellings of the country) and gave measurable success targets: at least 90% found, no more than 5% false flags and 30% less time."
---

This is a TCG set task: plan a small, controlled test of an AI opportunity
at work and pitch it in 60 seconds. It's a plan, not permission to bring in
a tool or use live data. Nothing has been run yet.

I chose AI-assisted data cleaning, following on from
[profiling our CRM's organisation data](/log/2026-09-24-crm-data-cleaning-and-prompting/).
The aim isn't a one-off tidy-up. It's an accurate, efficient and repeatable
routine for maintaining Cycling UK's datasets. The largest of these is
membership, which stays at about 70,000 records.

I worked through the brief with an AI assistant (Claude Code), which
drafted the plan from my notes while I made the decisions.

:::note[Experiment plan]
The full plan and pitch is available as a Markdown file:
<a href="/downloads/2026-10-01-ai-experiment-plan-and-pitch.md" download>AI Workplace Experiment Plan and Proposal Pitch</a>
(10 KB).
:::

## What I did

- **Worked out what the task asks for:** a test plan that defines success
  as numbers, shows where people review the AI's work and says when to stop.
- **Wrote the experiment plan**, answering the brief's ten statements:
  - **Test:** whether AI can speed up the *standardise* and *flag* stages
    of cleaning. The AI gets a column profile, proposes rules and writes a
    Python script that I run locally. It never edits or deletes data
    itself.
  - **Data:** two fictional datasets of **50 records** each, A and B. A
    script generates them with the CRM's column layout and plants the
    problems I found when profiling: country spellings, the text "NULL"
    instead of blanks, duplicates, test records and impossible years.
    Because I plant the problems, I know every right answer.
  - **Comparison:** dataset A cleaned by hand in a spreadsheet, and dataset
    B cleaned with AI support.
  - **Success:** at least 90% of planted problems found, no more than 5%
    false flags, at least 30% less time including review, no record merged
    or deleted without a person's approval, and no personal data entering
    the AI tool.
  - **Repeatability:** the finished script runs unchanged on dataset A and
    must still find at least 90% of problems.
  - **Stop if:** real data appears in the AI tool, the output deletes
    records or changes IDs, accuracy stays worse after two prompt
    revisions, the tool's approval is unclear, or the test passes about
    3 hours.
- **Cut the dataset from 200 records to 50.** The manual method has to be
  done by hand too, and 200 was too many for a short test.
- **Mapped the route to the full data** in five stages, each needing its
  own approval: this test, a larger fictional test, real data run locally,
  a sandbox CRM, then the live CRM in logged batches.
- **Drafted the 60-second pitch** for Slack:

> I propose testing AI to support cleaning our CRM organisation records
> because profiling showed that about 60% of the columns are empty or hold
> a single value, with over 550 likely duplicate groups and 27 spellings of
> the country. The expected business value is a repeatable routine for
> maintaining all our datasets, the largest being membership at about
> 70,000 records. The main risk is AI making confident mistakes or personal
> data reaching an unapproved tool, which I'd control with fictional test
> data, AI-written code that runs locally, and a person approving every
> merge or deletion. A human remains responsible for approving every change
> and any decision to go near the live CRM. My next step is sign-off from my
> manager and the CRM data owner.

## What I learned

### A test needs an answer key

Planting the problems in fictional data means accuracy can be measured, not
judged by eye. Without an answer key, "the AI did well" is just an opinion.
Fictional data also takes the data protection risk out of the test.

### Scale changes what's being tested

At 50 records, the manual method may only just lose, because writing
prompts takes time. The real question is whether AI helps write *correct,
reusable rules*. A checked script runs on 70,000 records as easily as on
50. The work that grows with the data is human review, especially of
possible duplicates, so that's what to plan for when scaling up.

### "Repeatable" needs its own measure

Accuracy on the dataset the rules were written for doesn't prove they'll
work on next month's data. Running the unchanged script on the second
dataset is a cheap way to check.

## Notes for later: from cleaned file back to the CRM

After writing the plan I asked how the whole process would work in
practice. These are the answers, kept here so I don't forget them.

### How AI can help clean data without seeing it

The AI doesn't clean the data. It writes the *instructions* for cleaning
it, and those run on my own machine.

1. **The AI gets the shape of the data, not the contents:** column names,
   a description of the problems, and a few made-up example rows.
2. **The AI writes code**, e.g. "replace UK, U.K. and GB with *United
   Kingdom*", "turn `NULL` into a real blank", "flag years after this
   year".
3. **I read the code** and test it on fictional data with an answer key.
4. **I run it locally on the real file.** It writes a cleaned copy and a
   list of flags. Nothing goes back to the AI.
5. **People review the flags**, especially possible duplicates.

Watch out for:
- **Decisions that need real values:** whether two similar records are the
  same person needs someone to look at the actual records, or an AI tool
  approved for personal data.
- **Leaks back to the AI:** don't paste error messages or "top values"
  lists that contain real rows into an AI chat.
- **Wrong rules:** the AI might read "NI" as Nigeria rather than Northern
  Ireland, which is why the code gets reviewed.

### How cleaned data goes back into Dynamics

**Update the existing records by their ID. Never import the cleaned rows as
new records**, or every record ends up in the CRM twice. The update file
holds the record ID plus only the columns that changed. Check how the
method treats blank cells: in some methods a blank means "leave alone", in
others it wipes the value.

| Method | Good for |
| --- | --- |
| Export to Excel, edit, Import from Excel | Small to medium batches. The export's hidden ID columns make the import update existing records. |
| Data Import Wizard (CSV) | Larger batches, mapped on the ID or an alternate key. |
| Bulk edit in the CRM screens | A few hundred records with the same fix. |
| Dataflows / Power Automate | Repeatable, scheduled updates. |
| Dataverse API script or admin tools (e.g. XrmToolBox) | Large volumes with full logging, usually run by the CRM team. |

**Duplicates use Dynamics' Merge, never deletion.** Merge moves linked
records (memberships, payments, activities) onto the master record.
Deleting a duplicate can lose that history.

How a careful team does it:

1. Back up the affected records first.
2. Try it in a sandbox if there is one.
3. **Check what an update triggers.** Updates can fire Power Automate
   flows, email syncs or member emails. Updating 70,000 records without
   checking could email 70,000 people.
4. Run a small batch (50–100 records) and check it in the CRM.
5. Work in logged batches, with auditing on and my own change log.
6. Stop it happening again: dropdowns instead of free text, duplicate
   detection rules, and fixes to integrations that write bad data.

My part is to prepare and check the update file, change log, duplicates
list and rules. The CRM team chooses the method and applies the changes.

### Could a local script update the CRM directly?

Technically yes, through the Dataverse Web API with an app registered by
IT. But it isn't done from a personal laptop:
- a key that can change CRM data shouldn't live on a laptop
- a routine that writes to live data needs an owner, logging and support
- joining cleaning and updating into one step removes human review
- the CRM team needs to know when updates happen, because of side effects

A repeatable routine usually develops in stages:

| Stage | How it works | Who applies changes |
| --- | --- | --- |
| 1. Manual handover (where I am now) | The script runs locally and produces an update file, change log and duplicates list | The CRM team, after review |
| 2. Approved semi-automation | The same checked script, plus a sign-off step before a standard import | The CRM team, with less effort |
| 3. Server-side routine | The logic moves into Power Automate, a dataflow or an Azure Function, on a schedule, under a service account IT controls | The system, for low-risk fixes only |
| 4. Prevention | Fixes become rules inside the CRM, so bad data stops getting in | Nobody, because there's nothing to fix |

The goal for membership data isn't cleaning 70,000 records every month.
It's cleaning once, then catching the small amount of new bad data
automatically and sending only the hard cases to a person. Low-risk fixes
can eventually be automated. Merges and deletions always need a person.

## Reflection

The useful part was being made to define success before starting:
specific numbers, a baseline and stop conditions. It also brought data
protection back to the surface. My real export sits on my own machine, and
the plan has to say clearly that it only informs the fictional data and
never goes into an AI tool. The test plan is aimed at organisation records,
but my real goal is membership data about individuals. I need to decide
whether the fictional data should look like membership records instead.

## Next steps

- Get sign-off from my manager, the CRM data owner and the data protection
  lead.
- Post the pitch in Slack and reply to at least one other learner.
- Decide whether the fictional data should copy organisation or membership
  records.
- Confirm that the earlier profiling only shared summaries, not real
  records, with any AI tool.
- For the next session: bring the CRM Account table as my dataset, and
  blanks stored as the text "NULL" as my data-quality problem.
