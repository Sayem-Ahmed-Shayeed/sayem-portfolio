# Sayem Ahmed Shayeed — Portfolio

Scalable single-page academic/research portfolio built with Astro. The initial theme follows the visitor's system preference; the navigation toggle saves their choice.

## Local development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## The important part: adding content

You usually do **not** edit `src/pages/index.astro` when adding work.

### Add a project
Create a new Markdown file in `src/content/projects/`:

```md
---
title: "Project Name"
date: 2026-09-09
featured: true
status: "MVP"
role: "Creator"
team: "Solo"
image: "/images/projects/project-name.png"
alt: "Project screenshot"
description: "One concise sentence."
technologies: ["Flutter", "Python"]
links:
  - label: "GitHub"
    url: "https://github.com/..."
---
Optional longer notes.
```

### Add a publication
Create a Markdown file in `src/content/publications/` with title, year, authors, venue, tags and links. The site sorts publications newest first automatically.

Use link labels `Code` and `Paper` for the bottom-right actions (`GitHub` and `OpenReview` are also recognized). Missing destinations render as unavailable chips, never placeholder links. Other links remain available alongside these actions.

Project team chips display `Solo` in green and `Group` in blue. Existing team-size descriptions also display as `Group`.

### Add a dataset
Create a Markdown file in `src/content/datasets/` with contributors, publisher, version, DOI and links.

### Add news
Create a Markdown file in `src/content/news/`. Set `featured: true` on one item to make it the top announcement. If more than one is marked featured, the newest wins because news is sorted newest-first.

## Updating site-wide information
Edit `src/data/site.ts` for:
- name / title / bio
- social links
- coding profiles (`codingProfiles`)
- research interests
- skills
- experience
- education
- achievements
- navigation

## CV later
There is intentionally no CV button right now. When the CV is ready, add it to `public/files/cv.pdf` and add one button/link in the hero social/action area.

## Images
- Profile photo: `public/images/profile/sayem.png`
- Achievement assets: `public/images/achievements/`
- Project images: `public/images/projects/`
- Research figures: `public/images/research/`

## Vercel
Import this GitHub repository into Vercel. The included `vercel.json` uses Astro's static build output, and pushes to `main` trigger redeployments.

## Current content gaps
The LeetCode profile URL and publication code URLs still need to be supplied. BongoFishX currently links to Scholar rather than a direct paper. The existing MusIML OpenReview URL has not been independently verified.

## Shared UI styles
The capsule radius and minimum height are controlled by `--chip-radius` and `--chip-height` in `src/styles/global.css`. Chips use the same geometry across metadata, technologies, venues and actions, with larger touch targets on small screens. The globe respects reduced motion and pauses when outside the viewport or in a background tab.
