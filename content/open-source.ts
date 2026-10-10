import type { OpenSourceCopy, OpenSourceEntry } from "./types"

/*
 * The open-source log, Starknet ecosystem, Mar–Dec 2024. The first three rows
 * are from the current resume; the last two from the earlier one.
 * [TODO: Kenny to add links to the pull requests.]
 */
export const openSource: OpenSourceEntry[] = [
  { title: "Moved a Cairo VM codebase from JavaScript to TypeScript in five merged pull requests", type: "Migration" },
  { title: "Built React features for two Starknet dApps, including a progress bar with scaled targets", type: "Frontend" },
  { title: "Added pagination to a trading backend’s position-history endpoint", type: "Backend" },
  { title: "Patched a critical authentication vulnerability", type: "Security" },
  { title: "Fixed defects across six-plus production repositories", type: "Fixes" },
]

export const openSourceCopy: OpenSourceCopy = {
  number: "06",
  label: "Open source · Starknet",
  title: { filled: "Helping out", outlined: "on open source." },
}
