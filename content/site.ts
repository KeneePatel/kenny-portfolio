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
    facts: [
      { label: "Based", value: "Halifax, NS" },
      { label: "Local", clock: true },
      { label: "Builds", value: "Full-stack · Cloud · ML" },
      { label: "Status", value: "Open to roles" },
    ],
    hint: {
      pointer: "Move your cursor — the noise clears where you look.",
      touch: "Drag across the field — the noise clears where you touch.",
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
    },
  },
}
