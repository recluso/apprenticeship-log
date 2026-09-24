---
title: 'Example: log template'
description: 'A worked example of a learning-log entry showing every field and section — copy it when starting a new entry.'
date: 2026-09-24
time: 2h 30m
tags: [template, example]
cover: ../../assets/covers/log-template.svg
coverAlt: 'A diagram of a log entry page with each part labelled: date and time badges, title, KSB badges, cover image, content sections, and KSB explanations at the end.'
ksbs:
  - code: K2
    why: "Example: name the specific law or policy you applied and how — e.g. *kept personal data out of the AI tool by sharing only an anonymised 30-row sample*."
  - code: S8
    why: "Example: say what you actually did — e.g. *wrote a prompt with role, context and rules, tested it on sample data, then tightened the rules after it guessed a value*."
  - code: B6
    why: "Example: show the behaviour in action — e.g. *tried a new AI feature on a copy of the data first, before using it on anything live*."
---

:::tip[This is a template]
This page shows what a complete learning-log entry looks like, with every
feature switched on. It isn't a real entry, so it doesn't count towards the
[off-the-job log](/otj-log/) or the [KSB tracker](/ksbs/). To start a new
entry, copy the [source](#source-to-copy) at the bottom into
`src/content/docs/log/YYYY-MM-DD-short-title.md`.
:::

:::note[Attached files]
Link to any supporting file stored in `public/downloads/`, such as a study
guide or slides, in a box like this near the top. Adding the `download`
attribute to the link makes browsers save the file instead of opening it.
:::

## What I did

- Concrete steps, in the order they happened.
- Name the tools, commands, data and people involved (anonymised where
  needed).
- Include real numbers where you have them, e.g. "8,600 records", "12
  vulnerabilities" or "cut a 20-minute task to 2 minutes".

## What I learned

### One heading per key lesson

Explain the idea in your own words, and why it matters. A short code
sample, table or list is often clearer than a paragraph:

```md
## Role     — who the AI should act as
## Task     — one clear job per prompt
## Check    — list assumptions; ask rather than guess
```

### Another lesson

Two or three lessons per entry is plenty.

## Reflection

What went well, what surprised you, what you'd do differently, and what it
changes about how you'll work from now on.

## Next steps

- What you'll do next, and anything you need from other people.

## How this page is built

Each part of an entry comes from one field or section in its Markdown file:

| On the page | Comes from | Notes |
| --- | --- | --- |
| Date badge | `date` | Also sets the entry's "Week commencing" group in the sidebar. |
| Time badge | `time` | Written as `2h 30m`, `45m` or `3h`. Totalled on the [off-the-job log](/otj-log/). The default is `2h 30m`. |
| Title | `title` | Describe the topic only; the date is shown separately. |
| Summary | `description` | Shown in lists and on the home page when this is the latest entry. |
| KSB badges | `ksbs` → `code` | Blue = Knowledge, green = Skills, orange = Behaviours. Click one to jump to its explanation. |
| Cover image | `cover`, `coverAlt` | An SVG in `src/assets/covers/`, named after the entry. |
| Boxes | `:::note` / `:::tip` | For attachments, warnings or asides. |
| Sections | `## What I did` etc. | Plain Markdown. |
| KSB explanations | `ksbs` → `why` | Rendered automatically at the end of the page, with the official wording. |

## Source to copy

````md
---
title: 'What you actually covered'
description: 'One-line summary of what you did and why it mattered.'
date: 2026-09-29
time: 2h 30m
tags: [topic, tool]
cover: ../../../assets/covers/2026-09-29-short-title.svg
coverAlt: 'One sentence describing what the cover image shows.'
ksbs:
  - code: S8
    why: "How this entry's work shows this KSB, in one or two specific sentences."
  - code: K2
    why: "Tie it to what you actually did: the steps, tools and numbers."
---

Optional one-paragraph intro: what this entry is about and where it fits.

:::note[Study guide]
<a href="/downloads/2026-09-29-study-guide.pdf" download>Download the study guide</a> (PDF).
:::

## What I did

- ...

## What I learned

### Lesson one

...

## Reflection

...

## Next steps

- ...
````

The only difference from this page is the cover path: real entries live one
folder deeper, in `log/`, so they need `../../../` rather than `../../`.
