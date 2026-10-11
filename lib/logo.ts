/**
 * Geometry of the Signal mark, the site's logo: four scattered points that grow
 * toward one clean sine wave (the hero field in miniature). Units are the
 * mark's own box. The icon files in app/ and the sources in resources/logo/
 * are drawn from the same numbers, so change them together.
 */

/** The mark's box: 92 × 52 units, with room for the round caps. */
export const logoViewBox = "4 24 92 52"

/** The wave's axis. On hover the points slide onto it. */
export const logoAxis = 50

/**
 * The points, smallest and faintest first. Plain points take the text colour;
 * `accent` points take --primary, like the lit dots in the field.
 */
export const logoPoints = [
  { cx: 9, cy: 30, r: 2.6, opacity: 0.45, accent: false },
  { cx: 17, cy: 66, r: 3.1, opacity: 0.55, accent: false },
  { cx: 25, cy: 40, r: 3.7, opacity: 0.65, accent: true },
  { cx: 32, cy: 57, r: 4.3, opacity: 1, accent: true },
] as const

/** One sine period (amplitude 17, x 41 to 89) as four cubic Béziers. */
export const logoWave =
  "M41 50C44.91 41.29 48.66 33 53 33C57.34 33 61.09 41.29 65 50C68.91 58.71 72.66 67 77 67C81.34 67 85.09 58.71 89 50"

export const logoWaveWidth = 9
