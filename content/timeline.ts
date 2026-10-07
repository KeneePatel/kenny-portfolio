import type { PathCopy, TimelineItem } from "./types"

/*
 * Path: every item is from the resume. The canvas also showed "R&D Project
 * Engineer · MyTech Lab (May–Aug 25)" and "Independent projects (2025–)";
 * neither is in the resume, so they're out until Kenny confirms them.
 * GPA: only "GPA 3.78" (scale unconfirmed, per CLAUDE.md).
 */
export const timeline: TimelineItem[] = [
  {
    id: "bachelor",
    lane: "education",
    title: "Bachelor of CSE · Charotar",
    dates: "2019–23",
    start: "2019-04",
    end: "2023-04",
    kind: "technical",
    hollow: true,
  },
  {
    id: "macs",
    lane: "education",
    title: "MACS · Dalhousie",
    dates: "Jan 24–Aug 25",
    start: "2024-01",
    end: "2025-08",
    kind: "technical",
  },
  {
    id: "kintu",
    lane: "engineering",
    title: "ML Engineer Intern · Kintu Designs",
    dates: "Dec 22–May 23",
    start: "2022-12",
    end: "2023-05",
    kind: "technical",
  },
  {
    id: "starknet",
    lane: "open-source",
    title: "Starknet ecosystem",
    dates: "2023–24",
    start: "2023-01",
    end: "2024-12",
    kind: "technical",
  },
  {
    id: "enbee",
    lane: "other",
    title: "Tutor · Enbee Education",
    dates: "Jan–May 23",
    start: "2023-01",
    end: "2023-05",
    kind: "other",
  },
  {
    id: "mentor",
    lane: "other",
    title: "Student Mentor · Dalhousie",
    dates: "Jul–Dec 24",
    start: "2024-07",
    end: "2024-12",
    kind: "other",
  },
  {
    id: "sunglass-hut",
    lane: "other",
    title: "Sales Associate · Sunglass Hut",
    dates: "Oct 24–",
    start: "2024-10",
    end: "present",
    kind: "other",
  },
]

export const path: PathCopy = {
  label: "Path · scrub the years",
  title: "So far.",
  lanes: [
    { id: "education", name: "Education" },
    { id: "engineering", name: "Engineering" },
    { id: "open-source", name: "Open source" },
    { id: "other", name: "Other", quiet: true },
  ],
  yearsLabel: "Choose a year",
  inYear: "In {year}",
  firstYear: 2019,
  defaultYear: 2025,
  asOf: "2026-10",
  education: {
    label: "Education",
    headline: "Master of Applied Computer Science",
    details: ["Dalhousie University", "Jan 2024 – Aug 2025"],
    gpa: "GPA 3.78",
    thesis: { label: "Thesis →", href: "/work/speech-denoising" },
    secondary: "Bachelor of Computer Science and Engineering · Charotar University · 2019–2023",
  },
}
