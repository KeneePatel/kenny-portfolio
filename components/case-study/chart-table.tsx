import type { CaseChart } from "@/content/types"
import { formatValue } from "@/lib/chart"
import { cn } from "@/lib/utils"

/** The same numbers as a real table: the "View as table" alternative. */
export function ChartTable({ chart, pending }: { chart: CaseChart; pending: string }) {
  const [method, family, value] = chart.columns
  const head = "py-2.5 text-left font-mono text-label font-normal text-muted-foreground uppercase"

  return (
    <table className="w-full border-t border-foreground text-data md:text-body">
      <caption className="sr-only">{chart.title}</caption>
      <thead>
        <tr>
          <th scope="col" className={head}>
            {method}
          </th>
          <th scope="col" className={head}>
            {family}
          </th>
          <th scope="col" className={cn(head, "text-right")}>
            {value}
          </th>
        </tr>
      </thead>
      <tbody>
        {chart.rows.map((row) => (
          <tr key={row.label} className="border-t">
            <th scope="row" className="py-2.5 pr-4 text-left font-normal">
              {row.label}
            </th>
            <td className="py-2.5 pr-4 text-foreground-2">{row.group}</td>
            <td
              className={cn(
                "py-2.5 text-right font-mono",
                row.value === null && "text-muted-foreground"
              )}
            >
              {row.value === null ? pending : formatValue(row.value, chart.format)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
