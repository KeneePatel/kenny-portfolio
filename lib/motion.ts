/**
 * Motion tokens for JS-driven motion. CSS uses the same values from
 * app/globals.css (--duration-*, --ease-*); keep the two in sync.
 */

/** Durations in milliseconds. */
export const duration = {
  instant: 120,
  quick: 200,
  ring: 240,
  morph: 360,
  band: 450,
  slow: 700,
} as const

export const easing = {
  /** Arrivals, weight, hover. */
  out: "cubic-bezier(0.2, 0.7, 0.1, 1)",
  /** Track, band, menu. */
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const

/** Per-frame follow factors: x += (target - x) * k. */
export const follow = {
  lens: 0.2,
  ring: 0.24,
} as const

/** Hero entrance delays in milliseconds (CSS only, server-rendered text). */
export const heroDelay = {
  greeting: 120,
  line2: 700,
  line3: 1300,
  meta: 1600,
} as const

/** How long a confirmation (e.g. "Copied") stays before reverting. */
export const confirmHold = 2000

/** Halifax clock refresh interval. */
export const clockInterval = 30_000
