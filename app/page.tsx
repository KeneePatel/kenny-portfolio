import { AboutSection } from "@/components/sections/about"
import { ArchiveSection } from "@/components/sections/archive"
import { ContactSection } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { OpenSourceSection } from "@/components/sections/open-source"
import { PathSection } from "@/components/sections/path"
import { StackSection } from "@/components/sections/stack"
import { WorkSection } from "@/components/sections/work-track"

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
      <ContactSection />
    </main>
  )
}
