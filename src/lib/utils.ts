export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export const isSubpost = (id: string) => id.includes("/")

export const subpostSlug = (id: string) => id.split("/")[1]

export const normalizePath = (pathname: string) => {
  try {
    return decodeURIComponent(pathname).replace(/\/+$/, "")
  } catch {
    return pathname.replace(/\/+$/, "")
  }
}

export const hashId = (hash: string) => decodeURIComponent(hash.slice(1))

export function getWordCount(body: string): number {
  const text = body.replace(/<[^>]*>/g, "").replace(/[#*_~`>\-|]/g, "")
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

export function getReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 238)
}
