import { PillTag } from "@/components/signal/pill-tag"
import { ThemeToggle } from "@/components/signal/theme-toggle"
import type { Site } from "@/content/types"

import { HalifaxTime } from "./halifax-time"
import { HomeMark } from "./home-mark"
import { Menu } from "./menu"

/**
 * The top bar: the logo, then the Halifax clock, theme and Menu pills.
 * A zero-height sticky header, so it floats over the page without taking space.
 * Below 768px the clock hides and the theme switch moves into the menu.
 */
export function Chrome({ site }: { site: Site }) {
  const { chrome, location } = site

  return (
    <header className="sticky top-0 z-(--z-chrome) h-0">
      {/* The empty middle of the bar lets pointer events through to the page. */}
      <div className="pointer-events-none flex items-center justify-between gap-4 px-page py-5 *:pointer-events-auto">
        <HomeMark
          name={site.name}
          label={chrome.homeLabel}
          cursor={chrome.cursor.home}
        />
        <div className="flex items-center gap-2.5">
          <PillTag className="hidden font-mono text-xs md:inline-flex">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
            {location.city}
            <HalifaxTime timeZone={location.timeZone} />
          </PillTag>
          <ThemeToggle labels={chrome.theme} className="hidden md:inline-flex" />
          <Menu site={site} />
        </div>
      </div>
    </header>
  )
}
