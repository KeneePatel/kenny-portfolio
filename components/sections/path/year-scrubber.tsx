"use client"

import { useState } from "react"

import { monoLabelVariants } from "@/components/signal/mono-label"
import { OutlineText } from "@/components/signal/outline-text"
import { SectionHeading } from "@/components/signal/section-heading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { PathCopy, TimelineItem } from "@/content/types"
import { activeIn, monthStart, rangeOf, spanOf, yearsThrough } from "@/lib/timeline"
import { fillTemplate } from "@/lib/track"
import { cn } from "@/lib/utils"

import { TimelineLane } from "./timeline-lane"

type YearScrubberProps = {
  number: string
  headingId: string
  copy: PathCopy
  items: TimelineItem[]
  /** Education, rendered on the server, closes the section beside "In {year}". */
  children: React.ReactNode
}

/**
 * Year buttons 2019–now (pressed state, arrow keys); the chosen year gets an
 * amber band across the lanes (450 ms; jumps with reduced motion) and a
 * politely announced "In {year}" list. On phones the timeline scrolls inside
 * its own area, never the page.
 */
export function YearScrubber({ number, headingId, copy, items, children }: YearScrubberProps) {
  const [year, setYear] = useState(copy.defaultYear)
  const years = yearsThrough(copy.firstYear, copy.asOf)
  const range = rangeOf(years)
  const now = monthStart(copy.asOf)
  const spans = items.map((item) => ({ ...item, span: spanOf(item, copy.asOf) }))
  const inYear = spans.filter((item) => activeIn(item.span, year))

  return (
    <>
      <SectionHeading number={number} label={copy.label} title={copy.title} id={headingId}>
        <OutlineText aria-hidden="true" className="text-year">
          {year}
        </OutlineText>
      </SectionHeading>

      <ScrollArea
        orientation="horizontal"
        className="mt-8 lg:mt-12"
        viewportClassName="focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-solid focus-visible:outline-ring"
      >
        <div className="min-w-190 pb-3 md:min-w-0">
          <div className="flex gap-5">
            <div className="w-30 shrink-0" />
            <ToggleGroup
              aria-label={copy.yearsLabel}
              value={[String(year)]}
              // Pressing the chosen year again would clear the group; keep it.
              onValueChange={(value) => {
                const next = Number(value[0])
                if (years.includes(next)) setYear(next)
              }}
              variant="year"
              size="year"
              className="w-full flex-1 gap-0"
            >
              {years.map((y) => (
                <ToggleGroupItem key={y} value={String(y)} data-cursor={y === year ? undefined : String(y)}>
                  {y}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          {copy.lanes.map((lane) => (
            <TimelineLane
              key={lane.id}
              name={lane.name}
              quiet={lane.quiet}
              items={spans.filter((item) => item.lane === lane.id)}
              year={year}
              yearIndex={years.indexOf(year)}
              yearCount={years.length}
              range={range}
              now={now}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="mt-8 flex flex-col gap-10 border-t border-foreground pt-5 md:flex-row md:gap-14">
        <div className="flex flex-col gap-2 md:flex-1">
          <h3 className={monoLabelVariants({ tone: "accent" })}>
            {fillTemplate(copy.inYear, { year })}
          </h3>
          <ul aria-live="polite" className="flex flex-col gap-1.5">
            {inYear.map((item) => (
              <li key={item.id} className={cn("text-body", item.lane === "other" && "text-muted-foreground")}>
                {item.title}{" "}
                <span className="font-mono text-xs text-muted-foreground">{item.dates}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:flex-2">{children}</div>
      </div>
    </>
  )
}
