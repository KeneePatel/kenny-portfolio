import { archive, archiveCopy } from "@/content/archive"
import { site } from "@/content/site"
import { ordinal } from "@/lib/track"

import { ArchiveFilter } from "./archive-filter"

const SECTION_ID = "archive"
const HEADING_ID = "archive-heading"

/** 02 Archive: everything that isn't featured, filterable by area. */
export function ArchiveSection() {
  const { nav, chrome } = site
  const number = nav.find((item) => item.id === SECTION_ID)?.number ?? ordinal(2)

  return (
    <section
      id={SECTION_ID}
      tabIndex={-1}
      aria-labelledby={HEADING_ID}
      className="px-page pt-28 md:pt-44"
    >
      <ArchiveFilter
        number={number}
        headingId={HEADING_ID}
        copy={archiveCopy}
        items={archive}
        cursor={{ filter: chrome.cursor.filter, open: chrome.cursor.open }}
      />
    </section>
  )
}
