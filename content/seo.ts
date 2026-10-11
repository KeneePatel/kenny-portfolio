import type { PersonFacts } from "@/lib/structured-data"

import { about } from "./about"
import { site } from "./site"
import { stack } from "./stack"

/*
 * Kenny as search engines and AI assistants see him (JSON-LD on the homepage).
 * Nothing new here: every fact comes from the other content files.
 */
export const language = "en"

export const person: PersonFacts = {
  url: site.url,
  name: site.name,
  alternateName: site.identity.alternateName,
  jobTitle: site.role,
  description: about.bio,
  image: `${site.url}${about.portrait.src}`,
  email: site.email,
  city: site.location.city,
  region: site.location.region,
  country: site.identity.country,
  alumniOf: site.identity.alumniOf,
  knowsAbout: [...new Set(stack.flatMap((layer) => layer.tools))],
  sameAs: [site.links.github, site.links.linkedin],
}
