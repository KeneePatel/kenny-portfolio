import { site } from "@/content/site"
import { path, timeline } from "@/content/timeline"
import { ordinal } from "@/lib/track"

import { Education } from "./education"
import { YearScrubber } from "./year-scrubber"

const SECTION_ID = "path"
const HEADING_ID = "path-heading"

/** 05 Path: the years so far, lane by lane, closed by Education. */
export function PathSection() {
  const number = site.nav.find((item) => item.id === SECTION_ID)?.number ?? ordinal(5)

  return (
    <section
      id={SECTION_ID}
      tabIndex={-1}
      aria-labelledby={HEADING_ID}
      className="px-page pt-28 md:pt-44"
    >
      <YearScrubber number={number} headingId={HEADING_ID} copy={path} items={timeline}>
        <Education education={path.education} cursor={site.chrome.cursor.open} />
      </YearScrubber>
    </section>
  )
}
