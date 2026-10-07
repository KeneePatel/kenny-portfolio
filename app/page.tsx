import { AboutSection } from "@/components/sections/about"
import { ArchiveSection } from "@/components/sections/archive"
import { Hero } from "@/components/sections/hero"
import { OpenSourceSection } from "@/components/sections/open-source"
import { PathSection } from "@/components/sections/path"
import { PlaceholderSection } from "@/components/sections/placeholder-section"
import { StackSection } from "@/components/sections/stack"
import { WorkSection } from "@/components/sections/work-track"
import { site } from "@/content/site"

// Sections that already exist; the rest are temporary stubs until M10.
const BUILT = new Set(["work", "archive", "about", "toolkit", "path"])

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkSection />
      <ArchiveSection />
      <AboutSection />
      <StackSection />
      <PathSection />
      <OpenSourceSection />
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
