/* Where a case study sits among the featured projects, and which one comes
 * next. Plain functions over slugs, so they work for any content shape. */

/** "[TODO: …]" placeholders render muted, so they never pass for real copy. */
export function isPending(text: string): boolean {
  return text.startsWith("[TODO")
}

/** 1-based position of `slug` in the featured order, or 0 when it isn't featured. */
export function positionIn(order: string[], slug: string): number {
  return order.indexOf(slug) + 1
}

/** The next featured slug (wrapping) that also has a case study, or null if there's no other. */
export function nextWithCase(order: string[], slug: string, withCase: Set<string>): string | null {
  const start = order.indexOf(slug)
  for (let step = 1; step < order.length; step++) {
    const candidate = order[(start + step) % order.length]
    if (candidate !== slug && withCase.has(candidate)) return candidate
  }
  return null
}
