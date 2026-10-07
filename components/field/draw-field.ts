import { Bucket, FIELD, type DotLayout } from "@/lib/field"

export type FieldColors = {
  ink: string
  amber: string
  nearAlpha: number
  farAlpha: number
}

/** Field colours come from the theme tokens, so Night/Day need no code. */
export function readFieldColors(element: Element): FieldColors {
  const style = getComputedStyle(element)
  const read = (name: string) => style.getPropertyValue(name).trim()
  return {
    ink: read("--foreground"),
    amber: read("--primary"),
    nearAlpha: parseFloat(read("--field-near-alpha")),
    farAlpha: parseFloat(read("--field-far-alpha")),
  }
}

/** One fill per bucket, quietest first so lit dots sit on top. */
const passes = [
  { bucket: Bucket.Far, diameter: FIELD.dotSize.far },
  { bucket: Bucket.Near, diameter: FIELD.dotSize.near },
  { bucket: Bucket.Lit, diameter: FIELD.dotSize.lit },
] as const

export function drawField(
  context: CanvasRenderingContext2D,
  layout: DotLayout,
  count: number,
  colors: FieldColors,
  size: { width: number; height: number; dpr: number }
) {
  context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0)
  context.clearRect(0, 0, size.width, size.height)

  for (const pass of passes) {
    const radius = pass.diameter / 2
    context.beginPath()
    for (let i = 0; i < count; i++) {
      if (layout.bucket[i] !== pass.bucket) continue
      context.moveTo(layout.x[i] + radius, layout.y[i])
      context.arc(layout.x[i], layout.y[i], radius, 0, Math.PI * 2)
    }
    context.fillStyle = pass.bucket === Bucket.Lit ? colors.amber : colors.ink
    context.globalAlpha =
      pass.bucket === Bucket.Lit
        ? 1
        : pass.bucket === Bucket.Near
          ? colors.nearAlpha
          : colors.farAlpha
    context.fill()
  }
  context.globalAlpha = 1
}
