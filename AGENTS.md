## About this project

The **AI & Automation Apprenticeship Log**: a learning log and portfolio for
the owner's UK AI & Automation Level 4 apprenticeship. Built with Astro +
Starlight, deployed as static assets on Cloudflare Workers.

- **Live site:** https://testdept.co.uk (custom domain; the `*.workers.dev`
  URL is also kept live as a fallback — see `wrangler.jsonc`).
- **Repo:** https://github.com/recluso/apprenticeship-log (branch `main`).
- **Deploy:** pushing to `main` triggers `.github/workflows/deploy.yml`
  (build + `wrangler deploy`, using `CLOUDFLARE_API_TOKEN` /
  `CLOUDFLARE_ACCOUNT_ID` repo secrets). `npm run deploy` deploys manually.
  Only commit/push when the user asks — a push publishes the site.
  Workflow: commit directly to `main` and push — no feature branches or
  pull requests for this repo (the owner's preference).
- **Log entries:** Markdown in `src/content/docs/log/`, named
  `YYYY-MM-DD-short-title.md`, with `title`, `description`, `date` and `tags`
  frontmatter. Titles are topic-only; the date renders as a badge
  (`src/components/PageTitle.astro`) and drives the "Week commencing"
  sidebar groups (`src/utils/logSidebar.mjs`, Monday-starting). Entries
  usually use "What I did / What I learned / Reflection" sections.
- **Project write-ups:** `src/content/docs/projects/`.
- **Log template:** `src/content/docs/log-template.md` (at `/log-template/`)
  is a worked example of an entry using every feature. It lives outside
  `log/` so it isn't counted in the OTJ log, KSB tracker or home banner.
  When entry features change, update the template to match.
- **KSBs (apprenticeship standard):** the owner is on ST1512 *AI and
  automation practitioner*, Level 4, v2.1. All 64 KSBs (official wording
  plus short labels) live in `src/data/ksbs.ts`. When writing or adding an
  entry, analyse it and add a `ksbs:` list to its frontmatter — each item a
  `code` and a `why`. Be selective: only KSBs the entry gives clear,
  specific evidence for (typically 4–8), not everything loosely related.
  Each `why` is one or two sentences, first person, tied to what the entry
  actually says was done or learned (real steps, tools, numbers) — never
  generic restatements of the KSB. `why` may use `code` and *emphasis*.
  Badges appear under the title, explanations at the end of the entry
  (`KsbSection.astro`), and coverage on `/ksbs/` (`KsbTracker.astro`).
- **Time (OTJ):** `time: 2h 30m` (or `45m`, `3h`) records time spent, for
  the owner's off-the-job log. Default to `time: 2h 30m` on every new entry
  (the owner's choice) unless they give a different time, and mention the
  default when adding it so they can correct it. Totals and a CSV export
  are on `/otj-log/` and `/otj-log.csv`.
- **Cover graphics:** every log entry and project should have a cover.
  When writing or adding an entry, also draw one: a hand-authored SVG in
  `src/assets/covers/<entry-filename>.svg`, referenced via `cover:` and
  `coverAlt:` frontmatter (see README "Adding a cover image"). Match the
  existing covers' house style: `viewBox="0 0 560 420"`, rounded dark card
  background (gradient `#1b1e2b`→`#11131b`, `rx="24"`) plus a soft radial
  glow; panels `#232838` with `#3a4160` strokes; accent `#8b95ff`, with
  `#6fe3c8` (success), `#f5b85a`, `#c7a2ff`, `#ff7a85` (errors) as
  secondary colours; text `#e4e7f1` / muted `#8b93ad`; system sans and
  monospace fonts. Illustrate the entry's specific content (real commands,
  numbers, steps) rather than generic clip-art, avoid third-party logos,
  and check it renders without overlaps before finishing. Write `coverAlt`
  as one sentence describing what the image shows.
- **Other customisations:** `src/components/Hero.astro` makes the home page
  banner feature the newest-dated log entry or project automatically;
  `src/components/ThemeProvider.astro` defaults
  first-time visitors to dark mode; `src/components/EntryList.astro` renders
  the newest-first lists on `/log/` and `/projects/`.
- See `README.md` for the full workflow.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
