import type { ProjectDiagram as Diagram } from "@/content/types"

import { DiffDiagram } from "./diff-diagram"
import { FlowDiagram } from "./flow-diagram"
import { SignalDiagram } from "./signal-diagram"

/**
 * A project's diagram, exposed to assistive tech as one image with a text
 * description (its parts are drawing, not content to read piece by piece).
 */
export function ProjectDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <div
      role="img"
      aria-label={diagram.alt}
      className="flex min-h-30 flex-1 items-center justify-center overflow-hidden border border-border bg-background p-4"
    >
      {diagram.kind === "signal" ? (
        <SignalDiagram caption={diagram.caption} />
      ) : diagram.kind === "flow" ? (
        <FlowDiagram rows={diagram.rows} note={diagram.note} />
      ) : (
        <DiffDiagram header={diagram.header} lines={diagram.lines} />
      )}
    </div>
  )
}
