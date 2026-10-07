"use client"

import { useState } from "react"

import { SectionHeading } from "@/components/signal/section-heading"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { ArchiveCopy, ArchiveItem } from "@/content/types"
import { areasInUse, filterByArea, toAreaFilter, type AreaFilter } from "@/lib/archive"
import { fillTemplate, ordinal } from "@/lib/track"

import { ArchiveRow } from "./archive-row"

type ArchiveFilterProps = {
  number: string
  headingId: string
  copy: ArchiveCopy
  items: ArchiveItem[]
  cursor: { filter: string; open: string }
}

/**
 * Area filters (single choice, pressed state from Base UI's toggle group, arrow
 * keys between chips) and the list they filter. Only areas with projects get a
 * chip; the count is announced politely as it changes.
 */
export function ArchiveFilter({ number, headingId, copy, items, cursor }: ArchiveFilterProps) {
  const [filter, setFilter] = useState<AreaFilter>("all")
  const shown = filterByArea(items, filter)
  const areas = areasInUse(items)

  return (
    <>
      <SectionHeading
        number={number}
        label={fillTemplate(copy.label, { total: items.length })}
        title={copy.title}
        id={headingId}
      >
        <ToggleGroup
          aria-label={copy.filtersLabel}
          value={[filter]}
          // Pressing the chosen chip again would clear the group; keep the current filter.
          onValueChange={(value) => {
            const next = toAreaFilter(value[0])
            if (next) setFilter(next)
          }}
          variant="chip"
          size="chip"
          className="flex-wrap"
        >
          <ToggleGroupItem value="all" data-cursor={cursor.filter}>
            {copy.all}
          </ToggleGroupItem>
          {areas.map((area) => (
            <ToggleGroupItem key={area} value={area} data-cursor={cursor.filter}>
              {copy.areas[area]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </SectionHeading>

      <div className="mt-8 flex justify-between border-b border-foreground pb-3 font-mono text-label text-muted-foreground uppercase">
        <p aria-live="polite">
          {fillTemplate(copy.showing, { count: shown.length, total: items.length })}
        </p>
        <p className="hidden lg:block">{copy.columns}</p>
      </div>
      <ol>
        {shown.map((item, i) => (
          <ArchiveRow
            key={item.slug}
            item={item}
            number={ordinal(i + 1)}
            areaLabel={copy.areas[item.area]}
            teamNote={copy.teamNote}
            cursor={cursor.open}
          />
        ))}
      </ol>
    </>
  )
}
