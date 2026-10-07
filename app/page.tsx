import { PlaceholderSection } from "@/components/sections/placeholder-section"
import { OutlineText } from "@/components/signal/outline-text"
import { site } from "@/content/site"

// Temporary: the real hero and sections replace these in M3–M10.
export default function Home() {
  const [greeting, line2, line3] = site.hero.lines

  return (
    <main id="main">
      <div className="px-page py-24">
        <h1 className="flex flex-col">
          <span className="text-greeting">{greeting}</span>
          <span className="text-statement">{line2}</span>
          <OutlineText className="text-statement">{line3}</OutlineText>
        </h1>
      </div>
      {site.nav.map((item) => (
        <PlaceholderSection
          key={item.id}
          item={item}
          label={site.placeholder.sectionLabel}
        />
      ))}
    </main>
  )
}
