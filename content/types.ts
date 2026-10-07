import type { Area } from "@/lib/archive"

export type { Area }

/** A homepage section reachable from the menu. `id` is the section's anchor. */
export type NavItem = {
  number: string
  label: string
  id: string
}

export type Location = {
  city: string
  region: string
  /** IANA time zone used for the live clock. */
  timeZone: string
}

/** Every string the chrome (skip link, top bar, menu) shows or announces. */
export type ChromeCopy = {
  skipLink: string
  skipTarget: string
  homeLabel: string
  menu: string
  menuTitle: string
  navLabel: string
  close: string
  theme: {
    rowLabel: string
    night: string
    day: string
    /** Accessible names: what the toggle does from each theme. */
    switchToDay: string
    switchToNight: string
    /** Ring-cursor labels: the theme the toggle switches to. */
    cursorToDay: string
    cursorToNight: string
  }
  /** Ring-cursor labels for [data-cursor] elements. */
  cursor: {
    home: string
    menu: string
    close: string
    go: string
    scroll: string
    previous: string
    next: string
    open: string
    filter: string
    pick: string
  }
}

/** A box in a flow diagram. */
export type FlowNode = { label: string; tone?: "solid" | "dashed" | "accent" }
/** One step in a flow-diagram row: a box, or the connector between boxes. */
export type FlowStep = FlowNode | { arrow: string }

/** A diagram drawn from the project itself (no stock images). `alt` describes it. */
export type ProjectDiagram =
  | { kind: "signal"; caption: string; alt: string }
  | { kind: "flow"; rows: FlowStep[][]; note?: string; alt: string }
  | {
      kind: "diff"
      header: string
      lines: { sign: "+" | "-"; text: string }[]
      alt: string
    }

export type Project = {
  slug: string
  title: string
  kind: string
  line: string
  stack: string[]
  diagram: ProjectDiagram
  /** The panel's one action. */
  link?: { label: string; href: string; external?: boolean }
  /** Shown instead of `link` until its target exists. */
  pendingLink?: string
}

/** Copy for the Work section and its track controls. */
export type WorkCopy = {
  /** `{total}` = number of featured projects, two digits. */
  label: string
  title: string[]
  trackLabel: string
  trackRole: string
  slideRole: string
  /** `{current}`, `{total}` */
  slideLabel: string
  tabsLabel: string
  /** `{number}`, `{title}` */
  tabLabel: string
  previous: string
  next: string
  /** Announced politely when the track moves. `{current}`, `{total}`, `{title}` */
  announcement: string
}

/** A project in the archive list. Rows without `href` aren't links. */
export type ArchiveItem = {
  slug: string
  title: string
  stack: string[]
  area: Area
  href?: string
  /** Team project: shown as "Team project · my part: {role}". */
  team?: boolean
  role?: string
}

export type ArchiveCopy = {
  /** `{total}` = number of archive projects. */
  label: string
  title: string
  filtersLabel: string
  all: string
  areas: Record<Area, string>
  /** `{count}`, `{total}` */
  showing: string
  columns: string
  /** `{role}` */
  teamNote: string
}

/** One layer of the toolkit: what's in it, and where it was used. */
export type StackLayer = {
  id: string
  code: string
  name: string
  tools: string[]
  seenIn: string[]
}

export type StackCopy = {
  label: string
  title: string
  /** `{count}` */
  toolsCount: string
  seenIn: string
  /** The layer open on arrival. */
  defaultOpen: string
}

export type AboutCopy = {
  label: string
  /** The statement: a filled half, then an outlined half. */
  statement: { filled: string; outlined: string }
  bio: string
  loop: {
    label: string
    /** Accessible name for the group of steps. */
    groupLabel: string
    steps: { name: string; line: string }[]
  }
  portrait: {
    /** Path under /public once Kenny adds one; until then the frame shows `placeholder`. */
    src?: string
    alt: string
    placeholder: string
    caption: string
  }
}

/** One row of the hero's status list. `clock` rows show the live local time. */
export type HeroFact =
  | { label: string; value: string }
  | { label: string; clock: true }

export type Site = {
  name: string
  initials: string
  role: string
  location: Location
  status: string
  email: string
  links: {
    github: string
    linkedin: string
  }
  metadata: {
    title: string
    description: string
  }
  hero: {
    lines: [string, string, string]
    facts: HeroFact[]
    /** What the field does: pointer devices vs touch. */
    hint: { pointer: string; touch: string }
    /** The link to the first section; its text comes from the nav item. */
    scroll: { label: string; targetId: string }
  }
  nav: NavItem[]
  /** Link labels; external links get a decorative ↗ in the component. */
  contactLinks: {
    email: string
    github: string
    linkedin: string
  }
  chrome: ChromeCopy
  /** Temporary copy for section stubs until each section's milestone lands. */
  placeholder: {
    sectionLabel: string
  }
}
