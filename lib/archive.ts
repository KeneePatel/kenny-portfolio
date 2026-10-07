/* Pure archive filtering: no React, no DOM. */

export const AREAS = ["cloud", "ai", "systems", "web"] as const
export type Area = (typeof AREAS)[number]
export type AreaFilter = Area | "all"

type HasArea = { area: Area }

export function filterByArea<T extends HasArea>(items: readonly T[], filter: AreaFilter): T[] {
  return filter === "all" ? [...items] : items.filter((item) => item.area === filter)
}

/** Areas that have at least one item, in the canonical order. */
export function areasInUse(items: readonly HasArea[]): Area[] {
  const present = new Set(items.map((item) => item.area))
  return AREAS.filter((area) => present.has(area))
}

/** A filter value from the toggle group, or null if it isn't one we know. */
export function toAreaFilter(value: unknown): AreaFilter | null {
  return value === "all" || AREAS.includes(value as Area) ? (value as AreaFilter) : null
}
