import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CaseStudyView } from "@/components/case-study/case-study-view"
import { caseCopy, caseStudies } from "@/content/case-studies"
import { featured } from "@/content/projects"
import { site } from "@/content/site"
import { nextWithCase, positionIn } from "@/lib/case-study"
import { fillTemplate, ordinal } from "@/lib/track"

const order = featured.map((project) => project.slug)
const withCase = new Set(caseStudies.map((study) => study.slug))
const titleOf = (slug: string) => featured.find((project) => project.slug === slug)?.title ?? slug

// Case studies are fully static; an unknown slug waits for the render, so it gets a real 404.
export const ensureStatic = "navigation"

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)
  if (!study) return { title: site.notFound.metaTitle }
  return {
    title: fillTemplate(caseCopy.metaTitle, { title: titleOf(slug) }),
    description: study.lede,
  }
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)
  if (!study) notFound()

  const nextSlug = nextWithCase(order, slug, withCase)
  const next = nextSlug
    ? {
        href: `/work/${nextSlug}`,
        label: fillTemplate(caseCopy.next, { number: ordinal(positionIn(order, nextSlug)) }),
        title: titleOf(nextSlug),
      }
    : null

  return (
    <main id="main" tabIndex={-1} className="px-page pt-36 pb-16 md:pt-44">
      <CaseStudyView
        study={study}
        copy={caseCopy}
        eyebrow={fillTemplate(caseCopy.eyebrow, {
          number: ordinal(positionIn(order, slug)),
          total: ordinal(order.length),
          kind: study.kind,
        })}
        next={next}
        cursor={site.chrome.cursor}
      />
    </main>
  )
}
