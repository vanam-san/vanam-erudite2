# Astro Personal Website Template

A personal portfolio and blog built with [Astro](https://astro.build/). Based on the [astro-erudite](https://github.com/jktrn/astro-erudite) theme by [enscribe](https://enscribe.dev), inspired by [vanam.dev](https://vanam-ten.vercel.app/).

## Features

- **Bento Grid Homepage** — Hero card, latest posts, gallery slideshow, projects, and time display
- Astro Islands architecture for selective hydration
- Light/dark theme support
- Blog with series/subpost support
- Photo gallery with lightbox
- LaTeX math rendering (Temml)
- RSS feed and sitemap generation
- SEO optimization with Open Graph tags
- View Transitions for smooth navigation
- Syntax highlighting with Expressive Code
- Giscus comment system (optional)
- Umami analytics (optional)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Astro](https://astro.build/) |
| Styling | Pure CSS with CSS custom properties |
| Markdown | `@astrojs/markdown-satteri` |
| Codeblocks | [Expressive Code](https://expressive-code.com/) |
| Math | [Temml](https://temml.com/) |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Customization

### 1. Site Configuration

Edit `src/consts.ts` to customize your site:

```typescript
export const SITE = {
  title: "Your Site Title",
  description: "Your site description.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
}

export const HERO = {
  name: "Your Name",
  title: "Your Title",
  bio: "A short bio about yourself.",
}

export const NAVIGATION = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
]

export const SOCIALS = [
  { href: "https://github.com/yourusername", label: "GitHub", icon: GitHub },
  { href: "https://twitter.com/yourusername", label: "Twitter", icon: Twitter },
  { href: "mailto:your@email.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]
```

### 2. Navigation

Add or remove navigation items in the `NAVIGATION` array. Available pages:

- `/about` — About page
- `/blog` — Blog posts
- `/gallery` — Photo galleries
- `/projects` — Projects
- `/authors` — Author profiles (accessible via URL, not in default nav)
- `/tags` — Tag index (accessible via URL)

### 3. Adding Blog Posts

Create a new directory in `src/content/blog/` with an `index.md` file:

```markdown
---
title: 'Your Post Title'
description: 'A brief description'
date: 2024-01-01
authors: ['your-author-id']
tags: ['tag1', 'tag2']
image: './optional-image.png'
draft: false
---

Your post content here...
```

### 4. Adding Projects

Create markdown files in `src/content/projects/`:

```markdown
---
name: 'Project Name'
description: 'Project description'
link: 'https://github.com/you/project'
tags: ['TypeScript', 'React']
startDate: 2024-01-01
endDate: 2024-06-01
draft: false
---
```

### 5. Adding Galleries

Create a directory in `src/content/gallery/` with an `index.md` file:

```markdown
---
title: 'Gallery Title'
description: 'Gallery description'
date: 2024-01-01
cover: './cover.jpg'
photos:
  - './photo1.jpg'
  - './photo2.jpg'
  - './photo3.jpg'
draft: false
---
```

Place images in the same directory as the markdown file.

### 6. Adding Authors

Create markdown files in `src/content/authors/`:

```markdown
---
name: 'Your Name'
pronouns: 'they/them'
avatar: 'https://example.com/avatar.jpg'  # or '/path/to/local.jpg'
bio: 'Your bio'
mail: 'your@email.com'
socials:
  github: 'https://github.com/you'
  twitter: 'https://twitter.com/you'
  website: 'https://yoursite.com'
---
```

## Environment Variables

Create a `.env` file (copy from `.env.example`):

| Variable | Description | Required |
|----------|-------------|----------|
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami website ID | No |
| `PUBLIC_UMAMI_HOST` | Umami host domain | No |
| `PUBLIC_GISCUS_REPO` | GitHub repo (`owner/repo`) | No |
| `PUBLIC_GISCUS_REPO_ID` | Giscus repo ID | No |
| `PUBLIC_GISCUS_CATEGORY` | Discussion category name | No |
| `PUBLIC_GISCUS_CATEGORY_ID` | Giscus category ID | No |

## Project Structure

```
src/
  components/     # Astro components
  content/
    blog/         # Blog posts
    authors/      # Author profiles
    projects/     # Projects
    gallery/      # Photo galleries
  layouts/        # Page layouts
  lib/            # Utility functions
  pages/          # Route pages
  styles/         # Global CSS
  consts.ts       # Site configuration
public/           # Static assets
```

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with [astro-erudite](https://github.com/jktrn/astro-erudite) theme.
