import type { TimelineItem } from "@/content/types"
import { activeIn, labelAlign, percentAt, type Range, type Span } from "@/lib/timeline"
import { cn } from "@/lib/utils"

export type LaneItem = TimelineItem & { span: Span }

type TimelineLaneProps = {
  name: string
  quiet?: boolean
  items: LaneItem[]
  year: number
  yearIndex: number
  yearCount: number
  range: Range
  now: number
}

/** Bar colour: technical work is a strong 6px bar, other work a 2px grey line. */
function barClass(item: LaneItem, active: boolean) {
  if (item.hollow) return cn("h-1.5 border", active ? "border-primary" : "border-muted-foreground")
  if (item.kind === "other") return cn("h-0.5", active ? "bg-foreground-2" : "bg-border")
  return cn("h-1.5", active ? "bg-primary" : "bg-muted-foreground")
}

/**
 * One lane of the timeline: its label, the accent band for the chosen year,
 * the "now" line, and one row (label + bar) per item. Never colour alone:
 * active items also get full-strength labels and the band behind them.
 */
export function TimelineLane({ name, quiet, items, year, yearIndex, yearCount, range, now }: TimelineLaneProps) {
  return (
    <div className="flex gap-5 border-t">
      <div
        className={cn(
          "w-30 shrink-0 py-3.5 font-mono text-label uppercase",
          quiet ? "text-muted-foreground" : "text-foreground"
        )}
      >
        {name}
      </div>
      <div className="relative flex-1 pt-2.5 pb-3">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 bg-primary/10 transition-[translate] duration-(--duration-band) ease-in-out"
          style={{ width: `${100 / yearCount}%`, translate: `${yearIndex * 100}% 0` }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-primary"
          style={{ left: `${percentAt(now, range)}%` }}
        />
        {items.map((item) => {
          const active = activeIn(item.span, year)
          const start = percentAt(item.span.start, range)
          const end = percentAt(item.span.end, range)
          return (
            <div key={item.id} className="relative h-10">
              <p
                className={cn(
                  "absolute top-0 text-sm leading-tight whitespace-nowrap transition-colors duration-(--duration-quick)",
                  item.kind === "other" ? "font-normal" : "font-semibold",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
                style={labelAlign(item.span, range) === "end" ? { right: `${100 - end}%` } : { left: `${start}%` }}
              >
                {item.title}{" "}
                <span className="font-mono text-xs font-normal text-muted-foreground">{item.dates}</span>
              </p>
              <span
                aria-hidden="true"
                className={cn("absolute top-5 transition-colors duration-(--duration-quick)", barClass(item, active))}
                style={{ left: `${start}%`, width: `${end - start}%` }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
