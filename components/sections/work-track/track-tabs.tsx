import { fillTemplate, ordinal } from "@/lib/track"

type TrackTabsProps = {
  titles: string[]
  index: number
  label: string
  /** `{number}`, `{title}` */
  tabLabel: string
  slideId: (index: number) => string
  tabRef: (index: number) => (element: HTMLButtonElement | null) => void
  onSelect: (index: number) => void
}

/**
 * Numbered buttons, one per project. The current one is underlined amber and
 * marked aria-current (never colour alone). Tablet and up only.
 */
export function TrackTabs({
  titles,
  index,
  label,
  tabLabel,
  slideId,
  tabRef,
  onSelect,
}: TrackTabsProps) {
  return (
    <div role="group" aria-label={label} className="hidden gap-1 px-page pt-5 md:flex">
      {titles.map((title, i) => {
        const number = ordinal(i + 1)
        const current = i === index
        return (
          <button
            key={title}
            ref={tabRef(i)}
            type="button"
            data-track-tab=""
            aria-label={fillTemplate(tabLabel, { number, title })}
            aria-current={current ? "true" : undefined}
            aria-controls={slideId(i)}
            onClick={() => onSelect(i)}
            className="min-h-11 min-w-11 border-b-2 border-transparent font-mono text-xs text-muted-foreground transition-colors duration-(--duration-quick) ease-out hover:text-foreground aria-[current=true]:border-primary aria-[current=true]:text-foreground"
          >
            {number}
          </button>
        )
      })}
    </div>
  )
}
