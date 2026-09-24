# AI & Automation Apprenticeship Log

A learning log and portfolio for the UK AI & Automation Level 4 apprenticeship,
built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
and deployed as static assets on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/).

## Adding a new learning-log entry

1. Create a new Markdown file in `src/content/docs/log/`, named
   `YYYY-MM-DD-short-title.md` (the date prefix keeps files sorted in your
   file browser, but the page's actual order comes from the `date`
   frontmatter field below).
2. Add frontmatter and content, for example. Titles are topic-only (the
   date renders as a small badge above the heading, and drives sidebar
   grouping) — so entries aren't required to map to a specific "week";
   a topic-driven entry reads just as naturally:

   ```md
   ---
   title: 'Whatever you actually covered'
   description: 'One-line summary shown in the log list.'
   date: 2026-09-29
   tags: [automation, python]
   ---

   ## What I did
   ...

   ## What I learned
   ...

   ## Reflection
   ...
   ```

3. Save the file. If it has the newest `date`, it becomes the featured
   entry at the top of the home page. It also appears automatically at the
   top of `/log/` (sorted newest-first by `date`), grouped into a "Week commencing DD/MM/YY"
   section in the sidebar (Monday-starting) — no other file needs editing.
4. Run `npm run dev` to preview locally before publishing.

## Adding a cover image

Any log entry or project can have a cover graphic. It's shown under the
title on the entry's own page, and on the right of the home page banner
while that entry is the latest one (above the text on phones).

1. Put the image in `src/assets/covers/`, named after the entry
   (e.g. `2026-09-29-short-title.svg`). SVG, PNG, JPG and WebP all work —
   photos and screenshots are resized and compressed automatically. A
   landscape 4:3 shape (e.g. 1120×840) fits the space best.
2. Add two lines to the entry's frontmatter:

   ```md
   cover: ../../../assets/covers/2026-09-29-short-title.svg
   coverAlt: 'One sentence describing what the image shows.'
   ```

   The path is relative to the Markdown file, so it's the same
   `../../../assets/covers/` prefix for every log entry and project. If the
   path is wrong the build fails with an error naming the file, so a typo
   can't slip onto the live site.

Entries without a `cover` still work — the banner just uses the full width
for the text.

## Attaching a downloadable file

Put the file in `public/downloads/`, prefixed with the entry's date
(e.g. `2026-09-24-study-guide.pdf`), then link to it from the entry. The
`download` attribute makes browsers save it rather than open it:

```md
:::note[Study guide]
<a href="/downloads/2026-09-24-study-guide.pdf" download>Download the study guide</a> (PDF).
:::
```

Anything in `public/` is published as-is to the live site, so only add
files that are fine to be public.

## Adding a new project write-up

Same process, but in `src/content/docs/projects/` — it shows up
automatically on `/projects/`.

## Publishing changes

```bash
git add .
git commit -m "Add 29 September log entry"
git push
```

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and deploys automatically via GitHub Actions — no manual step
needed. See "Deploy" below only if you want to publish without pushing
(e.g. to test a change before committing it).

## Local development

| Command          | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`      | Install dependencies                        |
| `npm run dev`       | Start local dev server at `localhost:4321`  |
| `npm run build`     | Build the production site to `./dist/`      |
| `npm run preview`   | Preview the production build locally        |

## Deploy

```bash
npm run deploy
```

This runs `astro build` then `wrangler deploy`, publishing `./dist` to
Cloudflare Workers per `wrangler.jsonc`. The first deploy will prompt you to
authenticate with your Cloudflare account.

## Project structure

```
.
├── src/
│   ├── components/
│   │   └── EntryList.astro   # chronological list used by /log/ and /projects/
│   └── content/
│       └── docs/
│           ├── index.mdx      # home page
│           ├── log/           # learning-log entries
│           ├── projects/      # project write-ups
│           ├── resources.md
│           ├── glossary.md
│           └── certifications.md
├── astro.config.mjs           # site title, nav/sidebar structure
├── wrangler.jsonc              # Cloudflare Workers deploy config
└── package.json
```
