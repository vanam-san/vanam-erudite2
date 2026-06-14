import type { SvgComponent } from "astro/types"
import Email from "@/assets/icons/email.svg"
import GitHub from "@/assets/icons/github.svg"
import RSS from "@/assets/icons/rss.svg"
import Twitter from "@/assets/icons/twitter.svg"

export const SITE = {
  title: "vanam-erudite",
  description: "An opinionated, unstyled blogging template built with Astro.",
  locale: "en-US",
  dir: "ltr",
  //defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
} as const

export const NAVIGATION = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/authors", label: "Authors" },
  { href: "/setup", label: "Setup" },
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com", label: "GitHub", icon: GitHub },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "mailto:your@email.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]

export const UMAMI = {
  websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || "",
  host: import.meta.env.PUBLIC_UMAMI_HOST || "cloud.umami.is",
}

export const GISCUS = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO || "",
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID || "",
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY || "Comments",
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID || "",
}
