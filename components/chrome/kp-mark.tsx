import Link from "next/link"

/** KP monogram linking home; the full name shows beside it on desktop. */
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
      className="inline-flex min-h-11 items-center gap-3 font-mono text-data tracking-wider"
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
