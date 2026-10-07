import type { FlowNode, FlowStep } from "@/content/types"
import { cn } from "@/lib/utils"

const tone: Record<NonNullable<FlowNode["tone"]>, string> = {
  solid: "border-foreground",
  dashed: "border-dashed border-muted-foreground",
  accent: "border-primary text-amber-text",
}

/** Boxes and arrows: how the parts of a project connect. */
export function FlowDiagram({ rows, note }: { rows: FlowStep[][]; note?: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-3 font-mono text-xs">
      {rows.map((row, rowIndex) => (
        <div
          // Rows are static content: the index is a stable key.
          key={rowIndex}
          className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2.5"
        >
          {row.map((step, stepIndex) =>
            "arrow" in step ? (
              <span key={stepIndex} className="text-muted-foreground">
                {step.arrow}
              </span>
            ) : (
              <span
                key={stepIndex}
                className={cn("border px-3 py-2.5", tone[step.tone ?? "solid"])}
              >
                {step.label}
              </span>
            )
          )}
        </div>
      ))}
      {note ? <p className="text-center text-muted-foreground">{note}</p> : null}
    </div>
  )
}
