"use client"

import { useState } from "react"

import { monoLabelVariants } from "@/components/signal/mono-label"
import { OutlineText } from "@/components/signal/outline-text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { StackCopy, StackLayer } from "@/content/types"
import { fillTemplate } from "@/lib/track"

type StackLayersProps = {
  layers: StackLayer[]
  copy: StackCopy
  cursor: { open: string; close: string }
}

/**
 * Six layers as giant words: outlined while closed (the stroke turns amber on
 * hover or focus), filled when open. One open at a time; Base UI's accordion
 * provides the disclosure semantics (button + aria-expanded, heading wrapper).
 */
export function StackLayers({ layers, copy, cursor }: StackLayersProps) {
  const [open, setOpen] = useState<string[]>([copy.defaultOpen])

  return (
    <Accordion
      variant="layers"
      value={open}
      onValueChange={(value) => setOpen(value as string[])}
      className="mt-8 lg:mt-14"
    >
      {layers.map((layer) => {
        const isOpen = open.includes(layer.id)
        // Long names ("Infrastructure") hyphenate rather than overflow on narrow phones.
        const name = "min-w-0 flex-1 font-stretch-(--stretch-display) text-layer hyphens-auto wrap-break-word"
        return (
          <AccordionItem key={layer.id} value={layer.id} variant="layers">
            <AccordionTrigger
              variant="layers"
              data-cursor={isOpen ? cursor.close : cursor.open}
            >
              <span className="w-8 shrink-0 font-mono text-xs text-amber-text md:w-14">
                {layer.code}
              </span>
              {isOpen ? (
                <span className={name}>{layer.name}</span>
              ) : (
                <OutlineText
                  className={`${name} transition-[-webkit-text-stroke-color] duration-(--duration-quick) ease-out group-hover/accordion-trigger:type-outline-hint group-focus-visible/accordion-trigger:type-outline-hint`}
                >
                  {layer.name}
                </OutlineText>
              )}
              {/* Phones show code + name only; the open panel lists the tools anyway. */}
              <span className="hidden font-mono text-xs text-muted-foreground md:inline">
                {fillTemplate(copy.toolsCount, { count: layer.tools.length })}
              </span>
            </AccordionTrigger>
            <AccordionContent variant="layers">
              <div className="flex flex-col gap-5 pt-5 pb-8 md:flex-row md:flex-wrap md:gap-x-12 md:pl-20">
                <ul className="flex min-w-0 flex-1 flex-wrap gap-x-7 gap-y-2 text-tool">
                  {layer.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <div className="flex flex-col gap-1.5 font-mono text-xs leading-relaxed md:w-60">
                  <p className={monoLabelVariants({ tone: "muted" })}>{copy.seenIn}</p>
                  <p>{layer.seenIn.join(" · ")}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
