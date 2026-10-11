import { JsonLd } from "@/components/seo/json-ld"
import { AboutSection } from "@/components/sections/about"
import { ArchiveSection } from "@/components/sections/archive"
import { ContactSection } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { OpenSourceSection } from "@/components/sections/open-source"
import { PathSection } from "@/components/sections/path"
import { StackSection } from "@/components/sections/stack"
import { WorkSection } from "@/components/sections/work-track"
import { language, person } from "@/content/seo"
import { site } from "@/content/site"
import { pageMetadata } from "@/lib/metadata"
import { homeGraph } from "@/lib/structured-data"

export const metadata = pageMetadata({ path: "/", ...site.metadata, siteName: site.name })

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={homeGraph(person, { ...site.metadata, siteName: site.name, language })} />
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
