import type { AboutCopy } from "./types"

/*
 * About. Facts from the resume (MACS at Dalhousie, open-source work) and
 * CLAUDE.md (the research project on speech denoising). The portrait is resources/pic1.jpg,
 * exported to public/portrait.jpg at 1200px and to WebP at 480, 640, 800 and
 * 960px (quality 80) for lib/image-loader.ts, all with metadata stripped.
 */
export const about: AboutCopy = {
  label: "About",
  statement: {
    filled: "I like taking things apart",
    outlined: "and building my own.",
  },
  bio: "I’m Kenny, a software engineer living in Halifax. I did my master’s at Dalhousie, where my research project taught a neural network to clean up noisy speech. These days I build whole products, from the interface down to the cloud setup, and I pitch in on open source when I can.",
  loop: {
    label: "How I think (pick a step)",
    groupLabel: "How I think",
    steps: [
      { name: "Build", line: "I start with a scrappy first version I make myself." },
      { name: "Break", line: "Then I try to break it, on purpose." },
      { name: "Understand", line: "When it breaks, I dig until I know why." },
      { name: "Rebuild", line: "Then I build it again, better, and write down what I learned." },
    ],
  },
  portrait: {
    src: "/portrait.jpg",
    alt: "Kenny Patel in glasses and a checked shirt, looking off to one side.",
    placeholder: "[TODO: portrait]",
    caption: "fig. 1 · Halifax, NS. 44.65° N, 63.58° W.",
  },
}
