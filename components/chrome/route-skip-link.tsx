"use client"

import { usePathname } from "next/navigation"

import { SkipLink } from "@/components/signal/skip-link"

type Target = { href: string; label: string }

/** The skip link for this route: to the selected work on the homepage, to `<main>` elsewhere. */
export function RouteSkipLink({ home, page }: { home: Target; page: Target }) {
  const { href, label } = usePathname() === "/" ? home : page
  return <SkipLink href={href}>{label}</SkipLink>
}
