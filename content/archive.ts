import type { ArchiveCopy, ArchiveItem } from "./types"

/*
 * Everything that isn't featured. Stacks and facts are from
 * resources/projects.txt and the resumes; areas follow the art-direction
 * canvas. Serverless File Storage, FlexiGym and RoomM8 are Kenny's repos
 * (2026-10-10). FlexiGym and RoomM8 were team projects, so they show
 * "Team project · my part", with Kenny's part taken from his commits.
 */
export const archive: ArchiveItem[] = [
  {
    slug: "serverless-file-storage",
    title: "Serverless File Storage",
    stack: ["Terraform", "AWS Lambda", "Step Functions", "DynamoDB", "Next.js"],
    area: "cloud",
    href: "https://github.com/KeneePatel/serverless-file-storage",
  },
  {
    slug: "flexi-gym",
    title: "FlexiGym",
    stack: ["Next.js", "Express", "MongoDB", "Stripe"],
    area: "web",
    href: "https://github.com/KeneePatel/flexi-gym",
    team: true,
    role: "Stripe checkout, the booking API, and confirmation emails, plus the Next.js front end",
  },
  {
    slug: "room-m8",
    title: "RoomM8",
    stack: ["Spring Boot", "Java", "MySQL", "Next.js"],
    area: "web",
    href: "https://github.com/KeneePatel/room-m8",
    team: true,
    role: "the Next.js front end, plus the first settle-up, task, and profile services with their tests",
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
