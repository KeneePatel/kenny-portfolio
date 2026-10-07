import { Hero } from "@/components/sections/hero"
import { PlaceholderSection } from "@/components/sections/placeholder-section"
import { site } from "@/content/site"

// Sections after the hero are temporary stubs, replaced in M4–M10.
export default function Home() {
  return (
    <main id="main">
      <Hero />
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
