import { MonoLabel } from "@/components/signal/mono-label"
import type { CaseStudy } from "@/content/types"
import { cn } from "@/lib/utils"

type Group = CaseStudy["approach"]["groups"][number]

const tone: Record<NonNullable<Group["tone"]> | "method", string> = {
  method: "border-foreground",
  data: "border-border bg-card",
  outcome: "border-2 border-foreground",
}

/**
 * Methods → data → evaluation, as boxes. Each group is a list, so it reads in
 * order without the arrows (which are decorative).
 */
export function ApproachDiagram({ groups }: { groups: Group[] }) {
  return (
    <ol className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-stretch">
      {groups.map((group, i) => {
        // Arrows lead into the data and evaluation boxes, not between methods.
        const arrow = group.tone !== undefined && i > 0
        return (
          <li key={group.label} className="flex flex-col gap-4 md:flex-1 md:flex-row">
            {arrow ? (
              <span
                aria-hidden="true"
                className="self-center font-mono text-xl text-muted-foreground max-md:rotate-90"
              >
                →
              </span>
            ) : null}
            <div className={cn("flex flex-1 flex-col gap-2.5 border p-4", tone[group.tone ?? "method"])}>
              <MonoLabel tone="muted">{group.label}</MonoLabel>
              <ul className="text-body">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
