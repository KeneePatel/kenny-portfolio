import { cn } from "@/lib/utils"

import { MonoLabel } from "./mono-label"
import { OutlineText } from "./outline-text"

type SectionHeadingProps = {
  /** Giant outlined section number (decorative; hidden from screen readers). */
  number: string
  label: React.ReactNode
  /** Heading text; may mix filled text and <OutlineText>. */
  title: React.ReactNode
  /** id for the h2, so the section can use aria-labelledby. */
  id: string
  /** Controls on the right (counters, prev/next, filters). */
  children?: React.ReactNode
  className?: string
}

export function SectionHeading({
  number,
  label,
  title,
  id,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-10 gap-y-6",
        className
      )}
    >
      {/* Stacked on phones so the number never pushes the title off-screen. */}
      <div className="flex min-w-0 flex-col items-start gap-4 md:flex-row md:items-end lg:gap-8">
        <OutlineText
          aria-hidden="true"
          className="ml-(--hang-numeral) text-numeral font-stretch-(--stretch-display)"
        >
          {number}
        </OutlineText>
        <div className="flex min-w-0 flex-col gap-2.5 pb-1.5">
          <MonoLabel>{label}</MonoLabel>
          <h2 id={id} className="text-section text-balance">
            {title}
          </h2>
        </div>
      </div>
      {children ? (
        <div className="flex items-center gap-3.5">{children}</div>
      ) : null}
    </div>
  )
}
