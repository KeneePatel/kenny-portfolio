import type { FooterCopy, Site } from "@/content/types"

const link = "inline-flex min-h-11 items-center"

/** One quiet mono row on a hairline: who and where, links, © and back to top. */
export function SiteFooter({ site, copy }: { site: Site; copy: FooterCopy }) {
  const { name, email, links, contactLinks, chrome } = site

  return (
    <footer className="flex flex-col gap-x-8 gap-y-1 border-t px-page pt-4 pb-8 font-mono text-xs text-foreground-2 md:flex-row md:flex-wrap md:items-center md:justify-between">
      <p className="flex min-h-11 items-center text-foreground">
        {name} · {copy.place}
      </p>
      <ul className="flex flex-wrap gap-x-5">
        <li>
          <a href={links.github} rel="noopener noreferrer" className={link}>
            <span className="link-rule">{contactLinks.github}</span>
          </a>
        </li>
        <li>
          <a href={links.linkedin} rel="noopener noreferrer" className={link}>
            <span className="link-rule">{contactLinks.linkedin}</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${email}`} className={link}>
            <span className="link-rule">{contactLinks.email}</span>
          </a>
        </li>
      </ul>
      <p className="flex items-center gap-5">
        <span>{copy.copyright}</span>
        <a href="#top" data-cursor={chrome.cursor.home} className={link}>
          {copy.backToTop}
        </a>
      </p>
    </footer>
  )
}
