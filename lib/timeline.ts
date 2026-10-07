/* Pure timeline maths for the Path section: no React, no DOM. */

/** "2023-05" (year-month). */
export type YearMonth = string

export type Span = { start: number; end: number }
export type Range = { start: number; end: number }

function parse(value: YearMonth): [number, number] {
  const [year, month] = value.split("-").map(Number)
  return [year, month || 1]
}

/** Start of a month as a fractional year: "2023-01" → 2023, "2024-07" → 2024.5. */
export function monthStart(value: YearMonth): number {
  const [year, month] = parse(value)
  return year + (month - 1) / 12
}

/** End of a month as a fractional year: "2023-05" → 2023 + 5/12. */
export function monthEnd(value: YearMonth): number {
  const [year, month] = parse(value)
  return year + month / 12
}

/** An item's span; "present" runs to the start of the as-of month. */
export function spanOf(
  item: { start: YearMonth; end: YearMonth | "present" },
  asOf: YearMonth
): Span {
  return {
    start: monthStart(item.start),
    end: item.end === "present" ? monthStart(asOf) : monthEnd(item.end),
  }
}

/** Whole years from `first` to the as-of year, inclusive. */
export function yearsThrough(first: number, asOf: YearMonth): number[] {
  const last = parse(asOf)[0]
  return Array.from({ length: Math.max(0, last - first + 1) }, (_, i) => first + i)
}

/** The drawn range: from the first year to the end of the last. */
export function rangeOf(years: number[]): Range {
  return { start: years[0], end: years[years.length - 1] + 1 }
}

/** Position within the range, as a percentage (clamped to 0–100). */
export function percentAt(value: number, range: Range): number {
  const t = (value - range.start) / (range.end - range.start)
  return Math.min(100, Math.max(0, t * 100))
}

/** True when the span overlaps the given calendar year. */
export function activeIn(span: Span, year: number): boolean {
  return span.start < year + 1 && span.end > year
}

/** Spans starting late in the range get their label right-aligned to the bar's end. */
export function labelAlign(span: Span, range: Range): "start" | "end" {
  return percentAt(span.start, range) > 60 ? "end" : "start"
}
