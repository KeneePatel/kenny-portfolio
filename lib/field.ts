/*
 * The hero field: pure math, no React or DOM. A grid of dots with seeded
 * jitter (noise) that settles into a clean wave (signal) inside the lens.
 */

export const FIELD = {
  /** Grid spacing, CSS px. */
  cell: 26,
  /** Max jitter either way, CSS px. */
  jitter: 11,
  /** The clean wave inside the lens: y += sin(x / length) * amplitude * t. */
  waveLength: 38,
  waveAmplitude: 9,
  lensRadius: { desktop: 200, mobile: 120 },
  /** Below this width (CSS px) the mobile lens radius applies. */
  mobileBelow: 768,
  /** Where the lens rests, as fractions of the field's width and height. */
  rest: { x: 0.68, y: 0.44 },
  /** t above which a dot is lit (amber) or near (mid opacity). */
  threshold: { lit: 0.55, near: 0.08 },
  /** Dot diameters, CSS px. */
  dotSize: { lit: 4, near: 2.6, far: 1.8 },
  /** The lens reacts to pointers up to this far outside the field, CSS px. */
  reach: 60,
  /** Stop easing when the lens is this close to its target, CSS px. */
  settle: 0.5,
  seed: 7,
} as const

export const Bucket = { Far: 0, Near: 1, Lit: 2 } as const
export type Bucket = (typeof Bucket)[keyof typeof Bucket]

export type DotGrid = {
  count: number
  baseX: Float32Array
  baseY: Float32Array
  jitterX: Float32Array
  jitterY: Float32Array
}

export type DotLayout = {
  x: Float32Array
  y: Float32Array
  bucket: Uint8Array
}

export type Lens = { x: number; y: number; radius: number }

/** mulberry32: a tiny deterministic PRNG returning floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Stable jitter for one grid cell: depends only on (column, row, seed). */
export function cellJitter(
  column: number,
  row: number,
  seed: number = FIELD.seed,
  amount: number = FIELD.jitter
): [number, number] {
  const hash = Math.imul(column, 0x27d4eb2d) ^ Math.imul(row, 0x165667b1) ^ seed
  const random = mulberry32(hash)
  return [(random() * 2 - 1) * amount, (random() * 2 - 1) * amount]
}

/** Dots every `cell` px, starting half a cell in. Same cell, same jitter, at any size. */
export function createDotGrid(
  width: number,
  height: number,
  cell: number = FIELD.cell,
  seed: number = FIELD.seed
): DotGrid {
  const columns = Math.max(0, Math.ceil((width - cell / 2) / cell))
  const rows = Math.max(0, Math.ceil((height - cell / 2) / cell))
  const count = columns * rows
  const grid: DotGrid = {
    count,
    baseX: new Float32Array(count),
    baseY: new Float32Array(count),
    jitterX: new Float32Array(count),
    jitterY: new Float32Array(count),
  }
  let i = 0
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const [jx, jy] = cellJitter(column, row, seed)
      grid.baseX[i] = cell / 2 + column * cell
      grid.baseY[i] = cell / 2 + row * cell
      grid.jitterX[i] = jx
      grid.jitterY[i] = jy
      i++
    }
  }
  return grid
}

export function createLayout(count: number): DotLayout {
  return {
    x: new Float32Array(count),
    y: new Float32Array(count),
    bucket: new Uint8Array(count),
  }
}

export function smoothstep(t: number): number {
  const clamped = Math.min(1, Math.max(0, t))
  return clamped * clamped * (3 - 2 * clamped)
}

/** How "clean" a dot is: 1 at the lens centre, 0 at and beyond its edge. */
export function lensStrength(dx: number, dy: number, radius: number): number {
  return smoothstep(1 - Math.hypot(dx, dy) / radius)
}

export function bucketFor(t: number): Bucket {
  if (t > FIELD.threshold.lit) return Bucket.Lit
  if (t > FIELD.threshold.near) return Bucket.Near
  return Bucket.Far
}

/**
 * Place every dot for a lens position, writing into `out` (reused each frame).
 * `calm`: every dot sits on the clean wave, in the near bucket; no lens.
 */
export function layoutDots(
  grid: DotGrid,
  lens: Lens,
  out: DotLayout,
  calm = false
): DotLayout {
  for (let i = 0; i < grid.count; i++) {
    const bx = grid.baseX[i]
    const by = grid.baseY[i]
    const t = calm ? 1 : lensStrength(bx - lens.x, by - lens.y, lens.radius)
    out.x[i] = bx + grid.jitterX[i] * (1 - t)
    out.y[i] =
      by +
      grid.jitterY[i] * (1 - t) +
      Math.sin(bx / FIELD.waveLength) * FIELD.waveAmplitude * t
    out.bucket[i] = calm ? Bucket.Near : bucketFor(t)
  }
  return out
}

export function lensRadiusFor(width: number): number {
  return width < FIELD.mobileBelow
    ? FIELD.lensRadius.mobile
    : FIELD.lensRadius.desktop
}

export function restPosition(width: number, height: number) {
  return { x: width * FIELD.rest.x, y: height * FIELD.rest.y }
}
