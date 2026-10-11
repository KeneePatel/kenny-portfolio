/* Bar-chart math for the case study figures. Pure, so it renders on the
 * server and can be tested without React. Values that aren't in yet are
 * `null`: they never move the axis, and with none known there is no axis. */

export type Scale = { min: number; max: number; step: number }

/** Step multipliers a reader can count in (× a power of ten). */
const NICE_STEPS = [1, 2, 2.5, 5, 10] as const
/** Roughly how many intervals the axis is split into. */
const TARGET_TICKS = 5

const tidy = (value: number) => Number(value.toFixed(10))

function niceStep(range: number): number {
  const raw = range / TARGET_TICKS
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const multiplier = NICE_STEPS.find((n) => raw / magnitude <= n) ?? 10
  return tidy(multiplier * magnitude)
}

/** An axis that includes zero and every known value, on round steps. `null` when nothing is known. */
export function niceScale(values: (number | null)[]): Scale | null {
  const known = values.filter((v): v is number => v !== null && Number.isFinite(v))
  if (known.length === 0) return null

  const low = Math.min(0, ...known)
  const high = Math.max(0, ...known)
  if (low === high) return { min: 0, max: 1, step: 1 / TARGET_TICKS }

  const step = niceStep(high - low)
  return {
    min: tidy(Math.floor(low / step) * step),
    max: tidy(Math.ceil(high / step) * step),
    step,
  }
}

/** Tick values from min to max, inclusive. */
export function ticksOf({ min, max, step }: Scale): number[] {
  const count = Math.round((max - min) / step)
  return Array.from({ length: count + 1 }, (_, i) => tidy(min + i * step))
}

/** Where a value sits along the axis, 0–100. */
export function positionOf(value: number, { min, max }: Scale): number {
  const percent = ((value - min) / (max - min)) * 100
  return Number(Math.min(100, Math.max(0, percent)).toFixed(3))
}

/** A bar from zero to the value (left edge and width, both in %). Negative values grow left. */
export function barOf(value: number, scale: Scale): { start: number; size: number } {
  const zero = positionOf(0, scale)
  const end = positionOf(value, scale)
  return { start: Math.min(zero, end), size: Number(Math.abs(end - zero).toFixed(3)) }
}

export type ValueFormat = {
  decimals: number
  /** Show "+" on positive values (improvements). */
  signed?: boolean
  /** Appended after the number, e.g. " dB". */
  unit?: string
}

/** "+0.25", "−1.50 dB". Uses a true minus sign. */
export function formatValue(value: number, { decimals, signed, unit = "" }: ValueFormat): string {
  const digits = Math.abs(value).toFixed(decimals)
  const sign = value < 0 ? "−" : signed && value > 0 ? "+" : ""
  return `${sign}${digits}${unit}`
}

/** Decimal places a tick step needs: 0.2 → 1, 0.02 → 2, 2 → 0. */
export function stepDecimals(step: number): number {
  const text = String(step)
  if (text.includes("e-")) return Number(text.split("e-")[1])
  return text.split(".")[1]?.length ?? 0
}

/** Axis label for a tick: the step's decimals and a true minus sign, no plus. */
export function formatTick(tick: number, { step }: Scale): string {
  return formatValue(tick, { decimals: stepDecimals(step) })
}
