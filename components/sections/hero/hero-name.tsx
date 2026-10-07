import { OutlineText } from "@/components/signal/outline-text"
import { cn } from "@/lib/utils"

/**
 * The outlined name behind the hero. Decorative (the h1 carries the words),
 * so it's hidden from screen readers. Each letter is a span for the hover
 * weight play in the `name-letters` utility.
 */
export function HeroName({ name, className }: { name: string; className?: string }) {
  const letters = Array.from(name.toUpperCase())

  return (
    <OutlineText
      aria-hidden="true"
      tone="quiet"
      stroke="thick"
      className={cn(
        "name-letters animate-fade text-name [animation-delay:var(--hero-name)]",
        className
      )}
    >
      {letters.map((letter, index) => (
        // Static string: the index is a stable key.
        <span key={index}>{letter === " " ? " " : letter}</span>
      ))}
    </OutlineText>
  )
}
