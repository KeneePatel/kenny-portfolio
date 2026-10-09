import type { ArchiveItem } from "@/content/types"
import { fillTemplate } from "@/lib/track"

type ArchiveRowProps = {
  item: ArchiveItem
  number: string
  areaLabel: string
  /** `{role}` */
  teamNote: string
  cursor: string
}

/**
 * One archive row. With a URL, the title link stretches over the whole row;
 * hover and keyboard focus share one look (weight 500 → 800, a 10px shift,
 * the arrow turns to the accent). Without one, the row is plain text: no false affordance.
 */
export function ArchiveRow({ item, number, areaLabel, teamNote, cursor }: ArchiveRowProps) {
  const { title, href, stack, team, role } = item
  const lift =
    "group-hover:translate-x-2.5 group-hover:font-extrabold group-has-[a:focus-visible]:translate-x-2.5 group-has-[a:focus-visible]:font-extrabold"

  return (
    <li className="group archive-grid relative border-b py-3.5">
      <span aria-hidden="true" className="font-mono text-xs text-muted-foreground [grid-area:number]">
        {number}
      </span>
      <div className="min-w-0 [grid-area:title]">
        {href ? (
          <a
            href={href}
            rel="noopener noreferrer"
            data-cursor={cursor}
            className="text-list after:absolute after:inset-0"
          >
            {/* The shift lives on an inner span: a transformed link would shrink its stretched hit area. */}
            <span
              className={`inline-block transition-[font-weight,translate] duration-(--duration-morph) ease-out ${lift}`}
            >
              {title}
            </span>
          </a>
        ) : (
          <span className="text-list">{title}</span>
        )}
        {team ? (
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {fillTemplate(teamNote, { role: role ?? "[TODO: my part]" })}
          </p>
        ) : null}
      </div>
      <span className="font-mono text-xs text-foreground-2 [grid-area:stack]">
        {stack.join(" · ")}
      </span>
      <span className="hidden font-mono text-xs text-muted-foreground [grid-area:area] lg:block">
        {areaLabel}
      </span>
      {href ? (
        <span
          aria-hidden="true"
          className="text-lg text-muted-foreground transition-[color,translate] duration-(--duration-quick) ease-out [grid-area:arrow] group-hover:-translate-y-0.75 group-hover:translate-x-0.75 group-hover:text-amber-text group-has-[a:focus-visible]:text-amber-text"
        >
          ↗
        </span>
      ) : null}
    </li>
  )
}
