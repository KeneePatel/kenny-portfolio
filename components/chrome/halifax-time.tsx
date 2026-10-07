"use client"

import { useHalifaxClock } from "@/hooks/use-halifax-clock"
import { cn } from "@/lib/utils"
import { formatClock, minuteToDate } from "@/lib/time"

// Same character count as the formatted time, so the slot keeps its width before mount.
const PLACEHOLDER = { zone: "--:-- ---", bare: "--:--" }

/** Live local time for a zone, e.g. "21:28 ADT" (or "21:28"). Rendered only after mount. */
export function HalifaxTime({
  timeZone,
  zone = true,
  className,
}: {
  timeZone: string
  /** Show the zone abbreviation ("ADT" / "AST"). */
  zone?: boolean
  className?: string
}) {
  const minute = useHalifaxClock()

  if (minute === null) {
    return (
      <span aria-hidden="true" className={cn("invisible", className)}>
        {zone ? PLACEHOLDER.zone : PLACEHOLDER.bare}
      </span>
    )
  }

  const date = minuteToDate(minute)
  return (
    <time dateTime={date.toISOString()} className={className}>
      {formatClock(date, timeZone, { zone })}
    </time>
  )
}
