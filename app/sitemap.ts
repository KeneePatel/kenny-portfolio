import type { MetadataRoute } from "next"

import { caseStudies } from "@/content/case-studies"
import { site } from "@/content/site"

// Built once at `next build` into out/sitemap.xml (static export).
export const dynamic = "force-static"

/** Every page worth indexing: the homepage and each case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/` },
    ...caseStudies.map(({ slug }) => ({ url: `${site.url}/work/${slug}` })),
  ]
}
