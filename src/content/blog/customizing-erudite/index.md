---
title: "Customizing astro-erudite: What I Added to the Base Template"
description: "A walkthrough of every feature added to astro-erudite v2, from the bento homepage to Giscus comments."
date: 2026-07-30
authors:
  - vanam
tags:
  - v2
  - customization
---

astro-erudite v2 is a minimal, opinionated blogging template. Out of the box it gives you a blog, projects, an about page, and a sidebar. This post covers everything I added on top of that foundation.

## Bento grid homepage

A bento grid layout — a two-column card-based interface that surfaces content at a glance.

The grid is built with `BentoCard.astro`, a generic card wrapper that supports column and row spanning:

```astro
<BentoCard span={2} href="/about" class="bento-hero">
  <img src="..." alt="..." class="bento-hero-avatar" />
  <div class="bento-hero-name">Vanam-san</div>
  <div class="bento-hero-subtitle">Tinkerer</div>
  <p class="bento-hero-bio" data-reveal>...</p>
  <span class="bento-link">View full profile →</span>
</BentoCard>
```

The grid contains five card types:

- **Hero card** (full width) — avatar, name, subtitle, and a bio with a sequential character-reveal animation
- **Latest posts** — the two most recent blog entries with titles, descriptions, and dates
- **Latest gallery** — a card with an auto-cycling image slideshow that crossfades every 3 seconds
- **Projects** — the latest project with a link to the full projects page
- **Time and weather** (full width) — live clock, local weather via wttr.in, and timezone info

All cards share the same hover treatment: border highlight, background darkening, box shadow, and a 2px upward translate. The gallery card additionally scales its active slide to 1.05x on hover.

The entire grid collapses to a single column on viewports narrower than 40rem.

## Umami analytics

