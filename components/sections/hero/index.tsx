import { Field } from "@/components/field/field"
import { site } from "@/content/site"

import { HeroFooter } from "./hero-footer"
import { HeroHeading } from "./hero-heading"
import { HeroName } from "./hero-name"
import { HeroStatus } from "./hero-status"

const HEADING_ID = "hero-heading"

/**
 * First screen: the field behind, the outlined name over it, then the h1 and
 * status on top. The name comes first in the DOM so the text paints above it;
 * on phones `order` moves it between the h1 and the status, as on the canvas.
 */
export function Hero() {
  const { hero, nav, name, location, chrome } = site
  const target = nav.find((item) => item.id === hero.scroll.targetId) ?? nav[0]

  return (
    <section
      aria-labelledby={HEADING_ID}
      className="relative isolate flex min-h-dvh flex-col overflow-clip border-b"
    >
      <Field className="absolute inset-0 -z-10" />
      <div className="flex flex-1 flex-col px-page pt-26 pb-7">
        <div className="flex flex-col gap-y-6 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-10">
          <HeroName
            name={name}
            className="order-2 -ml-page md:absolute md:bottom-28 md:left-(--hang-name) md:order-none md:ml-0"
          />
          <HeroHeading id={HEADING_ID} lines={hero.lines} className="relative order-1 md:order-none" />
          <HeroStatus
            facts={hero.facts}
            timeZone={location.timeZone}
            className="relative order-3 md:order-none"
          />
        </div>
        <HeroFooter
          hint={hero.hint}
          scrollLabel={hero.scroll.label}
          target={target}
          cursor={chrome.cursor.scroll}
          className="relative mt-auto pt-10"
        />
      </div>
    </section>
  )
}
