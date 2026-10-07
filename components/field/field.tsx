"use client"

import { useRef } from "react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

import { useField } from "./use-field"

type FieldProps = {
  /** `lens`: noisy dots that clear under the pointer. `calm`: all clean, drawn once. */
  variant?: "lens" | "calm"
  className?: string
}

/**
 * The dot field behind the hero: noise that clears into a clean signal where
 * the visitor looks. Decorative only; it renders an empty canvas on the server
 * and draws after hydration, so it never delays the hero text.
 */
export function Field({ variant = "lens", className }: FieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useField(canvasRef, { calm: variant === "calm", still: reducedMotion })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block size-full animate-fade", className)}
    />
  )
}
