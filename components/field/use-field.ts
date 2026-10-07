import { useEffect, type RefObject } from "react"

import {
  createDotGrid,
  createLayout,
  FIELD,
  layoutDots,
  lensRadiusFor,
  restPosition,
} from "@/lib/field"
import { follow, followStep } from "@/lib/motion"

import { drawField, readFieldColors } from "./draw-field"

type FieldOptions = {
  /** Every dot on the clean wave, no lens, no listeners (contact section). */
  calm: boolean
  /** Reduced motion: drawn once with the lens parked at rest. */
  still: boolean
}

/**
 * Drives the canvas outside React: no state, no re-renders. Frames run only
 * while the lens is easing toward the pointer, and never off-screen or in a
 * hidden tab. Redraws once on resize and on theme change.
 */
export function useField(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { calm, still }: FieldOptions
) {
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const size = { width: 0, height: 0, dpr: 1 }
    let grid = createDotGrid(0, 0)
    let layout = createLayout(0)
    let colors = readFieldColors(canvas)
    const lens = { x: 0, y: 0, tx: 0, ty: 0, radius: 0, moved: false }
    let frame = 0
    let onScreen = true

    const draw = () => {
      layoutDots(grid, lens, layout, calm)
      drawField(context, layout, grid.count, colors, size)
    }

    const resize = (width: number, height: number) => {
      size.width = width
      size.height = height
      size.dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * size.dpr)
      canvas.height = Math.round(height * size.dpr)
      grid = createDotGrid(width, height)
      layout = createLayout(grid.count)
      lens.radius = lensRadiusFor(width)
      if (!lens.moved) {
        const rest = restPosition(width, height)
        lens.x = lens.tx = rest.x
        lens.y = lens.ty = rest.y
      }
      draw()
    }

    const step = () => {
      frame = 0
      lens.x = followStep(lens.x, lens.tx, follow.lens)
      lens.y = followStep(lens.y, lens.ty, follow.lens)
      const settled =
        Math.abs(lens.tx - lens.x) < FIELD.settle &&
        Math.abs(lens.ty - lens.y) < FIELD.settle
      if (settled) {
        lens.x = lens.tx
        lens.y = lens.ty
      }
      draw()
      if (!settled) wake()
    }
    const wake = () => {
      if (!frame && onScreen && !document.hidden) {
        frame = requestAnimationFrame(step)
      }
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    // Aim the lens at a point, if it's over (or just beside) the field.
    const aim = (clientX: number, clientY: number) => {
      if (!onScreen) return
      const rect = canvas.getBoundingClientRect()
      if (clientY < rect.top - FIELD.reach || clientY > rect.bottom + FIELD.reach) {
        return
      }
      lens.tx = clientX - rect.left
      lens.ty = clientY - rect.top
      lens.moved = true
      wake()
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch") aim(event.clientX, event.clientY)
    }
    // Touch: follow a dragging finger (passive, so scrolling is untouched); stay where lifted.
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) aim(touch.clientX, touch.clientY)
    }
    const onVisibility = () => (document.hidden ? stop() : wake())

    const resizeObserver = new ResizeObserver(([entry]) => {
      resize(entry.contentRect.width, entry.contentRect.height)
    })
    resizeObserver.observe(canvas)
    const themeObserver = new MutationObserver(() => {
      colors = readFieldColors(canvas)
      draw()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const cleanupStatic = () => {
      resizeObserver.disconnect()
      themeObserver.disconnect()
    }
    if (calm || still) return cleanupStatic

    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) wake()
      else stop()
    })
    viewObserver.observe(canvas)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("touchstart", onTouch, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cleanupStatic()
      viewObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("touchmove", onTouch)
      document.removeEventListener("visibilitychange", onVisibility)
      stop()
    }
  }, [canvasRef, calm, still])
}
