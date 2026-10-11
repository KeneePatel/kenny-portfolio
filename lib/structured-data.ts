/*
 * Schema.org JSON-LD for search engines and AI assistants. Pure: route pages
 * pass content in and render the result with <JsonLd>. Every node about Kenny
 * shares one @id, so crawlers can tie the pages to the same person.
 */

const CONTEXT = "https://schema.org"

export type PersonFacts = {
  /** The site's origin, e.g. https://kennypatel.dev (no trailing slash). */
  url: string
  name: string
  alternateName: string
  jobTitle: string
  description: string
  image: string
  email: string
  city: string
  region: string
  country: string
  alumniOf: string[]
  knowsAbout: string[]
  sameAs: string[]
}

export const personId = (origin: string) => `${origin}/#person`
const websiteId = (origin: string) => `${origin}/#website`

/** The short reference other nodes use for Kenny (name and URL inline, for parsers that don't follow @id). */
function authorOf(origin: string, name: string) {
  return { "@type": "Person", "@id": personId(origin), name, url: `${origin}/` }
}

export function personNode(person: PersonFacts) {
  return {
    "@type": "Person",
    "@id": personId(person.url),
    name: person.name,
    alternateName: person.alternateName,
    url: `${person.url}/`,
    image: person.image,
    jobTitle: person.jobTitle,
    description: person.description,
    email: `mailto:${person.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: person.city,
      addressRegion: person.region,
      addressCountry: person.country,
    },
    alumniOf: person.alumniOf.map((name) => ({ "@type": "CollegeOrUniversity", name })),
    knowsAbout: person.knowsAbout,
    sameAs: person.sameAs,
  }
}

type HomePage = { title: string; description: string; siteName: string; language: string }

/** The homepage: Kenny, the site, and the profile page that's about him. */
export function homeGraph(person: PersonFacts, page: HomePage) {
  const origin = person.url
  return {
    "@context": CONTEXT,
    "@graph": [
      personNode(person),
      {
        "@type": "WebSite",
        "@id": websiteId(origin),
        url: `${origin}/`,
        name: page.siteName,
        description: page.description,
        inLanguage: page.language,
        publisher: { "@id": personId(origin) },
      },
      {
        "@type": "ProfilePage",
        "@id": `${origin}/#profile`,
        url: `${origin}/`,
        name: page.title,
        inLanguage: page.language,
        isPartOf: { "@id": websiteId(origin) },
        mainEntity: { "@id": personId(origin) },
      },
    ],
  }
}

type CaseStudyPage = {
  origin: string
  path: string
  /** The page's title for breadcrumbs (the project name). */
  name: string
  headline: string
  description: string
  image: string
  keywords: string[]
  language: string
  author: string
  home: string
  basedOn: { name: string; href: string }
}

/** A case study: the write-up as an Article based on the research report, plus its breadcrumb trail. */
export function caseStudyGraph(page: CaseStudyPage) {
  const { origin } = page
  const url = `${origin}${page.path}`
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: page.headline,
        description: page.description,
        url,
        mainEntityOfPage: url,
        image: page.image,
        inLanguage: page.language,
        keywords: page.keywords,
        author: authorOf(origin, page.author),
        publisher: authorOf(origin, page.author),
        isPartOf: { "@id": websiteId(origin) },
        isBasedOn: {
          "@type": "ScholarlyArticle",
          name: page.basedOn.name,
          url: page.basedOn.href,
          author: authorOf(origin, page.author),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: page.home, item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: page.name, item: url },
        ],
      },
    ],
  }
}
