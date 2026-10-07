import { featured, work } from "@/content/projects"
import { site } from "@/content/site"
import { ordinal } from "@/lib/track"

import { ProjectPanel } from "./project-panel"
import { WorkTrack } from "./work-track"

const SECTION_ID = "work"
const HEADING_ID = "work-heading"

/**
 * 01 Work. Panels (and their diagrams) render on the server and are handed to
 * the client track, which only owns position, controls and focus.
 */
export function WorkSection() {
  const { nav, chrome } = site
  const number = nav.find((item) => item.id === SECTION_ID)?.number ?? ordinal(1)

  return (
    <section id={SECTION_ID} tabIndex={-1} aria-labelledby={HEADING_ID} className="pt-24 md:pt-40">
      <WorkTrack
        number={number}
        headingId={HEADING_ID}
        copy={work}
        titles={featured.map((project) => project.title)}
        cursor={{ previous: chrome.cursor.previous, next: chrome.cursor.next }}
      >
        {featured.map((project, i) => (
          <ProjectPanel
            key={project.slug}
            project={project}
            number={ordinal(i + 1)}
            cursor={chrome.cursor.open}
          />
        ))}
      </WorkTrack>
    </section>
  )
}
