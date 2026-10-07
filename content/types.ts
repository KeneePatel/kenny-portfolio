export type Location = {
  city: string
  region: string
  /** IANA time zone used for the live clock. */
  timeZone: string
}

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
  }
}
