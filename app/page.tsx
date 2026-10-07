import { ArchiveSection } from "@/components/sections/archive"
import { Hero } from "@/components/sections/hero"
import { PlaceholderSection } from "@/components/sections/placeholder-section"
import { WorkSection } from "@/components/sections/work-track"
import { site } from "@/content/site"

// Sections that already exist; the rest are temporary stubs until M6–M10.
const BUILT = new Set(["work", "archive"])

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkSection />
      <ArchiveSection />
      {site.nav
        .filter((item) => !BUILT.has(item.id))
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
