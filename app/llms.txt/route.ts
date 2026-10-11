import { about } from "@/content/about"
import { archive } from "@/content/archive"
import { caseStudies } from "@/content/case-studies"
import { openSource } from "@/content/open-source"
import { featured } from "@/content/projects"
import { site } from "@/content/site"
import { path } from "@/content/timeline"
import { llmsText } from "@/lib/llms"

// Built once at `next build` into out/llms.txt (static export).
export const dynamic = "force-static"

export function GET() {
  const { education } = path
  const text = llmsText({
    origin: site.url,
    name: site.name,
    summary: site.metadata.description,
    bio: about.bio,
    facts: site.hero.facts.flatMap((fact) => ("value" in fact ? [`${fact.label}: ${fact.value}`] : [])),
    headings: site.llms,
    work: featured.map((project) => {
      const study = caseStudies.find((item) => item.slug === project.slug)
      return {
        title: project.title,
        href: study ? `/work/${study.slug}` : project.link?.href,
        text: study ? `${project.line} ${study.seo.description}` : project.line,
        stack: project.stack,
      }
    }),
    archive: archive.map(({ title, href, stack, role }) => ({ title, href, stack, role })),
    openSource: openSource.map(({ title }) => `${title}.`),
    education: [
      `${education.headline}, ${education.details.join(", ")}, ${education.gpa}. [${site.llms.research}](${site.url}${education.research.href})`,
      education.secondary,
    ],
    contact: [
      { label: site.contactLinks.email, value: site.email, href: `mailto:${site.email}` },
      { label: site.contactLinks.github, value: site.links.github, href: site.links.github },
      { label: site.contactLinks.linkedin, value: site.links.linkedin, href: site.links.linkedin },
    ],
  })
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
