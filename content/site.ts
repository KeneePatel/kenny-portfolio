import type { Site } from "./types"

/*
 * Site-wide copy and facts. Strings come from the art-direction canvas and the
 * resume; Kenny will rewrite copy later. Never add facts that aren't sourced.
 */
export const site: Site = {
  name: "Kenny Patel",
  initials: "KP",
  role: "Software engineer",
  location: {
    city: "Halifax",
    region: "Nova Scotia",
    timeZone: "America/Halifax",
  },
  status: "Software engineer · open to full-time roles",
  email: "patelkenee2804@gmail.com",
  links: {
    github: "https://github.com/KeneePatel",
    linkedin: "https://www.linkedin.com/in/patelkenee/",
  },
  metadata: {
    title: "Kenny Patel — Software engineer, Halifax",
    description: "[TODO: one-line site description]",
  },
  hero: {
    lines: ["Hi.", "I’m Kenny Patel.", "And this is my website."],
  },
}
