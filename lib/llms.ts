/*
 * /llms.txt: a plain Markdown summary of the site for AI assistants
 * (https://llmstxt.org). Pure: the route passes content in and serves the text.
 */
import { fillTemplate } from "./track"

type Entry = { title: string; href?: string; text?: string; stack?: string[]; note?: string }

type LlmsInput = {
  origin: string
  name: string
  summary: string
  bio: string
  facts: string[]
  headings: { work: string; archive: string; openSource: string; education: string; contact: string; teamPart: string }
  work: Entry[]
  archive: (Entry & { role?: string })[]
  openSource: string[]
  education: string[]
  contact: { label: string; value: string; href: string }[]
}

/** Site-relative links ("/work/x", "#open-source") become absolute. */
export function absolute(origin: string, href: string): string {
  if (href.startsWith("#")) return href === "#top" ? `${origin}/` : `${origin}/${href}`
  if (href.startsWith("/")) return `${origin}${href}`
  return href
}

function entryLine(origin: string, { title, href, text, stack, note }: Entry): string {
  const name = href ? `[${title}](${absolute(origin, href)})` : title
  const parts = [text, stack?.length ? `Stack: ${stack.join(", ")}.` : undefined, note].filter(Boolean)
  return parts.length ? `- ${name}: ${parts.join(" ")}` : `- ${name}`
}

export function llmsText(input: LlmsInput): string {
  const { origin, headings } = input
  const sections = [
    `# ${input.name}`,
    `> ${input.summary}`,
    input.bio,
    input.facts.map((fact) => `- ${fact}`).join("\n"),
    `## ${headings.work}`,
    input.work.map((entry) => entryLine(origin, entry)).join("\n"),
    `## ${headings.archive}`,
    input.archive
      .map(({ role, ...entry }) =>
        entryLine(origin, { ...entry, note: role ? `${fillTemplate(headings.teamPart, { part: role })}.` : undefined })
      )
      .join("\n"),
    `## ${headings.openSource}`,
    input.openSource.map((line) => `- ${line}`).join("\n"),
    `## ${headings.education}`,
    input.education.map((line) => `- ${line}`).join("\n"),
    `## ${headings.contact}`,
    input.contact.map(({ label, value, href }) => `- ${label}: [${value}](${href})`).join("\n"),
  ]
  return `${sections.join("\n\n")}\n`
}
