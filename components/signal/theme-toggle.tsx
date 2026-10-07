"use client"

import { ContrastIcon } from "lucide-react"
import { useTheme } from "next-themes"

import type { ChromeCopy } from "@/content/types"
import { cn } from "@/lib/utils"

import { Pill } from "./pill"

type ThemeToggleProps = {
  labels: ChromeCopy["theme"]
  /** `pill` in the top bar; `row` inside the menu on phones. */
  layout?: "pill" | "row"
  className?: string
}

/**
 * Night / Day switch. Nothing it renders depends on the current theme in JS:
 * the theme-specific text is swapped by the `dark:` variant, so server and
 * client markup always match and there is no flash after hydration.
 */
export function ThemeToggle({
  labels,
  layout = "pill",
  className,
}: ThemeToggleProps) {
  const { setTheme } = useTheme()

  // The class on <html> is what the visitor sees, so it's the source of truth.
  const toggle = () =>
    setTheme(
      document.documentElement.classList.contains("dark") ? "light" : "dark"
    )

  const name = (
    <>
      <span className="sr-only dark:hidden">{labels.switchToNight}</span>
      <span className="sr-only hidden dark:inline">{labels.switchToDay}</span>
    </>
  )

  if (layout === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        className={cn(
          "flex min-h-11 w-full items-center justify-between border-t font-mono text-data",
          className
        )}
      >
        <span aria-hidden="true">{labels.rowLabel}</span>
        <span aria-hidden="true" className="flex items-center gap-2">
          <span className="dark:hidden">{labels.day}</span>
          <span className="hidden dark:inline">{labels.night}</span>
          <ContrastIcon className="size-4" />
        </span>
        {name}
      </button>
    )
  }

  return (
    <Pill size="icon" onClick={toggle} className={className}>
      <ContrastIcon aria-hidden="true" />
      {name}
    </Pill>
  )
}
