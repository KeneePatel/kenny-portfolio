import type { OpenSourceCopy, OpenSourceEntry } from "./types"

/*
 * The open-source log, from the resume (Starknet ecosystem, 2023–24).
 * The canvas listed more specific entries: "Cairo VM GS", "JavaScript →
 * TypeScript migration", "Interactive execution issues", "Kakarot —
 * authentication testing". [TODO: Kenny to confirm and add links.]
 */
export const openSource: OpenSourceEntry[] = [
  { title: "Defect fixes across six-plus production repositories", type: "Contribution" },
  { title: "A critical authentication vulnerability, patched", type: "Security" },
  { title: "Issue reports with reproduction steps", type: "Issues" },
]

export const openSourceCopy: OpenSourceCopy = {
  number: "06",
  label: "Open source · Starknet",
  title: { filled: "Built by others.", outlined: "Improved by many." },
}
