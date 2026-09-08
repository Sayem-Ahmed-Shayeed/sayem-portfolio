# Sayem Ahmed Shayeed — Portfolio

Scalable single-page academic/research portfolio built with Astro. Light mode is the default; dark mode is available from the top navigation.

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

### Add a dataset
Create a Markdown file in `src/content/datasets/` with contributors, publisher, version, DOI and links.

### Add news
Create a Markdown file in `src/content/news/`. Set `featured: true` on one item to make it the top announcement. If more than one is marked featured, the newest wins because news is sorted newest-first.

## Updating site-wide information
Edit `src/data/site.ts` for:
- name / title / bio
- social links
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

## GitHub Pages
1. Create the repo `Sayem-Ahmed-Shayeed/Sayem-Ahmed-Shayeed.github.io`.
2. Push this project to the `main` branch.
3. In GitHub: **Settings → Pages → Source → GitHub Actions**.
4. The included workflow deploys automatically after each push.

## Vercel
Import the same GitHub repository into Vercel. The included `vercel.json` uses Astro's static build output.

## Current metadata note
The MusIML @ ICML 2026 entry is intentionally labeled as an accepted paper without inventing the unavailable public title/author metadata. Update that one Markdown file when the exact metadata is ready.
