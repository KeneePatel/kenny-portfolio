import type { NavItem } from "@/content/types"
import { cn } from "@/lib/utils"

type HeroFooterProps = {
  hint: { pointer: string; touch: string }
  scrollLabel: string
  target: NavItem
  cursor: string
  className?: string
}

/**
 * What the field does (hidden with reduced motion, when the lens can't move),
 * and the way on to the first section: a full-width row on phones, a quiet
 * mono link with an amber rule from tablet up.
 */
export function HeroFooter({ hint, scrollLabel, target, cursor, className }: HeroFooterProps) {
  return (
    <div
      className={cn(
        "flex animate-fade flex-col gap-3 font-mono text-xs text-foreground-2 [animation-delay:var(--hero-meta)] md:flex-row md:flex-wrap md:items-center md:justify-between",
        className
      )}
    >
      <p className="motion-reduce:hidden">
        <span aria-hidden="true" className="text-amber-text">
          ◎
        </span>{" "}
        <span className="pointer-coarse:hidden">{hint.pointer}</span>
        <span className="hidden pointer-coarse:inline">{hint.touch}</span>
      </p>
      <a
        href={`#${target.id}`}
        data-cursor={cursor}
        className="flex min-h-13 items-center justify-between border-t border-b border-t-foreground font-sans text-lg font-bold text-foreground md:min-h-11 md:justify-start md:gap-3 md:border-0 md:font-mono md:text-xs md:font-normal md:text-foreground-2"
      >
        <span className="hidden md:inline">{scrollLabel}</span>
        <span aria-hidden="true" className="hidden h-px w-12 bg-primary md:inline-block" />
        <span>
          {target.number} {target.label}
        </span>
        <span aria-hidden="true" className="font-mono text-data font-normal text-amber-text md:text-xs">
          ↓
        </span>
      </a>
    </div>
  )
}
