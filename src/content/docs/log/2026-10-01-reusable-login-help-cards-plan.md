---
title: 'Planning reusable, editor-managed help cards for a Drupal login page'
description: 'Worked out how to turn four hard-coded buttons on our new login page into a reusable Drupal component that admins can edit, then wrote a phased build, deploy and maintenance guide to review with a colleague.'
date: 2026-10-01T14:00
time: 25m
gdoc: https://docs.google.com/document/d/1sycDqVyKDEZAap9FmfbuiS9WEkaxS47MtXU9aWsPyNE/edit
tags: [drupal, sdc, paragraphs, design, claude, documentation]
cover: ../../../assets/covers/2026-10-01-reusable-login-help-cards-plan.svg
coverAlt: 'A login page with four help cards in a two-by-two grid and a message bar beneath them, beside the component folder tree for link-card and link-card-grid and a three-step flow from editor content through glue templates to Single Directory Components.'
ksbs:
  - code: K11
    why: "Planned the cards around two sets of users: editors who need to change cards and the message without a developer, and visitors using a keyboard or screen reader. Each card is one link with a decorative icon, and the test list includes keyboard, VoiceOver and empty-message checks."
  - code: K15
    why: "Used an AI assistant (Claude) to compare approaches and draft the guide, but kept the decisions: I questioned whether SDC would be simple enough to maintain, corrected the message requirement to sit beneath the cards, and noted the one template name that still needs checking on our site."
  - code: K17
    why: "Chose a design that's cheap to maintain: the card's look lives in one component folder, so a style change updates every place it's used, and admins handle everyday content changes in one form instead of developers editing Twig."
  - code: K18
    why: "Built governance into the plan: editors get per-bundle block permissions but not *Administer blocks*, so they can't move or delete placements, and the message uses a restricted \"Simple text\" format so it can't carry layout-breaking HTML."
  - code: K24
    why: "Broke the work into nine phases (prerequisites to maintenance) with time estimates totalling about 4–6 hours, a test checklist before launch, and a deploy order that accounts for block content not travelling with config."
  - code: K25
    why: "Learned where Single Directory Components fit in current Drupal: part of core since 10.3, used by the new Canvas page builder but not dependent on it, with props and slots validated against a YAML schema."
  - code: S28
    why: "Wrote the plan up as a shared guide with a diagram of how the parts connect, a troubleshooting table and seven open questions, so a colleague can challenge the decisions before any code is written."
---

Our new login page mockup has four help buttons above the form: "Trouble
logging in?", "Why the changes?", "Delivery partner?" and "Need support".
The quick option was to hard-code them into the Drupal 11 Twig template.
Instead I wanted something I could reuse elsewhere on the site, that admins
could edit without a developer.

I worked through it with an AI assistant (Claude). It explained the options
and drafted the guide; I asked the questions, made the decisions and
corrected the requirements. Nothing is built yet: today was design and
planning.

:::note[Build guide]
<a href="/downloads/2026-10-01-login-help-cards-guide.pdf" download>Download the login help cards build guide</a> (PDF, 15 pages): components, content model, templates, placement, permissions, testing, deployment and maintenance.
:::

## What I did

1. **Compared three approaches:**
   - **Hard-coded Twig:** fastest, but every wording change needs a
     developer and a deploy.
   - **A menu with extra fields** (via the Menu Item Extras module):
     familiar for editors, but awkward once each item needs a heading and an
     icon.
   - **Single Directory Components (SDC) plus a custom block type built
     with Paragraphs:** the design lives in code, and the content lives in
     an editable block that can be placed anywhere.
2. **Checked the learning curve before committing.** I hadn't used SDC
   before, so I asked whether it would be simple to build and maintain. An
   SDC is a folder with a Twig file, a small YAML file listing its inputs,
   and CSS that Drupal attaches automatically. That's close enough to what I
   already know that I chose to use it from the start.
3. **Designed the structure:**
   - Two components: `link-card` (one card) and `link-card-grid` (the row
     of cards with an optional message beneath).
   - A `link_card` paragraph type with heading, link and icon fields.
   - A `link_card_grid` block type holding the cards and a message field.
   - Four small "glue" templates that pass field data into the components.
4. **Added a requirement.** Admins will probably want a short text message
   with the cards. The first draft put it above them and offered a per-card
   option; I clarified that it should be a single message just beneath the
   set of cards.
5. **Wrote a step-by-step guide** as a shared document: prerequisites,
   building the components, the content model, templates, placement on
   `/user/login`, editor permissions, a test checklist, deployment and
   maintenance, with a diagram of how the parts connect.

**By the numbers:** 2 components; 4 glue templates; 9 phases; an estimated
4–6 hours to build; a 9-item test checklist; 7 open questions to resolve.

## Problems and how I solved them

- **Not knowing SDC or Canvas.** Separating the two helped: Canvas is a new
  drag-and-drop page builder, and SDC is the component system it builds on.
  I only need SDC.
- **Keeping icons consistent.** Letting editors upload images would let
  the design drift. The icon is a dropdown whose values must match a list
  in the component's YAML, which keeps the four designed icons as the only
  choices.
- **Stopping Drupal's markup breaking the grid.** By default, Drupal wraps
  every field in extra `<div>`s, which would break the CSS grid. Two
  one-line field templates output only the items.
- **Config versus content when deploying.** The block type and fields
  deploy as config, but the cards themselves are content. The guide says to
  create the block on each site and place it after the config import.
- **One unverified detail.** The block template's file name is my best
  understanding of Drupal 11's naming. The guide says to check it against
  the Twig debug suggestions rather than assume it.

## What I learned

- **SDC is a small step from ordinary Twig.** The new parts are a YAML file
  describing the inputs and an `include('theme:component')` call.
- **Props and slots do different jobs.** Props are plain values such as a
  heading or icon name. Slots take rendered Drupal output, such as a
  formatted message field.
- **Separate how it looks from what it says.** Design in a component,
  content in an editable block, connected by thin templates. Each part can
  then change without touching the others.
- **Permissions shape the editor experience.** Without permission to use
  the message's text format, editors would see the field greyed out, which
  is easy to miss in testing.

## Reflection

Asking "is this simple to maintain?" before choosing an approach was the
most useful thing I did today. The cleverest option isn't worth much if I
can't support it later. Working with the AI assistant made comparing
options fast, but it took me to pin down the real requirement: the first
version guessed wrongly about where the message should go. Next time I'd
state requirements like that up front. Writing the plan as a shared
document with open questions also means a colleague can question it before
any code exists, which is the cheapest time to change direction.

## Next steps

- Review the guide with a colleague and resolve the open questions,
  starting with the theme name, the card URLs and which roles can edit.
- Build the components and content model on my local site, checking the
  template names with Twig debug.
- Run the test checklist, including logged-out and editor-role tests,
  before deploying.
