"use client"

import { useState } from "react"

import { MonoLabel } from "@/components/signal/mono-label"
import { Toggle } from "@/components/ui/toggle"
import type { CaseChart } from "@/content/types"
import { niceScale } from "@/lib/chart"

import { ChartBars } from "./chart-bars"
import { ChartTable } from "./chart-table"

type BarChartProps = {
  chart: CaseChart
  copy: { view: string; pending: string }
  cursor: string
}

/**
 * A figure with a "View as table" toggle (pressed = table). The axis comes
 * from the known values only; with none known, there is no axis.
 */
export function BarChart({ chart, copy, cursor }: BarChartProps) {
  const [table, setTable] = useState(false)
  const scale = niceScale(chart.rows.map((row) => row.value))
  const titleId = `${chart.id}-title`

  return (
    <figure aria-labelledby={titleId} className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <MonoLabel tone="muted">{chart.fig}</MonoLabel>
          <h3 id={titleId} className="text-tool font-extrabold">
            {chart.title}
          </h3>
        </div>
        <Toggle
          pressed={table}
          onPressedChange={setTable}
          variant="chip"
          size="chip"
          data-cursor={cursor}
        >
          {copy.view}
        </Toggle>
      </div>
      {table ? (
        <ChartTable chart={chart} pending={copy.pending} />
      ) : (
        <ChartBars chart={chart} scale={scale} pending={copy.pending} />
      )}
      <figcaption className="font-mono text-xs text-muted-foreground">{chart.caption}</figcaption>
    </figure>
  )
}
