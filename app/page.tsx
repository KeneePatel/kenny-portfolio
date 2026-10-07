import { AboutSection } from "@/components/sections/about"
import { ArchiveSection } from "@/components/sections/archive"
import { Hero } from "@/components/sections/hero"
import { PlaceholderSection } from "@/components/sections/placeholder-section"
import { WorkSection } from "@/components/sections/work-track"
import { site } from "@/content/site"

// Sections that already exist; the rest are temporary stubs until M7–M10.
const BUILT = new Set(["work", "archive", "about"])

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkSection />
      <ArchiveSection />
      <AboutSection />
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
