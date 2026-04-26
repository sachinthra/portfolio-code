# Sachinthra N V — Portfolio

Space-themed portfolio built with Next.js 16, React Three Fiber, and Tailwind CSS. Deploys as a static site to GitHub Pages.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **3D:** React Three Fiber + Drei (wireframe globe, starfield, orbiting satellites)
- **Styling:** Tailwind CSS v4
- **Theme:** Dark / Light via `next-themes`
- **Blog:** Markdown files parsed with `gray-matter`, custom renderer
- **Animations:** Framer Motion (scroll-driven)
- **SEO:** Sitemap, robots.txt, JSON-LD (Person + BlogPosting), OpenGraph, canonical URLs
- **Deploy:** GitHub Pages via static export

## Folder Structure

This repo (`portfolio-code`) lives alongside the deploy repo:

```
Portfolio/
├── portfolio-code/          ← This repo (Next.js source)
├── sachinthra.github.io/    ← Deploy repo (static build output)
└── Resume-Sachinthra/
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, metadata, JSON-LD
│   ├── page.tsx              # Home — all sections
│   ├── globals.css           # Tailwind + theme variables
│   ├── sitemap.ts            # Auto-generated sitemap.xml
│   ├── robots.ts             # robots.txt
│   └── blog/
│       ├── page.tsx          # Blog index
│       └── [slug]/
│           ├── page.tsx      # Blog post (SSG + per-post metadata)
│           └── BlogPostClient.tsx  # Renderer + TOC sidebar
├── components/
│   ├── Header.tsx            # Sticky nav (glass effect)
│   ├── Footer.tsx            # Social links
│   ├── HeroSection.tsx       # Hero with 3D scene + Clarke quote
│   ├── AboutSection.tsx      # Bio, education, current focus
│   ├── ExperienceTimeline.tsx
│   ├── ProjectGrid.tsx
│   ├── SkillsSection.tsx
│   ├── CredentialsSection.tsx # Certifications & achievements
│   ├── ContactSection.tsx
│   ├── BlogPreview.tsx
│   └── three/
│       ├── Starfield.tsx
│       ├── HeroScene.tsx     # Wireframe globe + satellites
│       └── SkillsConstellation.tsx
├── context/
│   └── ThemeProvider.tsx
├── data/
│   └── portfolio.ts          # ← ALL portfolio data lives here
├── content/blog/             # Markdown blog posts
├── lib/blog.ts               # Blog file loading
└── types/index.ts
```

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build (static export → out/)
npm run lint      # ESLint
```

## Build & Deploy

Build the static site and copy to the deploy repo:

```bash
# 1. Build
npm run build

# 2. Clean old build from deploy repo (keep .git and .gitignore)
cd ../sachinthra.github.io
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name '.gitignore' ! -name '.nojekyll' ! -name 'CNAME' -exec rm -rf {} +

# 3. Copy new build
cp -r ../portfolio-code/out/* .
touch .nojekyll

# 4. Commit and push
git add .
git commit -m "Deploy: $(date +%Y-%m-%d)"
git push
```

Or as a one-liner from `portfolio-code/`:

```bash
npm run build && cd ../sachinthra.github.io && find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name '.gitignore' ! -name '.nojekyll' ! -name 'CNAME' -exec rm -rf {} + && cp -r ../portfolio-code/out/* . && touch .nojekyll
```

## Adding Content

### New Blog Post

Create `src/content/blog/my-post.md`:

```md
---
title: 'My Post Title'
description: 'A brief description.'
pubDate: 'Apr 26 2026'
heroImage: '/images/blog/my-post/hero.jpg'
tags: ['Go', 'Docker']
---

Your markdown content here...
```

### New Project / Experience / Skill

Edit `src/data/portfolio.ts` — all portfolio data is in one file.

## SEO Checklist

- [x] Per-page `<title>` and `<meta description>`
- [x] OpenGraph tags (title, description, type, image)
- [x] Twitter card meta
- [x] Canonical URLs on all pages
- [x] `sitemap.xml` with all pages and blog posts
- [x] `robots.txt` allowing all crawlers
- [x] JSON-LD `Person` schema (homepage)
- [x] JSON-LD `BlogPosting` schema (each blog post)
- [x] Semantic HTML (`<main>`, `<article>`, `<section>`, `<nav>`)
- [x] `lang="en"` on `<html>`
