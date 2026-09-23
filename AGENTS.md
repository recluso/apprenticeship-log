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
- **Log entries:** Markdown in `src/content/docs/log/`, named
  `YYYY-MM-DD-short-title.md`, with `title`, `description`, `date` and `tags`
  frontmatter. Titles are topic-only; the date renders as a badge
  (`src/components/PageTitle.astro`) and drives the "Week commencing"
  sidebar groups (`src/utils/logSidebar.mjs`, Monday-starting). Entries
  usually use "What I did / What I learned / Reflection" sections.
- **Project write-ups:** `src/content/docs/projects/`.
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
