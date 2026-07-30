---
title: 'Setup and Customize This Theme'
description: 'A step-by-step guide to setting up and personalizing the astro-erudite theme for your own portfolio.'
date: 2026-07-30
authors: ['vanam']
tags: ['setup', 'astro', 'guide']
pinned: true
---

This guide walks you through setting up and customizing this Astro theme for your own use.

## Installation

```bash
git clone https://github.com/vanam-san/vanam-erudite2.git
cd vanam-erudite
npm install
```

Start the dev server:

```bash
npm run dev
```

## Configuration

Edit `src/consts.ts` to personalize your site:

```typescript
export const SITE = {
  title: "Your Site",
  description: "Your description.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
}

export const HERO = {
  name: "Your Name",
  title: "Your Title",
  bio: "Short bio about yourself.",
}

export const NAVIGATION = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
]

export const SOCIALS = [
  { href: "https://github.com/yourusername", label: "GitHub", icon: GitHub },
  { href: "mailto:your@email.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]
```

## Adding Content

### Blog Posts

Create a folder in `src/content/blog/` with an `index.md`:

```markdown
---
title: 'My Post'
description: 'Post description'
date: 2026-01-01
authors: ['your-author-id']
tags: ['tag1', 'tag2']
draft: false
---

Your content here.
```

### Projects

Create markdown files in `src/content/projects/`:

```markdown
---
name: 'Project Name'
description: 'Description'
link: 'https://github.com/you/project'
tags: ['TypeScript', 'React']
startDate: 2024-01-01
endDate: 2024-06-01
draft: false
---
```

### Galleries

Create a folder in `src/content/gallery/` with images and an `index.md`:

```markdown
---
title: 'Gallery Title'
description: 'Description'
date: 2026-01-01
cover: './cover.jpg'
photos:
  - './photo1.jpg'
  - './photo2.jpg'
draft: false
---
```

### Authors

Create files in `src/content/authors/`:

```markdown
---
name: 'Your Name'
avatar: './avatar.jpg'
bio: 'Your bio'
socials:
  github: 'https://github.com/you'
---
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `PUBLIC_UMAMI_WEBSITE_ID` — Umami analytics
- `PUBLIC_GISCUS_REPO` — GitHub repo for comments

## Deployment

Build and deploy to your preferred platform:

```bash
npm run build
```

The output is in `dist/`. Deploy to Vercel, Netlify, Cloudflare Pages, or any static host.