[Umami](https://umami.is/) — a privacy-focused, cookieless analytics tool.

Configuration lives in `consts.ts`:

```ts
export const UMAMI = {
  websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || "",
  host: import.meta.env.PUBLIC_UMAMI_HOST || "cloud.umami.is",
}
```

The tracking script is injected conditionally in `MetaHead.astro` — it only loads if `PUBLIC_UMAMI_WEBSITE_ID` is set:

```astro
{UMAMI.websiteId && (
  <script
    is:inline
    defer
    src={`https://${UMAMI.host}/script.js`}
    data-website-id={UMAMI.websiteId}
  />
)}
```

This means the template works identically without analytics configured. No cookies, no personal data collection, no GDPR banner needed.

## Giscus comments

[Giscus](https://giscus.app/) — uses GitHub Discussions as a backend.

The `Giscus.astro` component handles three things:

1. **Loading** — it creates a `<script>` tag pointing to `giscus.app/client.js` with the repo, category, and mapping configuration as data attributes.
2. **Theme syncing** — a `MutationObserver` watches `data-theme` on `<html>` and posts a `setConfig` message to the Giscus iframe whenever the theme changes.
3. **Re-initialization** — on View Transitions page loads (`astro:page-load` and `astro:after-swap`), it tears down the old iframe and script, then reloads fresh.

The component is conditionally rendered on blog posts:

```astro
{GISCUS.repo && GISCUS.repoId && GISCUS.categoryId && <Giscus />}
```

Like Umami, it requires no configuration to function — just set three environment variables and comments appear.

## Gallery system

A complete gallery feature with:

- **Content collection** — `gallery` entries with a title, description, date, cover image, and an array of photos
- **Listing page** — a responsive grid of `GalleryCard` components at `/gallery`
- **Detail pages** — individual gallery pages with a photo grid, lightbox, and optional Markdown content
- **Lightbox** — a full-screen overlay with prev/next navigation, keyboard support, and a photo counter
- **Homepage integration** — the latest gallery appears in the bento grid with an auto-cycling slideshow

The gallery card styling mirrors the blog and project cards: border, background, hover effects, and image scaling.

## Setup as a blog post

A dedicated setup blog post at `/blog/my-setup` showcasing hardware and software tools, instead of a standalone `/setup` page. This keeps all content in the blog collection and makes it easier to maintain alongside other posts.

## Scroll-to-top button

A `floating` variant of `ScrollToTop.astro` that renders as a fixed-position button in the bottom-right corner on mobile. It appears after scrolling past 50% of the viewport height and uses `backdrop-filter: blur()` for a translucent background.

```astro
<ScrollToTop floating />
```

This component is used on the homepage, blog posts, and gallery detail pages.

## Blog and project card hover effects

Blog and project cards were flat list items with no visual containment. I added card-like styling to match the gallery cards:

- `border: 1.5px solid var(--border)` with `border-radius: var(--radius-2xl)`
- `background-color: color-mix(in oklab, var(--muted) 20%, transparent)`
- Hover state: border brightens, background darkens, box shadow appears, card translates up 2px
- Image containers get `overflow: hidden` and `border-radius: var(--radius-xl)`, with images scaling to 1.05x on hover

## Sequential text reveal animation

The hero card bio on the homepage uses a character-by-character reveal animation. Each character is wrapped in a `<span>` with `opacity: 0.2`, then sequentially transitioned to `opacity: 1` over 3 seconds using `setTimeout` delays.

```js
const delayPerChar = totalDuration / spans.length
spans.forEach((span, i) => {
  setTimeout(() => {
    span.classList.add('revealed')
  }, i * delayPerChar)
})
```

The animation re-runs on View Transitions page swaps.

## Gallery slideshow

The bento homepage gallery card includes a slideshow that crossfades between the first four photos of the latest gallery. Each slide is absolutely positioned with `opacity: 0`, and a 3-second interval cycles the `active` class:

```js
setInterval(() => {
  slides[currentIndex].classList.remove('active')
  currentIndex = (currentIndex + 1) % slides.length
  slides[currentIndex].classList.add('active')
}, 3000)
```

The active slide additionally scales to 1.05x on card hover.

## Weather widget

The time/weather card on the homepage fetches live weather data from `wttr.in` — a free, API-key-less weather service. It maps WMO weather codes to emojis and displays temperature and description.

```js
const res = await fetch("https://wttr.in/?format=j1")
const data = await res.json()
const current = data.current_condition[0]
```

The clock updates every second using `setInterval`.

## Custom color theme — Midnight Galaxy

The base erudite template uses a simple light/dark scheme with neutral grays. I replaced it with a custom Midnight Galaxy palette — deep purples, cosmic blues, and lavender accents:

```css
:root {
  --background: var(--gray-1);   /* #0e0a14 dark, #f5f3f8 light */
  --primary:    var(--lavender-9); /* #6b5a90 dark, #a490c2 light */
  --secondary:  var(--cosmic-9);  /* #5a5eaf dark, #4a4e8f light */
}
```

The palette uses `light-dark()` for automatic light/dark mode support — no media query duplication. Each color is defined as a pair: a light variant and a dark variant resolved by the browser's `color-scheme`.

Glow effects are layered on interactive elements:

```css
--glow-purple: 0 0 20px color-mix(in oklab, var(--lavender-9) 25%, transparent);
--glow-cosmic: 0 0 20px color-mix(in oklab, var(--cosmic-9) 20%, transparent);
```

Cards, sidebar links, and the footer gradient all reference these tokens, keeping the visual language consistent.

## Typography — Fraunces display font

The base template uses a single sans-serif stack everywhere. I split typography into two roles:

- **Display (headings):** Fraunces — an optical variable serif with character, loaded via Google Fonts
- **Body:** IBM Plex Sans — already in the base, kept for readability
- **Mono:** IBM Plex Mono — for code and metadata

Fraunces is applied via a `--font-display` custom property and used on the sidebar brand, page titles, and bento hero name. The heading scale uses tighter tracking (`-0.02em` on large sizes) and a heavier weight (700) to create contrast against the body text.

```css
--font-display: "Fraunces", ui-serif, Georgia, serif;
```

The font is preconnected in `MetaHead.astro` and defined in `fonts.css` alongside the existing IBM Plex families.

## Vertical bar hover effect on list cards

Blog, gallery, and project cards all share a list-item layout (date | title | tags | meta). I added a 2px vertical accent bar on the left edge that animates in on hover — inspired by the Blowfish theme used on vanam.dev.

Each `<li>` gets `position: relative` and a `::before` pseudo-element:

```css
li::before {
  content: "";
  position: absolute;
  left: 0;
  top: var(--space-2xs);
  bottom: var(--space-2xs);
  width: 2px;
  background: var(--primary);
  opacity: 0;
  transform: scaleY(0);
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

li:hover::before {
  opacity: 1;
  transform: scaleY(1);
}
```

The bar scales from center using `scaleY`, giving a smooth reveal effect. The same pattern is applied to bento card post/project lists using the secondary (cosmic blue) accent.

## Unified tag system

The base v2 template has no tag infrastructure. I built a unified tag system that spans all three collections:

- **`getAllTags()`** in `content.ts` collects tags from blog, gallery, and projects into a single `Map<string, TagGroup>`
- **Tags index** at `/tags` shows all tags with total counts across collections
- **Tag detail pages** at `/tags/[id]` render matching items grouped by type (blog, gallery, projects)
- All tags are normalized to lowercase for consistency

```ts
type TagGroup = {
  blog: CollectionEntry<"blog">[]
  gallery: CollectionEntry<"gallery">[]
  projects: CollectionEntry<"projects">[]
}
```

Tags are clickable on every card and on the tag detail pages, creating cross-collection navigation.

## Gallery list layout with year sorting

The gallery started as a grid of cards with cover images. I converted it to a list layout matching the blog and project cards:

- Date, title, tags, photo count, and optional description in a grid
- Galleries sorted by year with year group headings
- Vertical bar hover effect matching other list cards
- Tags normalized to lowercase on display

The `getGalleriesByYear()` utility groups galleries by year and returns a `Map<number, Gallery[]>` sorted descending.

## Blog card alignment

The blog card was originally a different layout from gallery and project cards. I aligned all three to share the same structure:

| Column | Content |
|--------|---------|
| 1 (4.5rem) | Date in monospace |
| 2 (1fr) | Title as link |
| Full width | Tags in mono |
| Full width | Meta (words/time or photo count) |

Blog cards show `words · min read`, gallery cards show `N photos`, and project cards show an optional description. All use the same grid template, border treatment, and hover effects.

## Summary

| Feature | Added |
| - | - |
| Homepage | Bento grid with 5 card types |
| Analytics | Umami (cookieless) |
| Comments | Giscus (GitHub Discussions) |
| Galleries | Full gallery with lightbox |
| Setup | Blog post with hardware/software showcase |
| Scroll to top | Floating mobile button |
| Card hover effects | Blog, projects, vertical bar accent |
| Reading time + word count | Blog listing cards too |
| Text reveal animation | Hero card bio |
| Gallery slideshow | Auto-cycling bento card |
| Weather widget | Live wttr.in data |
| Color theme | Midnight Galaxy purple palette |
| Typography | Fraunces display + IBM Plex body |
| Tag system | Unified cross-collection tags |
| Gallery layout | List with year sorting |

Every addition follows the same principle as the base template: minimal JavaScript, native CSS, and no unnecessary dependencies. The Giscus and Umami integrations are the only external services, and both are optional — the site works fully without them configured.
