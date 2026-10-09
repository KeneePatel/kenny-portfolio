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
  /** Homepage skip link (to the selected work). */
  skipLink: string
  skipTarget: string
  /** Every other page: skip to the start of `<main>`. */
  skipToContent: string
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
    write: string
    copy: string
    play: string
    view: string
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

export type ContactCopy = {
  label: string
  title: { filled: string; outlined: string }
  copy: {
    idle: string
    done: string
    failed: string
    /** Announced politely (screen readers) after a copy attempt. */
    announceDone: string
    announceFailed: string
  }
  /** "It’s {time} in Halifax right now." around the live clock. */
  live: { before: string; after: string }
}

export type FooterCopy = {
  place: string
  copyright: string
  backToTop: string
}

/** One line of the open-source log. Rows without `href` aren't links. */
export type OpenSourceEntry = {
  title: string
  type: string
  href?: string
}

export type OpenSourceCopy = {
  number: string
  label: string
  title: { filled: string; outlined: string }
}

export type Lane = "education" | "engineering" | "open-source" | "other"

/** One bar on the Path timeline. Dates are "YYYY-MM"; `end` may be "present". */
export type TimelineItem = {
  id: string
  lane: Lane
  title: string
  /** Short date label shown beside the title, e.g. "Dec 22–May 23". */
  dates: string
  start: string
  end: string | "present"
  /** Technical work draws a 6px bar; other work a 2px grey one. */
  kind: "technical" | "other"
  /** Drawn as an outline rather than a filled bar. */
  hollow?: boolean
}

export type PathCopy = {
  label: string
  title: string
  lanes: { id: Lane; name: string; quiet?: boolean }[]
  yearsLabel: string
  /** `{year}` */
  inYear: string
  firstYear: number
  defaultYear: number
  /** "Now" for the timeline, as YYYY-MM. Bump it when updating the site. */
  asOf: string
  education: {
    label: string
    headline: string
    details: string[]
    gpa: string
    /** The thesis case study. */
    thesis: { label: string; href: string }
    secondary: string
  }
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
  /** The 404 page: label, a filled and an outlined phrase, one line, the way home. */
  notFound: {
    metaTitle: string
    label: string
    title: { filled: string; outlined: string }
    body: string
    home: { label: string; href: string }
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
}

/** A link that may not exist yet: until `href` is set, `pending` shows in its place. */
export type PendingLink = { label: string; href?: string; pending?: string; external?: boolean }

/** A case-study row: mono heading, one statement, an optional side note. */
export type CaseBlock = { id: string; heading: string; statement: string; note?: string }

/** One bar. `value: null` until the number is confirmed (drawn dashed, never as data). */
export type ChartRow = { label: string; group: string; value: number | null; highlight?: boolean }

export type CaseChart = {
  id: string
  fig: string
  title: string
  /** Table column headers: label, group, value. */
  columns: [string, string, string]
  format: { decimals: number; signed?: boolean; unit?: string }
  rows: ChartRow[]
  caption: string
}

/** One side of the A/B listening test. `src` is a path under /public once Kenny adds the clip. */
export type AudioSample = { id: string; label: string; detail: string; noisy: boolean; src?: string }

/** A spectrogram panel. `src` is a path under /public; until then `pending` fills the frame. */
export type CaseImage = { label: string; alt: string; src?: string; pending: string }

export type CaseStudy = {
  /** Matches a featured project's slug. */
  slug: string
  kind: string
  title: { filled: string; outlined: string }
  lede: string
  meta: { term: string; detail: string }[]
  result: {
    label: string
    /** The one key number on the page (accent colour). Until confirmed, `pending` shows instead. */
    value?: string
    pending: string
    caption: string
    note: string
  }
  listen: {
    fig: string
    groupLabel: string
    samples: AudioSample[]
    /** The sample chosen on arrival. */
    defaultSample: string
    transcriptLabel: string
    transcript: string
    pending: string
    caption: string
  }
  story: CaseBlock[]
  approach: {
    block: CaseBlock
    groups: { label: string; items: string[]; tone?: "data" | "outcome" }[]
  }
  spectrograms: { fig: string; axis: { frequency: string; time: string }; images: CaseImage[]; caption: string }
  decisions: CaseBlock[]
  results: { id: string; heading: string; charts: CaseChart[]; listening: CaseBlock }
  learned: { block: CaseBlock; linksLabel: string; links: PendingLink[] }
}

/** Strings every case study shares. */
export type CaseCopy = {
  /** `{number}`, `{total}`, `{kind}` */
  eyebrow: string
  allWork: { label: string; href: string }
  next: string
  /** The ending when there's no next case study: a filled and an outlined phrase. */
  backTo: { label: string; filled: string; outlined: string }
  /** `{label}`: the chosen sample. */
  play: string
  pause: string
  /** `{current}` / `{total}` around the clip position. */
  position: string
  chartView: string
  /** Shown in a chart for a value that isn't in yet. */
  pendingValue: string
  /** Metadata title: `{title}` */
  metaTitle: string
}
