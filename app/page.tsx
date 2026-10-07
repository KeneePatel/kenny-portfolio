import { Hero } from "@/components/sections/hero"
import { PlaceholderSection } from "@/components/sections/placeholder-section"
import { WorkSection } from "@/components/sections/work-track"
import { site } from "@/content/site"

// Sections after Work are temporary stubs, replaced in M5–M10.
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkSection />
      {site.nav
        .filter((item) => item.id !== "work")
        .map((item) => (
          <PlaceholderSection
            key={item.id}
            item={item}
            label={site.placeholder.sectionLabel}
          />
        ))}
    </main>
  )
}
