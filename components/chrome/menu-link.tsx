import Link from "next/link"

import { OutlineText } from "@/components/signal/outline-text"
import type { NavItem } from "@/content/types"

type MenuLinkProps = {
  item: NavItem
  cursor: string
  onSelect: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void
}

/** Numbered index link: outlined at rest, accent-coloured and shifted on hover or focus. */
export function MenuLink({ item, cursor, onSelect }: MenuLinkProps) {
  return (
    <Link
      href={`/#${item.id}`}
      onClick={(event) => onSelect(event, item.id)}
      data-cursor={cursor}
      className="group flex min-h-11 items-baseline gap-4.5"
    >
      <span className="font-mono text-data text-amber-text">{item.number}</span>
      <OutlineText
        stroke="thick"
        className="text-menu transition-[color,-webkit-text-stroke-color,translate] duration-(--duration-morph) ease-out group-hover:translate-x-3 group-hover:type-outline-lit group-focus-visible:translate-x-3 group-focus-visible:type-outline-lit"
      >
        {item.label}
      </OutlineText>
    </Link>
  )
}
