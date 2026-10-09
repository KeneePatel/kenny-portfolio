"use client"

import { useEffect, useRef, useState } from "react"

import type { ContactCopy } from "@/content/types"
import { confirmHold } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { Pill } from "./pill"

type CopyState = "idle" | "done" | "failed"

type CopyButtonProps = {
  value: string
  labels: ContactCopy["copy"]
  cursor: string
  className?: string
}

/**
 * Copies `value` to the clipboard. The pill confirms in the accent colour for 2s and a
 * separate status line announces the result politely; if the clipboard isn't
 * available it says so instead of failing silently.
 */
export function CopyButton({ value, labels, cursor, className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle")
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    let next: CopyState = "done"
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      next = "failed"
    }
    setState(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState("idle"), confirmHold)
  }

  return (
    <>
      <Pill
        onClick={copy}
        data-cursor={cursor}
        data-state={state}
        className={cn(
          "font-mono text-xs data-[state=done]:border-primary data-[state=done]:text-amber-text",
          className
        )}
      >
        {state === "done" ? labels.done : state === "failed" ? labels.failed : labels.idle}
      </Pill>
      <span role="status" className="sr-only">
        {state === "done" ? labels.announceDone : state === "failed" ? labels.announceFailed : ""}
      </span>
    </>
  )
}
