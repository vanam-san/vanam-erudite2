# vanam-erudite

A personal portfolio and blog built with [Astro](https://astro.build/), based on the [astro-erudite](https://github.com/jktrn/astro-erudite) theme.

## Quick Start

```bash
git clone https://github.com/vanam-san/vanam-erudite2.git
cd vanam-erudite2
bun install
bun run dev
```

Visit `http://localhost:4321`

---

## What's Added on Top of astro-erudite

- **Bento grid homepage** — card-based layout with hero, latest posts, gallery slideshow, projects, and live weather widget
- **Gallery system** — photo collections with lightbox, keyboard navigation, and auto-cycling slideshow on homepage
- **Giscus comments** — GitHub Discussions-based comment system on blog posts
- **Umami analytics** — privacy-focused, cookieless analytics (optional)
- **Unified tag system** — cross-collection tags spanning blog, gallery, and projects
- **Custom theme** — Ocean Depths palette with cyan and bioluminescent green accents and glow effects
- **Typography** — Fraunces display font for headings, IBM Plex Sans for body text
- **Hover effects** — card border highlights, vertical bar accents, and image scaling

---

## Environment Variables

All optional. Create a `.env` file:

```env
PUBLIC_UMAMI_WEBSITE_ID=
PUBLIC_UMAMI_HOST=cloud.umami.is
PUBLIC_GISCUS_REPO=
PUBLIC_GISCUS_REPO_ID=
PUBLIC_GISCUS_CATEGORY=Comments
PUBLIC_GISCUS_CATEGORY_ID=
```

---

## Commands

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `bun run dev`     | Start development server        |
| `bun run build`   | Build for production            |
| `bun run preview` | Preview production build        |
| `bun run format`  | Format code with Biome          |

---

## Configuration

### Site Configuration

Edit `src/consts.ts` to customize:

```ts
export const SITE = {
  title: "Your Site Title",
  description: "A personal blog and portfolio built with Astro.",
  locale: "en-US",
  dir: "ltr",
} as const

export const HERO = {
  name: "Your Name",
  title: "Your Title",
  bio: "A short bio about yourself.",
} as const

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

```yaml
---
title: 'Your Post Title'
description: 'A brief description'
date: 2026-01-01
authors: ['author-id']
tags: ['tag1', 'tag2']
image: './cover.png'
---

Your content here.
```

### Galleries

Create a folder in `src/content/gallery/` with images and an `index.md`:

```yaml
---
title: 'Gallery Title'
description: 'Description'
date: 2026-01-01
cover: './cover.jpg'
photos:
  - './photo1.jpg'
  - './photo2.jpg'
---

Optional gallery description.
```

### Projects

Create markdown files in `src/content/projects/`:

```yaml
---
name: 'Project Name'
description: 'Description'
link: 'https://github.com/you/project'
tags: ['TypeScript', 'React']
startDate: 2024-01-01
endDate: 2024-06-01
---
```

### Authors

Create files in `src/content/authors/`:

```yaml
---
name: 'Your Name'
pronouns: 'he/him'
avatar: 'https://avatars.githubusercontent.com/u/...'
bio: 'Your bio'
socials:
  github: 'https://github.com/you'
---
```

## Customization

### Colors

Edit `src/styles/color.css` to customize the palette. Colors use `light-dark()` for automatic light/dark mode support:

```css
:root {
  --cyan-9: light-dark(#0891b2, #22d3ee);
  --lume-9: light-dark(#059669, #34d399);
  /* ... */
}
```

### Fonts

Font files are in `src/assets/fonts/`. To change fonts:

1. Replace font files in `src/assets/fonts/`
2. Update `@font-face` declarations in `src/styles/fonts.css`
3. Update `--font-display`, `--font-sans`, and `--font-mono` tokens

---

## Credits

- [astro-erudite](https://github.com/jktrn/astro-erudite) by [@jktrn](https://github.com/jktrn) — base theme
- [merox.dev](https://github.com/meroxdotdev) by Robert Melcher — design inspiration
- [Frontend Design](https://agenticskills.io/skills/frontend-design) — frontend design patterns
- [Theme Factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) — theme system reference

---

## License

[MIT](LICENSE)
