# AI & Automation Apprenticeship Log

A learning log and portfolio for the UK AI & Automation Level 4 apprenticeship,
built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
and deployed as static assets on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/).

## Adding a new learning-log entry

1. Create a new Markdown file in `src/content/docs/log/`, named
   `YYYY-MM-DD-short-title.md` (the date prefix keeps files sorted in your
   file browser, but the page's actual order comes from the `date`
   frontmatter field below).
2. Add frontmatter and content, for example:

   ```md
   ---
   title: 'Week 4 — Whatever you actually covered'
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

3. Save the file. It appears automatically at the top of `/log/` (sorted
   newest-first by `date`) and in the sidebar — no other file needs editing.
4. Run `npm run dev` to preview locally before publishing.

## Adding a new project write-up

Same process, but in `src/content/docs/projects/` — it shows up
automatically on `/projects/`.

## Publishing changes

```bash
git add .
git commit -m "Add week 4 log entry"
git push
```

Pushing to the repo's default branch (once you've connected this repo to
Cloudflare Workers Git integration) triggers an automatic build + deploy.
If you're deploying manually instead, see "Deploy" below.

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
