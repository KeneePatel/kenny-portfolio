"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const HOME_TOP = "/#top"

/**
 * KP monogram linking home; the full name shows beside it on desktop. It sits
 * on the pills' translucent backdrop (no border), so text scrolling under the
 * bar doesn't show through.
 *
 * On the homepage it's a plain anchor: the browser jumps to #top on every
 * click, even when the URL already ends in #top. Next's <Link> only scrolls
 * when the URL changes, so a second click did nothing. Elsewhere it stays a
 * <Link> for a client-side trip home.
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
  const onHome = usePathname() === "/"
  const props = {
    href: HOME_TOP,
    "aria-label": label,
    "data-cursor": cursor,
    className:
      "inline-flex min-h-11 items-center gap-3 rounded-full bg-pill p-1.25 font-mono text-data tracking-wider backdrop-blur-pill lg:pr-4.5",
  }
  const content = (
    <>
      <span
        aria-hidden="true"
        className="inline-flex size-8.5 items-center justify-center rounded-full border border-primary text-label text-amber-text"
      >
        {initials}
      </span>
      <span aria-hidden="true" className="hidden lg:inline">
        {name}
      </span>
    </>
  )

  return onHome ? <a {...props}>{content}</a> : <Link {...props}>{content}</Link>
}
