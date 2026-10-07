import { HalifaxTime } from "@/components/chrome/halifax-time"
import { Field } from "@/components/field/field"
import { CopyButton } from "@/components/signal/copy-button"
import { OutlineText } from "@/components/signal/outline-text"
import { SectionHeading } from "@/components/signal/section-heading"
import { contact } from "@/content/contact"
import { site } from "@/content/site"
import { ordinal } from "@/lib/track"

const SECTION_ID = "contact"
const HEADING_ID = "contact-heading"

// Phones: each link is a 52px row between rules. Tablet+: one wrapping line.
const row = "flex min-h-13 flex-wrap items-center gap-3 border-t md:min-h-11 md:border-0"

/**
 * 07 Contact: the ending. The field returns fully calm (every dot on the
 * clean wave), so the page starts in noise and ends in signal.
 */
export function ContactSection() {
  const { nav, chrome, email, links, contactLinks, location } = site
  const number = nav.find((item) => item.id === SECTION_ID)?.number ?? ordinal(7)
  const { cursor } = chrome

  return (
    <section
      id={SECTION_ID}
      tabIndex={-1}
      aria-labelledby={HEADING_ID}
      className="relative isolate min-h-190 overflow-clip pt-28 pb-16 md:pt-44"
    >
      <Field variant="calm" className="absolute inset-0 -z-10" />
      <div className="flex flex-col gap-10 px-page">
        <SectionHeading
          number={number}
          label={contact.label}
          size="display"
          title={
            <>
              {contact.title.filled} <OutlineText>{contact.title.outlined}</OutlineText>
            </>
          }
          id={HEADING_ID}
        />
        <ul className="flex flex-col text-tool md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-4">
          <li className={row}>
            <a href={`mailto:${email}`} data-cursor={cursor.write} className="inline-flex min-h-11 items-center">
              <span className="link-rule">{email}</span>
            </a>
            <CopyButton value={email} labels={contact.copy} cursor={cursor.copy} />
          </li>
          <li className={row}>
            <a href={links.github} rel="noopener noreferrer" data-cursor={cursor.open} className="inline-flex min-h-11 items-center">
              <span className="link-rule">{contactLinks.github}</span>
              <span aria-hidden="true">&nbsp;↗</span>
            </a>
          </li>
          <li className={`${row} border-b md:border-b-0`}>
            <a href={links.linkedin} rel="noopener noreferrer" data-cursor={cursor.open} className="inline-flex min-h-11 items-center">
              <span className="link-rule">{contactLinks.linkedin}</span>
              <span aria-hidden="true">&nbsp;↗</span>
            </a>
          </li>
        </ul>
        <p className="font-mono text-data text-foreground-2">
          <span aria-hidden="true" className="text-amber-text">●</span> {contact.live.before}{" "}
          <HalifaxTime timeZone={location.timeZone} zone={false} /> {contact.live.after}
        </p>
      </div>
    </section>
  )
}
