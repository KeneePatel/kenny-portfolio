import { OutlineText } from "@/components/signal/outline-text"
import { SectionHeading } from "@/components/signal/section-heading"
import { about } from "@/content/about"
import { site } from "@/content/site"
import { ordinal } from "@/lib/track"

import { Portrait } from "./portrait"
import { ThinkLoop } from "./think-loop"

const SECTION_ID = "about"
const HEADING_ID = "about-heading"

/**
 * 03 About: one statement (half filled, half outlined), a short bio, the
 * "How I think" loop, and the tilted portrait overlapping the column edge.
 */
export function AboutSection() {
  const { nav, chrome } = site
  const number = nav.find((item) => item.id === SECTION_ID)?.number ?? ordinal(3)
  const { statement } = about

  return (
    <section
      id={SECTION_ID}
      tabIndex={-1}
      aria-labelledby={HEADING_ID}
      className="px-page pt-28 md:pt-44"
    >
      <SectionHeading
        number={number}
        label={about.label}
        title={
          <>
            {statement.filled} <OutlineText>{statement.outlined}</OutlineText>
          </>
        }
        id={HEADING_ID}
      />
      <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:items-start lg:gap-14">
        <div className="flex min-w-0 flex-col gap-7 lg:flex-1">
          <p className="max-w-160 text-body text-foreground-2">{about.bio}</p>
          <ThinkLoop loop={about.loop} cursor={chrome.cursor.pick} />
        </div>
        <Portrait
          portrait={about.portrait}
          className="w-4/5 max-w-95 self-center lg:mt-10 lg:-ml-6 lg:w-95 lg:shrink-0 lg:self-start"
        />
      </div>
    </section>
  )
}
