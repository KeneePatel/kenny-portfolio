import type { CaseChart } from "@/content/types"
import { barOf, formatTick, formatValue, ticksOf, positionOf, type Scale } from "@/lib/chart"
import { cn } from "@/lib/utils"

type ChartBarsProps = { chart: CaseChart; scale: Scale | null; pending: string }

/**
 * The chart view: one row per method with its value in text, so the list reads
 * fine without the bars. Bars that aren't data yet are dashed stand-ins.
 * With negative values on the axis, a zero line shows where "no change" is.
 * Lays out by the width of its own container (label beside or above the bar).
 */
export function ChartBars({ chart, scale, pending }: ChartBarsProps) {
  const label = "@xl:w-56 @xl:shrink-0"
  const value = "w-24 shrink-0 text-right font-mono text-data"
  const zero = scale && scale.min < 0 ? positionOf(0, scale) : null

  return (
    <div className="@container">
      {scale ? (
        <div aria-hidden="true" className="flex gap-4 font-mono text-label text-muted-foreground">
          <span className={cn("hidden @xl:block", label)} />
          <span className="relative h-4 flex-1">
            {ticksOf(scale).map((tick) => (
              <span
                key={tick}
                className="absolute left-(--at) -translate-x-1/2"
                style={{ "--at": `${positionOf(tick, scale)}%` } as React.CSSProperties}
              >
                {formatTick(tick, scale)}
              </span>
            ))}
          </span>
          <span className={value} />
        </div>
      ) : null}
      <ul>
        {chart.rows.map((row) => {
          const bar = scale && row.value !== null ? barOf(row.value, scale) : null
          return (
            <li
              key={row.label}
              className="flex flex-col gap-1 border-b py-2.5 @xl:min-h-11 @xl:flex-row @xl:items-center @xl:gap-4 @xl:py-0"
            >
              <span className={cn("flex flex-col", label)}>
                <span className="font-mono text-label text-muted-foreground uppercase">{row.group}</span>
                <span className="text-data @xl:text-body">{row.label}</span>
              </span>
              <span className="flex flex-1 items-center gap-4">
                <span aria-hidden="true" className="relative h-3.5 flex-1">
                  {zero === null ? null : (
                    <span
                      className="absolute -inset-y-1.5 left-(--zero) w-px bg-foreground"
                      style={{ "--zero": `${zero}%` } as React.CSSProperties}
                    />
                  )}
                  <span
                    className={cn(
                      "absolute inset-y-0 left-(--start) w-(--size)",
                      !bar && "border border-dashed border-muted-foreground",
                      bar && (row.highlight ? "bg-primary" : "bg-foreground-2")
                    )}
                    style={
                      {
                        "--start": `${bar?.start ?? 0}%`,
                        "--size": bar ? `${bar.size}%` : "var(--bar-pending)",
                      } as React.CSSProperties
                    }
                  />
                </span>
                <span className={cn(value, row.value === null && "text-muted-foreground")}>
                  {row.value === null ? pending : formatValue(row.value, chart.format)}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
