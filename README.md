# Next.js Blog Platform

A high-performance, SEO-optimized blog platform built with **Next.js**, **MDX**, and **Tailwind CSS**. Fully containerized with Docker.

## Features

- ⚡ **Static Site Generation (SSG)** – All pages pre-rendered at build time
- 📝 **MDX Support** – Write blog posts with JSX components inside Markdown
- 🎨 **Dark/Light Theme** – Toggleable with `localStorage` persistence
- 🔍 **SEO Optimized** – Full meta tags, Open Graph, Twitter Cards, JSON-LD
- 🗺️ **Sitemap & RSS Feed** – Auto-generated at build time
- 📄 **Pagination** – 10 posts per page with SSG
- 🖼️ **Image Optimization** – `next/image` used throughout
- 🐳 **Docker Ready** – Single `docker-compose up` command
- 📱 **Fully Responsive** – Mobile-first design

## Project Structure

```
nextjs-blog/
├── posts/                        # MDX blog post files
│   ├── getting-started-with-nextjs.mdx
│   ├── mastering-tailwind-css.mdx
│   ├── ssg-vs-ssr-explained.mdx
│   ├── writing-better-mdx.mdx
│   ├── seo-best-practices-nextjs.mdx
│   ├── docker-for-frontend-developers.mdx
│   ├── react-performance-optimization.mdx
│   └── building-accessible-web-apps.mdx
│
├── public/                       # Static files served as-is
│   ├── sitemap.xml               # Generated at build time
│   ├── rss.xml                   # Generated at build time
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── Layout.js             # Page layout wrapper
│   │   ├── Navbar.js             # Navigation + theme toggle
│   │   ├── Footer.js             # Footer with links
│   │   ├── PostCard.js           # Blog post card (with data-testid)
│   │   ├── Pagination.js         # Pagination controls (with data-testid)
│   │   └── MDXComponents.js      # Custom MDX renderers (image, pre)
│   │
│   ├── lib/
│   │   ├── posts.js              # Core data-fetching utilities
│   │   ├── generate-sitemap.js   # Build-time sitemap generator
│   │   └── generate-rss.js       # Build-time RSS feed generator
│   │
│   ├── pages/
│   │   ├── _app.js               # App wrapper + theme state
│   │   ├── _document.js          # Custom <head> with fonts
│   │   ├── index.js              # Homepage (SSG)
│   │   ├── 404.js                # Custom 404 page
│   │   ├── blog/
│   │   │   ├── index.js          # Blog listing page 1 (SSG)
│   │   │   └── [page].js         # Blog listing pages 2+ (SSG)
│   │   └── posts/
│   │       └── [slug].js         # Individual post page (SSG)
│   │
│   └── styles/
│       └── globals.css           # Tailwind + custom styles
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

### Option 1: Docker (Recommended)

```bash
# Clone the repo
git clone <your-repo-url>
cd nextjs-blog

# Copy env file
cp .env.example .env

# Build and start
docker-compose up --build -d

# Check health status
docker-compose ps

# Open the app
open http://localhost:3000
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open the app
open http://localhost:3000
```

### Building for Production (Local)

```bash
npm run build   # Builds Next.js + generates sitemap.xml + rss.xml
npm start       # Starts production server
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `BASE_URL` | Full base URL (used for sitemap/RSS) | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_NAME` | Blog display name | `My Next.js Blog` |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Blog description | (see .env.example) |
| `NEXT_PUBLIC_SITE_AUTHOR` | Default author name | `Your Name` |

## Adding Blog Posts

Create a new `.mdx` file in the `/posts` directory:

```mdx
---
title: 'Your Post Title'
date: '2024-06-01'
author: 'Your Name'
tags: ['tag1', 'tag2']
excerpt: 'A short summary shown on listing pages.'
image: 'https://your-image-url.com/image.jpg'
---

## Your Content Here

Write in **Markdown** with full React component support!
```

Then rebuild (`npm run build` or `docker-compose up --build`).

## Architectural Decisions

### Pages Router vs App Router
We use the **Pages Router** for maximum compatibility with `next-mdx-remote` v4 and `getStaticProps`/`getStaticPaths` SSG patterns.

### MDX Processing
`next-mdx-remote` with `rehype-highlight` (syntax highlighting) and `remark-gfm` (GitHub-flavored Markdown tables/strikethrough) handles all MDX parsing server-side.

### Sitemap & RSS
Generated via Node.js scripts run **after** `next build` as part of the `npm run build` command. This ensures all post URLs are current.

### Theming
Dark mode uses Tailwind's `class` strategy. The theme class is toggled on `<html>` and persisted in `localStorage` via `_app.js`.
