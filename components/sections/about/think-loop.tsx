"use client"

import { Fragment, useState } from "react"

import { monoLabelVariants } from "@/components/signal/mono-label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { AboutCopy } from "@/content/types"
import { ordinal } from "@/lib/track"

type ThinkLoopProps = {
  loop: AboutCopy["loop"]
  /** Ring-cursor label for steps not yet chosen. */
  cursor: string
}

/**
 * Build → Break → Understand → Rebuild as toggle buttons (one pressed at a
 * time, arrow keys between them). The chosen step fills amber and its line is
 * announced politely.
 */
export function ThinkLoop({ loop, cursor }: ThinkLoopProps) {
  const [index, setIndex] = useState(0)
  const { steps } = loop

  return (
    <div className="flex flex-col gap-3.5 border-t pt-5">
      <p className={monoLabelVariants({ tone: "muted" })}>{loop.label}</p>
      <ToggleGroup
        aria-label={loop.groupLabel}
        value={[String(index)]}
        // Pressing the chosen step again would clear the group; keep it.
        onValueChange={(value) => {
          const next = Number(value[0])
          if (Number.isInteger(next)) setIndex(next)
        }}
        variant="step"
        size="step"
        className="flex-wrap items-baseline gap-x-4.5 gap-y-1"
      >
        {steps.map((step, i) => (
          <Fragment key={step.name}>
            <ToggleGroupItem
              value={String(i)}
              data-cursor={i === index ? undefined : cursor}
            >
              {step.name}
            </ToggleGroupItem>
            <span aria-hidden="true" className="font-mono text-base text-muted-foreground">
              {i < steps.length - 1 ? "→" : "↺"}
            </span>
          </Fragment>
        ))}
      </ToggleGroup>
      <p aria-live="polite" className="font-mono text-sm leading-relaxed">
        <span className="text-amber-text">{ordinal(index + 1)}</span> {steps[index].line}
      </p>
    </div>
  )
}
