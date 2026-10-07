import { monoLabelVariants } from "@/components/signal/mono-label"
import type { CaseBlock } from "@/content/types"
import { isPending } from "@/lib/case-study"
import { cn } from "@/lib/utils"

type StoryRowProps = {
  block: CaseBlock
  /** Replaces the statement (figures, diagrams). */
  children?: React.ReactNode
  /** Extra side-column content under the note (links). */
  aside?: React.ReactNode
  /** Main column runs to the right edge (no side column). */
  wide?: boolean
  className?: string
}

/**
 * One row of the story on a heavy rule: mono heading on a column line, the
 * statement, and a side note. Placeholders render muted.
 */
export function StoryRow({ block, children, aside, wide, className }: StoryRowProps) {
  const { id, heading, statement, note } = block

  return (
    <div className={cn("page-grid gap-y-3 border-t border-foreground pt-6 pb-10", className)}>
      <h2
        id={id}
        className={monoLabelVariants({
          tone: "muted",
          className: "col-span-full pt-2 md:col-span-2 lg:col-span-3",
        })}
      >
        {heading}
      </h2>
      <div
        className={cn(
          "col-span-full flex min-w-0 flex-col gap-7 md:col-span-6",
          wide ? "lg:col-span-9" : "lg:col-span-6"
        )}
      >
        {statement ? (
          <p
            className={cn(
              "max-w-205 text-lead text-pretty",
              isPending(statement) && "text-muted-foreground"
            )}
          >
            {statement}
          </p>
        ) : null}
        {children}
      </div>
      {note || aside ? (
        <div className="col-span-full flex max-w-75 flex-col gap-2.5 md:col-span-6 md:col-start-3 lg:col-span-3 lg:col-start-auto">
          {note ? <p className="font-mono text-xs text-muted-foreground">{note}</p> : null}
          {aside}
        </div>
      ) : null}
    </div>
  )
}
