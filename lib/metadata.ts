import type { Metadata } from "next"

type Images = NonNullable<Metadata["openGraph"]>["images"]

type PageMetadata = {
  /** Site-relative path; metadataBase in the root layout makes it absolute. */
  path: string
  title: string
  description: string
  siteName: string
  type?: "website" | "article"
  /** Nested routes pass their parent's share images, which Next drops when a page sets openGraph. */
  images?: { openGraph?: Images; twitter?: NonNullable<Metadata["twitter"]>["images"] }
}

/**
 * One page's title, description, canonical URL and link-preview fields.
 * Next replaces the layout's whole `openGraph` and `twitter` objects when a
 * page sets them, so this fills every field. The homepage gets the share
 * image from app/opengraph-image.png in its own segment; deeper pages must
 * pass it on through `images`.
 */
export function pageMetadata({ path, title, description, siteName, type = "website", images }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    // Only set `images` when passed: even `images: undefined` hides the file-based image.
    openGraph: { type, siteName, url: path, title, description, ...(images?.openGraph && { images: images.openGraph }) },
    twitter: { card: "summary_large_image", title, description, ...(images?.twitter && { images: images.twitter }) },
  }
}
