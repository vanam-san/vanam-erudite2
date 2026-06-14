# vanam-eruditev2

A personal portfolio and blog built with [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/). Based on the v2 of [astro-erudite](https://github.com/jktrn/astro-erudite) theme by [enscribe](https://enscribe.dev).

> **Note:** This project was modified and configured using [opencode](https://opencode.ai) with the **MiMo V2.5 Free** LLM. I am not a coder, so there may be mistakes or incomplete configurations. Contributions and corrections are welcome!

## Tech Stack

| Category   | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Framework  | [Astro](https://astro.build/)                        |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com/)          |
| Components | [shadcn/ui](https://ui.shadcn.com/)                  |
| Content    | [MDX](https://mdxjs.com/)                            |
| Codeblocks | [Expressive Code](https://expressive-code.com/)      |

## Features

- Astro Islands architecture for selective hydration
- Light/dark theme support via shadcn/ui conventions
- MDX blog authoring with LaTeX math (KaTeX)
- RSS feed and sitemap generation
- SEO optimization with Open Graph tags
- View Transitions for smooth route animations
- Syntax highlighting with Expressive Code
- Giscus comment system on blog posts
- Umami analytics integration


## Project Structure

```
src/
  components/    # Astro and React components
  content/       # Blog posts, authors, projects (MDX)
  layouts/       # Page layouts
  lib/           # Utility functions
  pages/         # Route pages
  styles/        # Global CSS
public/          # Static assets (favicons, fonts, images)
```

## Adding Content

### Blog Posts

Create `.mdx` files in `src/content/blog/`:

```yml
---
title: 'Your Post Title'
description: 'A brief description'
date: 2024-01-01
tags: ['tag1', 'tag2']
image: './image.png'
authors: ['author-name']
draft: false
---
```

### Authors

Add author profiles in `src/content/authors/` as Markdown files.

### Projects

Add projects in `src/content/projects/` as Markdown files.

## Configuration

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

| Variable | Description | Required |
| --- | --- | --- |
| `PUBLIC_UMAMI_WEBSITE_ID` | Your Umami website ID | No (analytics disabled if empty) |
| `PUBLIC_UMAMI_HOST` | Umami host domain | No (defaults to `cloud.umami.is`) |
| `PUBLIC_GISCUS_REPO` | GitHub repo in `owner/repo` format | No (comments disabled if empty) |
| `PUBLIC_GISCUS_REPO_ID` | Giscus repo ID from giscus.app | No (comments disabled if empty) |
| `PUBLIC_GISCUS_CATEGORY` | Discussion category name | No (defaults to `Comments`) |
| `PUBLIC_GISCUS_CATEGORY_ID` | Giscus category ID from giscus.app | No (comments disabled if empty) |

> **Note:** `.env` is gitignored. Never commit secrets to version control.

### Umami Analytics

1. Sign up at [Umami Cloud](https://cloud.umami.is) or self-host an [Umami instance](https://github.com/umami-software/umami)
2. Add a website in the Umami dashboard and copy the **Website ID**
3. Set `PUBLIC_UMAMI_WEBSITE_ID` in your `.env`
4. If self-hosted, set `PUBLIC_UMAMI_HOST` to your domain (e.g., `umami.yourdomain.com`)

Analytics only load when `PUBLIC_UMAMI_WEBSITE_ID` is set. SPA page-view tracking is handled automatically via View Transitions.

### Giscus Comments

1. Enable **Discussions** on your GitHub repo
2. Go to [giscus.app](https://giscus.app) and enter your repo details
3. Select your Discussion category (must match exactly)
4. Copy the generated values into your `.env`:
   - `PUBLIC_GISCUS_REPO` — your repo in `owner/repo` format
   - `PUBLIC_GISCUS_REPO_ID` — the `data-repo-id` value
   - `PUBLIC_GISCUS_CATEGORY` — the discussion category name
   - `PUBLIC_GISCUS_CATEGORY_ID` — the `data-category-id` value

Comments only render on blog posts when `repo`, `repoId`, and `categoryId` are all set. Theme syncs automatically with light/dark mode.

### Site Metadata

Edit `src/consts.ts` to update site metadata, navigation links, and social links. Social link placeholders (`your-username`, `your-handle`, etc.) must be replaced with your actual profiles.

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with the [astro-erudite](https://github.com/jktrn/astro-erudite) theme, modified using [opencode](https://opencode.ai) with MiMo V2.5 Free LLM.