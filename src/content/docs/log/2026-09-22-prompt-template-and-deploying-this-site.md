---
title: 'Designing a prompt template, then using it to build this site'
description: 'How I structured an effective Claude prompt, then used it to scaffold, build, and deploy this site end-to-end.'
date: 2026-09-22
tags: [prompting, automation, tooling, cloudflare, ci-cd]
cover: ../../../assets/covers/2026-09-22-prompt-template-and-deploying-this-site.svg
coverAlt: 'A prompt template with Task, Context, Decision, Deploy and Constraints sections, handed off to a browser showing this site, deployed via a git push, build and live pipeline on Cloudflare Workers.'
---

## What I did

- Worked with Claude to design a reusable prompt template for handing off
  well-scoped technical projects: Task, Context, Technical decision, Site
  structure, Deployment requirements, Process, Constraints.
- Used that structure to specify this exact project — a learning-log site
  for the apprenticeship, hosted on Cloudflare Workers under my own domain.
- Compared two Cloudflare-native options before picking one: **emDash**
  (a git-free CMS built on Astro + D1 + R2, published by Cloudflare) versus
  a plain **Astro + Starlight** static site. Went with Starlight so that
  writing an entry doubles as a git-tracked habit, with no database to
  maintain.
- Filled in the template with real specifics — apprenticeship details,
  custom domain, desired site sections — and handed it to Claude Code to
  execute.
- Directed the build: scaffolding Astro + Starlight, extending the content
  schema so entries can carry a `date` and `tags`, and building a small
  reusable component that lists log entries and projects newest-first
  automatically — no index page to hand-edit when I add a new one.
- Set up a public GitHub repo, authenticated `gh` and `wrangler` via OAuth,
  and deployed to a free `workers.dev` URL first to sanity-check it before
  touching anything live.
- Pointed my own domain, `testdept.co.uk`, at the deployed Worker as a
  custom domain.
- Set up a GitHub Actions workflow so every `git push` now automatically
  builds and redeploys the site — no manual deploy step needed going
  forward.

## What I learned

- **Prompt structure matters more than I expected.** Separating "Task"
  from "Context" from "Constraints" turned a genuinely large, multi-step
  project — domain research, scaffolding, deployment, CI/CD — into one
  clear handoff instead of a long back-and-forth.
- **Static-assets deployment on Cloudflare Workers needs no server code at
  all** — just a `wrangler.jsonc` pointing at a build output folder.
  Cloudflare handles SSL and routing automatically once a custom domain is
  attached.
- **GitHub Actions secrets: name vs. value matters.** I pasted my
  Cloudflare API token into the *name* field of a `gh secret set` command
  instead of waiting for the value prompt, which meant the token sat in
  plain text as a secret **name** rather than an encrypted value. Lesson:
  revoke and rotate immediately if a secret is mishandled, even on your
  own machine — don't assume it's fine just because it's your own repo.

## Reflection

Structuring the ask clearly up front paid for itself repeatedly — reviewing
a filled-in template took a couple of minutes, versus explaining the same
requirements piecemeal over many messages. The secrets mistake was a good
reminder that "the assistant can handle it" doesn't remove the need to
understand what a command is actually doing, especially anything
credential-shaped. Next: replace the remaining placeholder entries with
real week-by-week notes, and actually use this log going forward rather
than just building it.
