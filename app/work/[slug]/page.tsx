import { readFileSync } from "node:fs"
import path from "node:path"

import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

import { CaseStudyView } from "@/components/case-study/case-study-view"
import { WAVE_BOX } from "@/components/case-study/listen-wave"
import { JsonLd } from "@/components/seo/json-ld"
import { caseCopy, caseStudies } from "@/content/case-studies"
import { featured } from "@/content/projects"
import { language } from "@/content/seo"
import { site } from "@/content/site"
import type { CaseStudy } from "@/content/types"
import { nextWithCase, positionIn } from "@/lib/case-study"
import { pageMetadata } from "@/lib/metadata"
import { caseStudyGraph } from "@/lib/structured-data"
import { fillTemplate, ordinal } from "@/lib/track"
import { envelopePath, peakOf, readPcm16 } from "@/lib/wav"

const order = featured.map((project) => project.slug)
const withCase = new Set(caseStudies.map((study) => study.slug))
const titleOf = (slug: string) => featured.find((project) => project.slug === slug)?.title ?? slug

/**
 * Waveforms for the listening test, read from the clips in public/ at build
 * time. All clips share one scale, so a quieter version looks quieter.
 */
function wavesFor(samples: CaseStudy["listen"]["samples"]): Record<string, string> {
  const clips = samples.flatMap(({ id, src }) =>
    src ? [{ id, data: readPcm16(new Uint8Array(readFileSync(path.join(process.cwd(), "public", src)))) }] : []
  )
  const peak = Math.max(...clips.map(({ data }) => peakOf(data)))
  return Object.fromEntries(clips.map(({ id, data }) => [id, envelopePath(data, { ...WAVE_BOX, peak })]))
}

// Only the case studies in content exist; any other slug is a 404 (out/404.html on the host).
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata(
  { params }: PageProps<"/work/[slug]">,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((item) => item.slug === slug)
  if (!study) return { title: site.notFound.metaTitle }
  const { openGraph, twitter } = await parent
  return pageMetadata({
    path: `/work/${slug}`,
    title: fillTemplate(caseCopy.metaTitle, { title: study.seo.title }),
    description: study.seo.description,
    siteName: site.name,
    type: "article",
    images: { openGraph: openGraph?.images, twitter: twitter?.images },
  })
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
      <JsonLd
        data={caseStudyGraph({
          origin: site.url,
          path: `/work/${slug}`,
          name: titleOf(slug),
          headline: study.seo.title,
          description: study.seo.description,
          image: `${site.url}/opengraph-image.png`,
          keywords: featured.find((project) => project.slug === slug)?.stack ?? [],
          language,
          author: site.name,
          home: site.name,
          basedOn: study.seo.basedOn,
        })}
      />
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
        waves={wavesFor(study.listen.samples)}
      />
    </main>
  )
}
