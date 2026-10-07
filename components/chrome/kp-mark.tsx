import Link from "next/link"

/**
 * KP monogram linking home; the full name shows beside it on desktop. It sits
 * on the pills' translucent backdrop (no border), so text scrolling under the
 * bar doesn't show through.
 */
export function KpMark({
  initials,
  name,
  label,
  cursor,
}: {
  initials: string
  name: string
  label: string
  cursor: string
}) {
  return (
    <Link
      href="/#top"
      aria-label={label}
      data-cursor={cursor}
      className="inline-flex min-h-11 items-center gap-3 rounded-full bg-pill p-1.25 font-mono text-data tracking-wider backdrop-blur-pill lg:pr-4.5"
    >
      <span
        aria-hidden="true"
        className="inline-flex size-8.5 items-center justify-center rounded-full border border-primary text-label text-amber-text"
      >
        {initials}
      </span>
      <span aria-hidden="true" className="hidden lg:inline">
        {name}
      </span>
    </Link>
  )
}
