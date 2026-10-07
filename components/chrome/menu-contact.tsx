import { ThemeToggle } from "@/components/signal/theme-toggle"
import type { Site } from "@/content/types"
import { cn } from "@/lib/utils"

import { HalifaxTime } from "./halifax-time"

const linkTarget = "inline-flex min-h-11 items-center"

/** The menu's corner: where Kenny is, what he's after, how to reach him. */
export function MenuContact({
  site,
  className,
}: {
  site: Site
  className?: string
}) {
  const { location, status, email, links, contactLinks, chrome } = site

  return (
    <div
      className={cn("flex max-w-80 flex-col gap-3.5 font-mono text-data", className)}
    >
      <p className="text-muted-foreground">
        {location.city}, {location.region} ·{" "}
        <HalifaxTime timeZone={location.timeZone} />
      </p>
      <p>{status}</p>
      <ul className="flex flex-wrap gap-x-4.5">
        <li>
          <a href={`mailto:${email}`} className={linkTarget}>
            <span className="link-rule">{contactLinks.email}</span>
          </a>
        </li>
        <li>
          <a href={links.github} rel="noopener noreferrer" className={linkTarget}>
            <span className="link-rule">{contactLinks.github}</span>
            <span aria-hidden="true">&nbsp;↗</span>
          </a>
        </li>
        <li>
          <a href={links.linkedin} rel="noopener noreferrer" className={linkTarget}>
            <span className="link-rule">{contactLinks.linkedin}</span>
            <span aria-hidden="true">&nbsp;↗</span>
          </a>
        </li>
      </ul>
      {/* Phones: the theme switch lives here, at thumb height, instead of the top bar. */}
      <ThemeToggle layout="row" labels={chrome.theme} className="md:hidden" />
    </div>
  )
}
