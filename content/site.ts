import type { Site } from "./types"

/*
 * Site-wide copy and facts. Facts come from the resume (resources/Resume.pdf);
 * the voice is "Plain". Never add facts that aren't sourced.
 */
export const site: Site = {
  name: "Kenny Patel",
  url: "https://kennypatel.dev",
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
    title: "Kenny Patel · Software engineer in Halifax, Nova Scotia",
    description:
      "I’m Kenny Patel, a software engineer in Halifax, Nova Scotia. I build full-stack, cloud, and ML projects, from a speech-denoising U-Net to Kubernetes on GKE.",
  },
  // "Kenee" is the name on his GitHub (KeneePatel), LinkedIn (patelkenee) and research report.
  identity: {
    alternateName: "Kenee Patel",
    country: "CA",
    alumniOf: ["Dalhousie University", "Charotar University"],
  },
  llms: {
    work: "Selected work",
    archive: "Other projects",
    openSource: "Open source (Starknet)",
    education: "Education",
    contact: "Contact",
    teamPart: "Team project · my part: {part}",
    research: "Research project case study",
  },
  notFound: {
    metaTitle: "Page not found · Kenny Patel",
    label: "404 · Not found",
    title: { filled: "Oops,", outlined: "wrong turn." },
    body: "This page doesn’t exist. The homepage does, though.",
    home: { label: "Back to the homepage", href: "/" },
  },
  hero: {
    lines: ["Hi.", "I’m Kenny Patel.", "I build software, start to finish."],
    facts: [
      { label: "Based", value: "Halifax, NS" },
      { label: "Local", clock: true },
      { label: "Builds", value: "Full-stack · Cloud · ML" },
      { label: "Status", value: "Open to roles" },
    ],
    hint: {
      pointer: "Go on, move your cursor around. The dots tidy up as you go.",
      touch: "Go on, drag a finger across. The dots tidy up as you go.",
    },
    scroll: { label: "Scroll", targetId: "work" },
  },
  nav: [
    { number: "01", label: "Work", id: "work" },
    { number: "02", label: "Archive", id: "archive" },
    { number: "03", label: "About", id: "about" },
    { number: "04", label: "Toolkit", id: "toolkit" },
    { number: "05", label: "Path", id: "path" },
    { number: "07", label: "Contact", id: "contact" },
  ],
  contactLinks: {
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  chrome: {
    skipLink: "Skip to selected work",
    skipTarget: "work",
    skipToContent: "Skip to content",
    homeLabel: "Kenny Patel, home",
    menu: "Menu",
    menuTitle: "Index",
    navLabel: "Primary",
    close: "Close",
    theme: {
      rowLabel: "Theme",
      night: "Night",
      day: "Day",
      switchToDay: "Theme: night. Switch to day",
      switchToNight: "Theme: day. Switch to night",
      cursorToDay: "day",
      cursorToNight: "night",
    },
    cursor: {
      home: "top",
      menu: "menu",
      close: "close",
      go: "go",
      scroll: "scroll",
      previous: "prev",
      next: "next",
      open: "open",
      filter: "filter",
      pick: "pick",
      write: "write",
      copy: "copy",
      play: "play",
      view: "view",
    },
  },
}
