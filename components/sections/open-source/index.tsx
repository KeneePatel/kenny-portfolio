import { OutlineText } from "@/components/signal/outline-text"
import { SectionHeading } from "@/components/signal/section-heading"
import { openSource, openSourceCopy } from "@/content/open-source"
import { site } from "@/content/site"

const SECTION_ID = "open-source"
const HEADING_ID = "open-source-heading"

/**
 * 06 Open source: the page's one raised band (full-bleed surface, 2px accent
 * top rule) with a diff-style log. Server-only: nothing here is interactive.
 */
export function OpenSourceSection() {
  const { number, label, title } = openSourceCopy

  return (
    <section
      id={SECTION_ID}
      tabIndex={-1}
      aria-labelledby={HEADING_ID}
      className="mt-28 border-t-2 border-primary bg-card px-page py-16 md:mt-44 md:py-28"
    >
      <SectionHeading
        number={number}
        label={label}
        title={
          <>
            <span className="block">{title.filled}</span>
            <OutlineText className="block">{title.outlined}</OutlineText>
          </>
        }
        id={HEADING_ID}
      />
      <ul className="mt-8 border-t border-foreground lg:mt-14">
        {openSource.map((entry) => (
          <li
            key={entry.title}
            className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b py-3.5"
          >
            <span aria-hidden="true" className="w-6 shrink-0 font-mono text-data text-amber-text md:w-12">
              +
            </span>
            <span className="min-w-0 flex-1 text-list">
              {entry.href ? (
                <a href={entry.href} rel="noopener noreferrer" data-cursor={site.chrome.cursor.open}>
                  <span className="link-rule">{entry.title}</span>
                </a>
              ) : (
                entry.title
              )}
            </span>
            <span className="basis-full pl-12 font-mono text-xs text-foreground-2 md:basis-48 md:pl-0">
              {entry.type}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
