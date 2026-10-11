import type { MetadataRoute } from "next"

import { site } from "@/content/site"

// Built once at `next build` into out/robots.txt (static export). Cloudflare
// adds its content-signals comment block above these rules when it serves it.
export const dynamic = "force-static"

/** Everyone may crawl everything, AI assistants included; the sitemap lists the pages. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
