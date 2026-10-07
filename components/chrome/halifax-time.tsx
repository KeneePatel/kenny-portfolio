"use client"

import { useHalifaxClock } from "@/hooks/use-halifax-clock"
import { cn } from "@/lib/utils"
import { formatClock, minuteToDate } from "@/lib/time"

// Same character count as "21:28 ADT", so the mono slot keeps its width before mount.
const PLACEHOLDER = "--:-- ---"

/** Live local time for a zone, e.g. "21:28 ADT". Rendered only after mount. */
export function HalifaxTime({
  timeZone,
  className,
}: {
  timeZone: string
  className?: string
}) {
  const minute = useHalifaxClock()

  if (minute === null) {
    return (
      <span aria-hidden="true" className={cn("invisible", className)}>
        {PLACEHOLDER}
      </span>
    )
  }

  const date = minuteToDate(minute)
  return (
    <time dateTime={date.toISOString()} className={className}>
      {formatClock(date, timeZone)}
    </time>
  )
}
