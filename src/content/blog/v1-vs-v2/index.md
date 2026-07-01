---
title: "Customizing astro-erudite: What I Added to the Base Template"
description: "A walkthrough of every feature added on top of the stock astro-erudite v2 template, from the bento homepage to Giscus comments."
date: 2026-06-14
authors:
  - vanam
tags:
  - v2
  - customization
---

astro-erudite v2 is a minimal, opinionated blogging template. Out of the box it gives you a blog, projects, an about page, and a sidebar. This post covers everything I added on top of that foundation.

## Bento grid homepage

The stock v2 homepage is a dictionary-style entry with a title, pronunciation, and a short description. I replaced it with a bento grid layout — a two-column card-based interface that surfaces content at a glance.

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

v2 ships with no analytics. I added [Umami](https://umami.is/), a privacy-focused, cookieless analytics tool.

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

v2 has no comment system. I integrated [Giscus](https://giscus.app/), which uses GitHub Discussions as a backend.

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

v2 has no gallery or photo collection. I added a complete gallery feature with:

- **Content collection** — `gallery` entries with a title, description, date, cover image, and an array of photos
- **Listing page** — a responsive grid of `GalleryCard` components at `/gallery`
- **Detail pages** — individual gallery pages with a photo grid, lightbox, and optional Markdown content
- **Lightbox** — a full-screen overlay with prev/next navigation, keyboard support, and a photo counter
- **Homepage integration** — the latest gallery appears in the bento grid with an auto-cycling slideshow

The gallery card styling mirrors the blog and project cards: border, background, hover effects, and image scaling.

## Setup as a blog post

The original v2 template had no setup or "uses" page. I added a dedicated setup blog post at `/blog/my-setup` showcasing hardware and software tools, instead of a standalone `/setup` page. This keeps all content in the blog collection and makes it easier to maintain alongside other posts.

## Scroll-to-top button

v2's `ScrollToTop.astro` component is used only inside the sidebar on desktop. I added a `floating` variant that renders as a fixed-position button in the bottom-right corner on mobile. It appears after scrolling past 50% of the viewport height and uses `backdrop-filter: blur()` for a translucent background.

```astro
<ScrollToTop floating />
```

This component is used on the homepage, blog posts, and gallery detail pages.

## Blog and project card hover effects

The stock v2 blog and project cards are flat list items with no visual containment. I added card-like styling to match the gallery cards:

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

## Summary

| Feature | Base v2 | Added |
| - | - | - |
| Homepage | Dictionary entry | Bento grid with 5 card types |
| Analytics | None | Umami (cookieless) |
| Comments | None | Giscus (GitHub Discussions) |
| Galleries | None | Full gallery with lightbox |
| Setup | None | Blog post with hardware/software showcase |
| Scroll to top | Sidebar only | Floating mobile button |
| Card hover effects | Gallery only | Blog, projects |
| Reading time + word count | Post page only | Blog listing cards too |
| Text reveal animation | None | Hero card bio |
| Gallery slideshow | None | Auto-cycling bento card |
| Weather widget | None | Live wttr.in data |

Every addition follows the same principle as the base template: minimal JavaScript, native CSS, and no unnecessary dependencies. The Giscus and Umami integrations are the only external services, and both are optional — the site works fully without them configured.
