/* Pure helpers for the project track: no React, no DOM. */

/** Index after moving by `delta`, wrapping around both ends. */
export function wrapIndex(index: number, delta: number, count: number): number {
  if (count <= 0) return 0
  return (((index + delta) % count) + count) % count
}

/** The index a key moves the track to, or null if the key doesn't move it. */
export function indexForKey(key: string, index: number, count: number): number | null {
  switch (key) {
    case "ArrowRight":
      return wrapIndex(index, 1, count)
    case "ArrowLeft":
      return wrapIndex(index, -1, count)
    case "Home":
      return 0
    case "End":
      return Math.max(0, count - 1)
    default:
      return null
  }
}

/** Two-digit position label: 1 → "01". */
export function ordinal(position: number): string {
  return String(position).padStart(2, "0")
}

/** Fill `{name}` placeholders in a content string. Unknown names become "". */
export function fillTemplate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in values ? String(values[name]) : ""
  )
}
