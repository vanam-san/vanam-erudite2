import { SITE } from "@/consts"
import { getCollection, type CollectionEntry } from "astro:content"
import { isSubpost } from "@/lib/utils"

export async function getPinnedPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getPosts()
  return posts.filter((post) => post.data.pinned === true)
}

export function getPostsByYear(
  posts: CollectionEntry<"blog">[],
): Map<number, CollectionEntry<"blog">[]> {
  const grouped = new Map<number, CollectionEntry<"blog">[]>()
  for (const post of posts) {
    const year = post.data.date.getFullYear()
    const group = grouped.get(year)
    if (group) group.push(post)
    else grouped.set(year, [post])
  }
  return new Map([...grouped].sort(([a], [b]) => b - a))
}

export async function getGalleries(): Promise<CollectionEntry<"gallery">[]> {
  const galleries = await getCollection("gallery", ({ data }) => !data.draft)
  return galleries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export function getGalleriesByYear(
  galleries: CollectionEntry<"gallery">[],
): Map<number, CollectionEntry<"gallery">[]> {
  const grouped = new Map<number, CollectionEntry<"gallery">[]>()
  for (const gallery of galleries) {
    const year = gallery.data.date.getFullYear()
    const group = grouped.get(year)
    if (group) group.push(gallery)
    else grouped.set(year, [gallery])
  }
  return new Map([...grouped].sort(([a], [b]) => b - a))
}

export async function getRecentGalleries(
  count: number,
): Promise<CollectionEntry<"gallery">[]> {
  const galleries = await getGalleries()
  return galleries.slice(0, count)
}

export const pageTitle = (title: string) => `${title} | ${SITE.title}`

export async function getPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft)
  return posts
    .filter((post) => !isSubpost(post.id))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

export async function getSubposts(): Promise<
  Map<string, CollectionEntry<"blog">[]>
> {
  const posts = await getCollection(
    "blog",
    ({ id, data }) => !data.draft && id.split("/").length === 2,
  )
  posts.sort(
    (a, b) =>
      (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
      a.data.date.getTime() - b.data.date.getTime(),
  )
  return Map.groupBy(posts, (post) => post.id.split("/")[0])
}

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  return getCollection("projects", ({ data }) => !data.draft)
}

export type TagGroup = {
  blog: CollectionEntry<"blog">[]
  gallery: CollectionEntry<"gallery">[]
  projects: CollectionEntry<"projects">[]
}

export async function getAllTags(): Promise<Map<string, TagGroup>> {
  const posts = await getPosts()
  const series = await getSubposts()
  const galleries = await getGalleries()
  const projects = await getProjects()

  const tags = new Map<string, TagGroup>()

  function ensureTag(tag: string) {
    const key = tag.toLowerCase()
    if (!tags.has(key)) {
      tags.set(key, { blog: [], gallery: [], projects: [] })
    }
    return tags.get(key)!
  }

  for (const post of posts) {
    const chain = [post, ...(series.get(post.id) ?? [])]
    for (const tag of new Set(
      chain.flatMap((entry) => entry.data.tags ?? []),
    )) {
      ensureTag(tag).blog.push(post)
    }
  }

  for (const gallery of galleries) {
    for (const tag of gallery.data.tags ?? []) {
      ensureTag(tag).gallery.push(gallery)
    }
  }

  for (const project of projects) {
    for (const tag of project.data.tags ?? []) {
      ensureTag(tag).projects.push(project)
    }
  }

  return new Map(
    [...tags].sort(([a, groupA], [b, groupB]) => {
      const countA = groupA.blog.length + groupA.gallery.length + groupA.projects.length
      const countB = groupB.blog.length + groupB.gallery.length + groupB.projects.length
      return countB - countA || a.localeCompare(b)
    }),
  )
}

/** @deprecated Use getAllTags instead */
export async function getTags(): Promise<
  Map<string, CollectionEntry<"blog">[]>
> {
  const allTags = await getAllTags()
  return new Map(
    [...allTags].map(([tag, group]) => [tag, group.blog]),
  )
}
