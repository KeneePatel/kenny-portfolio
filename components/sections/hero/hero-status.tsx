import { HalifaxTime } from "@/components/chrome/halifax-time"
import type { HeroFact } from "@/content/types"
import { cn } from "@/lib/utils"

/**
 * Based / Local / Builds / Status. Two-up label-over-value cells on phones;
 * a label | value table from tablet up.
 */
export function HeroStatus({
  facts,
  timeZone,
  className,
}: {
  facts: HeroFact[]
  timeZone: string
  className?: string
}) {
  return (
    <dl
      className={cn(
        "grid animate-fade grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-label uppercase [animation-delay:var(--hero-meta)] md:mt-2 md:grid-cols-[auto_auto] md:gap-x-5.5",
        className
      )}
    >
      {facts.map((fact) => (
        <div key={fact.label} className="md:contents">
          <dt className="text-muted-foreground">{fact.label}</dt>
          {"clock" in fact ? (
            <dd className="text-amber-text">
              <HalifaxTime timeZone={timeZone} />
            </dd>
          ) : (
            <dd>{fact.value}</dd>
          )}
        </div>
      ))}
    </dl>
  )
}
