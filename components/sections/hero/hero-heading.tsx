import { OutlineText } from "@/components/signal/outline-text"
import { cn } from "@/lib/utils"

/** The page's one h1. Lines rise in on CSS delays; the text is in the HTML from the start. */
export function HeroHeading({
  id,
  lines,
  className,
}: {
  id: string
  lines: [string, string, string]
  className?: string
}) {
  const [greeting, name, line3] = lines

  return (
    <h1 id={id} className={cn("flex flex-col", className)}>
      <span className="animate-rise text-greeting [animation-delay:var(--hero-greeting)]">
        {greeting}
      </span>
      <span className="mt-4 animate-rise text-statement [animation-delay:var(--hero-line2)] md:mt-6 lg:mt-7">
        {name}
      </span>
      <OutlineText className="mt-1 animate-rise text-statement [animation-delay:var(--hero-line3)]">
        {line3}
      </OutlineText>
    </h1>
  )
}
