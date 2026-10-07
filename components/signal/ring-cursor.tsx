"use client"

import { useEffect, useRef } from "react"

import { useFinePointer } from "@/hooks/use-fine-pointer"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { follow, followStep, ringSettle } from "@/lib/motion"

/**
 * The label for whatever is under the pointer: the nearest [data-cursor].
 * `data-cursor-dark` overrides it in Night (e.g. the theme toggle's target).
 */
function labelAt(target: EventTarget | null): string {
  if (!(target instanceof Element)) return ""
  const element = target.closest<HTMLElement>("[data-cursor]")
  if (!element) return ""
  const night = document.documentElement.classList.contains("dark")
  return (night && element.dataset.cursorDark) || element.dataset.cursor || ""
}

/**
 * An amber ring trailing a mouse or trackpad, growing into a labelled disc
 * over [data-cursor] elements. Never on touch or with reduced motion, and the
 * system cursor always stays. Moved via a ref inside rAF: no React state.
 */
export function RingCursor() {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const enabled = finePointer && !reducedMotion
  const rootRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const labelElement = labelRef.current
    if (!enabled || !root || !labelElement) return

    const position = { x: 0, y: 0, tx: 0, ty: 0 }
    let frame = 0
    let label = ""

    const place = () => {
      root.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
    }
    const step = () => {
      position.x = followStep(position.x, position.tx, follow.ring)
      position.y = followStep(position.y, position.ty, follow.ring)
      const settled =
        Math.abs(position.tx - position.x) < ringSettle &&
        Math.abs(position.ty - position.y) < ringSettle
      if (settled) {
        position.x = position.tx
        position.y = position.ty
      }
      place()
      frame = settled ? 0 : requestAnimationFrame(step)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      position.tx = event.clientX
      position.ty = event.clientY
      if (root.dataset.visible !== "true") {
        // First move (or back from outside the window): appear at the pointer.
        position.x = position.tx
        position.y = position.ty
        place()
        root.dataset.visible = "true"
      }
      const next = labelAt(event.target)
      if (next !== label) {
        label = next
        labelElement.textContent = next
        root.dataset.labelled = next ? "true" : "false"
      }
      if (!frame) frame = requestAnimationFrame(step)
    }
    const onLeave = () => {
      root.dataset.visible = "false"
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-visible="false"
      data-labelled="false"
      className="group pointer-events-none fixed top-0 left-0 z-(--z-cursor) opacity-100 transition-opacity duration-(--duration-ring) ease-out data-[visible=false]:opacity-0"
    >
      <span className="absolute top-0 left-0 size-9 -translate-1/2 rounded-full border border-primary transition-[scale,background-color] duration-(--duration-ring) ease-out group-data-[labelled=true]:scale-(--ring-grow) group-data-[labelled=true]:bg-primary" />
      <span
        ref={labelRef}
        className="absolute top-0 left-0 -translate-1/2 font-mono text-label whitespace-nowrap text-primary-foreground uppercase opacity-0 transition-opacity duration-(--duration-instant) ease-out group-data-[labelled=true]:opacity-100"
      />
    </div>
  )
}
