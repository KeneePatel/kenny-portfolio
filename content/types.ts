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
