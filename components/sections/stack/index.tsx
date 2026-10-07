import { SectionHeading } from "@/components/signal/section-heading"
import { site } from "@/content/site"
import { stack, stackCopy } from "@/content/stack"
import { ordinal } from "@/lib/track"

import { StackLayers } from "./stack-layers"

const SECTION_ID = "toolkit"
const HEADING_ID = "toolkit-heading"

/** 04 Toolkit: the stack as six layers you can open. */
export function StackSection() {
  const { nav, chrome } = site
  const number = nav.find((item) => item.id === SECTION_ID)?.number ?? ordinal(4)

  return (
    <section
      id={SECTION_ID}
      tabIndex={-1}
      aria-labelledby={HEADING_ID}
      className="px-page pt-28 md:pt-44"
    >
      <SectionHeading
        number={number}
        label={stackCopy.label}
        title={stackCopy.title}
        id={HEADING_ID}
      />
      <StackLayers
        layers={stack}
        copy={stackCopy}
        cursor={{ open: chrome.cursor.open, close: chrome.cursor.close }}
      />
    </section>
  )
}
