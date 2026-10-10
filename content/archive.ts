import type { ArchiveCopy, ArchiveItem } from "./types"

/*
 * Everything that isn't featured. Stacks are from the resumes; areas follow
 * the art-direction canvas. Kenny's call (2026-10-10): the current resume's
 * three team projects are in. Their repos live on a collaborator's account
 * (projects.txt), so they show "Team project · my part", with Kenny's part
 * taken from the resume bullets. Trekking Booking Platform is the "Paradise"
 * repo and Responsive Educational Platform is "Shiksha". The bindings exist
 * as two repos (liboqs-node-wrapper, liboqs-node-windows): [TODO: Kenny to
 * pick one], so that row isn't a link yet.
 */
export const archive: ArchiveItem[] = [
  {
    slug: "trekking-booking",
    title: "Trekking Booking Platform",
    stack: ["React", "Node.js", "MongoDB", "Firebase"],
    area: "web",
    href: "https://github.com/sneh2102/Paradise",
    team: true,
    role: "the front end, role-based access, and the Firebase admin dashboard",
  },
  {
    slug: "quantum-safe-bindings",
    title: "Quantum-Safe Node.js Bindings",
    stack: ["TypeScript", "JavaScript", "C++", "CMake"],
    area: "systems",
    team: true,
    role: "leading the Node.js bindings for liboqs and their build pipeline",
  },
  {
    slug: "educational-platform",
    title: "Responsive Educational Platform",
    stack: ["JavaScript", "HTML", "CSS"],
    area: "web",
    href: "https://github.com/sneh2102/shiksha",
    team: true,
    role: "the responsive front end",
  },
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
  title: "Smaller things.",
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
