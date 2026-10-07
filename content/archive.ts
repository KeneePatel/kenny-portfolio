import type { ArchiveCopy, ArchiveItem } from "./types"

/*
 * Everything that isn't featured. Kenny's call: team projects (repos on a
 * collaborator's account) stay out, so this is the resume's own projects.
 * Stacks are from the resume; areas follow the art-direction canvas.
 * None has a public URL yet, so the rows aren't links.
 */
export const archive: ArchiveItem[] = [
  {
    slug: "motion-tracking",
    title: "Real-Time Motion Tracking",
    stack: ["OpenCV", "Python"],
    area: "ai",
  },
  {
    slug: "flight-price-prediction",
    title: "Flight Price Prediction",
    stack: ["Flask", "REST APIs", "Redis"],
    area: "ai",
  },
  {
    slug: "cross-platform-mobile",
    title: "Cross-Platform Mobile Apps",
    stack: ["Flutter", "React Native", "Firebase"],
    area: "web",
  },
]

export const archiveCopy: ArchiveCopy = {
  label: "Archive · {total} projects",
  title: "Everything else.",
  filtersLabel: "Filter projects by area",
  all: "All",
  areas: {
    cloud: "Cloud & DevOps",
    ai: "AI & Data",
    systems: "Systems & Security",
    web: "Web & Mobile",
  },
  showing: "Showing {count} of {total}",
  columns: "Stack · Area",
  teamNote: "Team project · my part: {role}",
}
