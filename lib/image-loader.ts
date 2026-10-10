/*
 * next/image loader for the static export. There's no image server on a
 * static host, so photos are resized ahead of time into
 * public/<name>-<width>.webp, and this picks the file for each srcset width.
 * next.config.ts reads `imageWidths`, so srcset only asks for widths that exist.
 */

/** Widths every pre-resized image comes in (1x to 3x screens for the portrait). */
export const imageWidths = [480, 640, 800, 960]

/** Images that have pre-resized WebP files next to them in public/. */
const resized = new Set(["/portrait.jpg"])

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (!resized.has(src)) return src
  const fit = imageWidths.find((w) => w >= width) ?? imageWidths[imageWidths.length - 1]
  return src.replace(/\.[a-z]+$/i, `-${fit}.webp`)
}
