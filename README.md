# Sachinthra N V - Portfolio & Resume

Professional portfolio website built with Astro showcasing projects, skills, and experience as a Cloud Developer and Software Engineer.

## 🌐 Live Site

**[https://sachinthra.github.io](https://sachinthra.github.io)**

## 👨‍💻 About Me

Software Development Engineer II (SDE-2) at Hewlett Packard Enterprise (HPE) with 3+ years of experience in:
- Cloud solutions architecture and development
- Backend engineering with Go and Python
- DevOps and containerization
- IoT and embedded systems
- Self-hosted infrastructure

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) - Fast, content-focused static site generator
- **Styling:** Custom CSS with dark/light theme support
- **Content:** Markdown & MDX for blog posts
- **SEO:** Sitemap, RSS feed, OpenGraph, JSON-LD structured data
- **Deployment:** GitHub Pages

## ✨ Features

- ✅ Minimal, professional design
- ✅ 100/100 Lighthouse performance
- ✅ SEO-optimized with meta tags and structured data
- ✅ Sitemap and RSS feed
- ✅ Dark/light theme toggle
- ✅ Blog with project showcases
- ✅ Responsive design
- ✅ Fast page loads

## 📂 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## � Featured Projects

### File Locker
Production-ready encrypted file storage & streaming server built with Go, Preact, Docker, and AES-256. Running on Raspberry Pi 4 with 1TB storage.

### NAS Project
Custom Network Attached Storage solution using Raspberry Pi 4 and OpenMediaVault for centralized home storage.

### Home Server
Self-hosted infrastructure running multiple services including file storage, media streaming, and automation.

## 📈 SEO Features

- Sitemap generation at `/sitemap-index.xml`
- RSS feed at `/rss.xml`
- robots.txt for search engine crawlers
- OpenGraph and Twitter Card meta tags
- JSON-LD structured data for blog posts
- Optimized meta descriptions and keywords
- Canonical URLs

## 🚀 Deployment

Site is automatically deployed to GitHub Pages on push to main branch.

## 📫 Connect

- **GitHub:** [@sachinthra](https://github.com/sachinthra)
- **LinkedIn:** [Sachinthra N V](https://linkedin.com/in/sachinthra)
- **Portfolio:** [sachinthra.github.io](https://sachinthra.github.io)

---

Built with [Astro](https://astro.build) • Hosted on [GitHub Pages](https://pages.github.com)

Init
```bash
npm create astro@latest
```

Dependencies
```bash
npm install @tresjs/core @tresjs/cientos three
npm install @types/three -D 
```

