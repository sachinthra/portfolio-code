# Sachinthra N V — Portfolio

Space-themed dual-profile portfolio built with Next.js 16, React Three Fiber, and Tailwind CSS. Deploys as a static site to GitHub Pages.

## Dual Profile System

The site supports two profile views — **SDE / Cloud Engineering** and **Robotics / IoT** — so the same portfolio can be tailored for different audiences.

### How Profiles Work

| Priority | Source | Behavior |
|----------|--------|----------|
| 1 (highest) | URL query param `?profile=sde` or `?profile=robotics` | Overrides everything. Use this when sharing links. |
| 2 | `localStorage` | Remembers the visitor's last choice across page loads. |
| 3 | `DEFAULT_PROFILE` in `src/data/portfolio.ts` | Fallback for first-time visitors with no query param. |
| 4 (lowest) | `null` | Shows a profile picker page asking the visitor to choose. |

### Sharing Links

- **Cloud recruiter:** `https://sachinthra.github.io/?profile=sde`
- **Robotics company:** `https://sachinthra.github.io/?profile=robotics`
- **Anyone else:** `https://sachinthra.github.io/` (shows picker or default)

### Setting a Default Profile

Edit `src/data/portfolio.ts`:

```ts
// Show picker to visitors (default)
export const DEFAULT_PROFILE: Profile | null = null;

// Or skip picker and default to SDE view
export const DEFAULT_PROFILE: Profile | null = 'sde';
```

### What Gets Filtered

Each entry in portfolio data has a `profiles: ('sde' | 'robotics')[]` tag:

- **Experience** — filtered by profile
- **Projects** — filtered by profile
- **Skills** — filtered by profile
- **Hero tagline & bio** — different text per profile
- **Resume PDF** — links to the matching PDF per profile
- **Blog posts** — shown to both (not filtered)

Items tagged `['sde', 'robotics']` appear in both views.

### Switch View

A subtle "Switch view" link in the footer lets visitors reset their profile and return to the picker. It's intentionally hard to notice — recruiters see a single-focus portfolio.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **3D:** React Three Fiber + Drei (wireframe globe, starfield, orbiting satellites)
- **Styling:** Tailwind CSS v4
- **Theme:** Dark (Deep Orbit) / Light (Stellar Bright) via `next-themes`
- **Blog:** Markdown files parsed with `gray-matter`, custom renderer
- **Animations:** Framer Motion (scroll-driven)
- **Deploy:** GitHub Pages via static export

## Color Palette — Systems Explorer

| Name | Hex | Usage |
|------|-----|-------|
| Deep Orbit Blue | `#0B1D3A` | Dark theme bg, headers |
| Tech Cyan | `#00ADD8` | Buttons, links, accents |
| Stellar White | `#F8F9FA` | Light theme bg |
| Slate Gray | `#343A40` | Body text (light mode) |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (theme, profile, header, footer)
│   ├── page.tsx              # Profile picker + home sections
│   ├── globals.css           # Tailwind + theme variables
│   └── blog/
│       ├── page.tsx          # Blog index
│       ├── BlogIndexClient.tsx
│       └── [slug]/
│           ├── page.tsx      # Blog post (SSG)
│           └── BlogPostClient.tsx  # With TOC sidebar
├── components/
│   ├── Header.tsx            # Sticky nav (glass effect)
│   ├── Footer.tsx            # Social links + "Switch view"
│   ├── ThemeToggle.tsx       # Dark/light toggle
│   ├── ProfilePicker.tsx     # Landing page portal cards
│   ├── HeroSection.tsx       # Hero with 3D scene
│   ├── ExperienceTimeline.tsx
│   ├── ProjectGrid.tsx
│   ├── SkillsSection.tsx
│   ├── ContactSection.tsx
│   ├── BlogPreview.tsx
│   └── three/
│       ├── Starfield.tsx     # Animated star particles (background)
│       ├── HeroScene.tsx     # Wireframe globe + satellites
│       └── SkillsConstellation.tsx
├── context/
│   ├── ProfileContext.tsx    # Profile state (URL param → localStorage → default)
│   └── ThemeProvider.tsx
├── data/
│   └── portfolio.ts          # ← ALL portfolio data lives here
├── content/blog/             # Markdown blog posts
├── lib/blog.ts               # Blog file loading
└── types/index.ts
public/
├── images/blog/              # Blog post images
├── fonts/
└── resume/
    ├── sachinthra-sde.pdf     # ← Upload your SDE resume here
    └── sachinthra-robotics.pdf # ← Upload your robotics resume here
```

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build (static export → out/)
npm run start     # Serve production build
npm run lint      # ESLint
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

### New Project

Add to the `projects` array in `src/data/portfolio.ts`:

```ts
{
  id: 'my-project',
  title: 'My Project',
  description: 'What it does.',
  tech: ['Go', 'Docker'],
  profiles: ['sde', 'robotics'],  // which profile(s) show this
  github: 'https://github.com/...',
  blogSlug: 'my-post',  // optional: links to blog post
}
```

### New Experience

Add to the `experiences` array in `src/data/portfolio.ts`.

## Resume PDFs

Upload your resume files to:
- `public/resume/sachinthra-sde.pdf`
- `public/resume/sachinthra-robotics.pdf`

The site automatically links to the correct one based on the active profile.

## Deploy to GitHub Pages

The build generates a static `out/` directory. Deploy with:

```bash
npm run build
# Upload out/ to gh-pages branch, or use GitHub Actions
```

## License

MIT
