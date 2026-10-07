import { SectionHeading } from "@/components/signal/section-heading"
import type { NavItem } from "@/content/types"

/**
 * Temporary stand-in for a homepage section, so the skip link and menu
 * anchors have real targets. Each is replaced by its milestone (M3–M10).
 */
export function PlaceholderSection({
  item,
  label,
}: {
  item: NavItem
  label: string
}) {
  const headingId = `${item.id}-heading`

  return (
    <section
      id={item.id}
      tabIndex={-1}
      aria-labelledby={headingId}
      className="px-page py-24 md:py-40"
    >
      <SectionHeading
        number={item.number}
        label={label}
        title={item.label}
        id={headingId}
      />
    </section>
  )
}
