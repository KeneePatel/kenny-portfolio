import type { AboutCopy } from "./types"

/*
 * About: copy from the art-direction canvas. Facts checked against the
 * resume (MACS at Dalhousie, open-source work) and CLAUDE.md (the thesis on
 * speech denoising). No portrait in resources yet.
 */
export const about: AboutCopy = {
  label: "About",
  statement: {
    filled: "I like understanding how things work",
    outlined: "— and then building them myself.",
  },
  bio: "Software engineer in Halifax. Master of Applied Computer Science from Dalhousie, with a thesis on removing noise from speech. I build across the stack — interfaces, services, cloud infrastructure — and I contribute to open source.",
  loop: {
    label: "How I think — pick a step",
    groupLabel: "How I think",
    steps: [
      { name: "Build", line: "Make the first version myself, even if it is rough." },
      { name: "Break", line: "Push it until it fails — load, edge cases, bad input." },
      { name: "Understand", line: "Trace the failure to its cause, not its symptom." },
      { name: "Rebuild", line: "Make it better, and write down what changed." },
    ],
  },
  portrait: {
    alt: "Kenny Patel",
    placeholder: "[TODO: portrait — monochrome, high contrast]",
    caption: "fig. 1 — Halifax, NS. 44.65° N, 63.58° W.",
  },
}
