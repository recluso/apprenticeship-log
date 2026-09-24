---
title: 'Building a week-grouped sidebar for this log'
description: 'How the "Week commencing" sidebar groups work under the hood, and why it had to be built rather than configured.'
date: 2026-09-22
time: 2h 30m
gdoc: https://docs.google.com/document/d/1Qn-L4G1bUgEbwgMfNLMKkEsm2hKiErda0afs8-MNUPA/edit
tags: [astro, starlight, javascript, automation]
cover: ../../../assets/covers/2026-09-22-week-grouped-sidebar-navigation.svg
coverAlt: 'A September calendar with the Monday column highlighted and a Sunday arrow jumping back to Monday, feeding into a sidebar grouped under Week commencing headings.'
ksbs:
  - code: K5
    why: "The goal was to remove a recurring manual job: hand-editing the sidebar every week would have undone the automatic listing. I pushed that recurring cost into a one-off piece of build code instead."
  - code: S7
    why: "Adapted the existing tool rather than replacing it — generated groups are plugged into Starlight's own sidebar configuration, so the rest of the site works exactly as before."
  - code: S9
    why: "Wrote a helper that reads every entry file, parses its frontmatter with `gray-matter`, works out the Monday that starts each entry's week (including the Sunday edge case) and groups and sorts the results."
  - code: S27
    why: "Recognised where configuration stops and code starts: Starlight's sidebar can't group by a date in frontmatter, so I matched the need (weekly groups with no upkeep) to what the framework could and couldn't do before choosing an approach."
  - code: B6
    why: "Dug into *why* the obvious approach failed — the config file runs before the content system exists — instead of copying something similar, and noted \"configuration problem or code problem?\" as a question to keep asking."
---

## What I did

- Asked for the Learning Log sidebar to group entries under headings like
  "Week commencing 21/09/26" (Monday-starting), instead of a flat list.
- Found this isn't something Starlight (the docs framework this site uses)
  supports directly — its sidebar is a static list defined in
  `astro.config.mjs`, and the `autogenerate` option it offers just lists
  files in a folder; it has no concept of grouping by a date in the
  frontmatter.
- Ruled out the "just do it manually" option — hand-editing the sidebar
  config every time a new week starts would undo the whole point of
  entries appearing automatically, which I'd already got working for the
  `/log/` and `/projects/` listing pages.
- Built [`src/utils/logSidebar.mjs`](https://github.com/recluso/apprenticeship-log/blob/main/src/utils/logSidebar.mjs),
  a small helper that:
  1. Reads every file in `src/content/docs/log/` straight off disk.
  2. Parses each one's frontmatter (`title`, `date`) using a library
     called `gray-matter`.
  3. For each entry's date, works out the Monday that starts its week.
  4. Groups entries under that Monday, formats it as `DD/MM/YY`, and
     sorts everything newest-first.
- Wired the helper into `astro.config.mjs`'s `sidebar` setting, replacing
  the old flat `autogenerate` list for the Learning Log section.

## How it works

The tricky part wasn't the date math — it was *when* this code has to
run. Astro reads `astro.config.mjs` once, right at the start of a build
or dev session, before its content-collection system (the bit that
normally lets you query "all my log entries" from inside a page) is even
set up. So the sidebar can't ask "what entries exist?" the normal way —
it has to go and read the raw Markdown files itself, like any other
Node.js script would.

The Monday calculation is the one bit of real logic:

```js
function startOfWeekMonday(date) {
	const d = new Date(date);
	const day = d.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
	const diff = (day === 0 ? -6 : 1) - day;
	d.setDate(d.getDate() + diff);
	return d;
}
```

JavaScript's `getDay()` treats Sunday as day `0`, which is the annoying
case: for every other day you just subtract however far past Monday you
are, but for Sunday you have to jump *back* 6 days to reach that week's
Monday rather than forward. That's the `day === 0 ? -6 : 1` doing the
work.

## What I learned

- **Static config isn't always static under the hood.** `astro.config.mjs`
  looks like a plain settings object, but it's actually just a JavaScript
  module that runs in Node — so it can import files, read the filesystem,
  and compute values, as long as it does so synchronously and finishes
  before Astro needs the result.
- **Framework features have edges, and the edge is informative.** The
  fact that Starlight's `autogenerate` doesn't group by date wasn't a bug
  to work around quietly — it was a useful signal about where "configure
  it" stops and "write a bit of code" starts.
- **Push the recurring cost into the one-time build, not into future me.**
  Same principle as the auto-sorted listing pages from earlier: a few
  extra lines now means every future entry just needs a `date` in its
  frontmatter, nothing else.

## Reflection

This was the first change on this site that didn't have an
out-of-the-box option — everything before it (the listing pages, the
date badge) used features Astro or Starlight already exposed. Here I had
to understand *why* the obvious approach didn't work (config runs before
content collections exist) before the right approach made sense, rather
than just pattern-matching to something similar. That distinction — "is
this a configuration problem or a code problem?" — feels like a useful
question to keep asking as this apprenticeship goes on.
