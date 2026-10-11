import type { CaseCopy, CaseStudy, ChromeCopy } from "@/content/types"

import { AbPlayer } from "./ab-player"
import { ApproachDiagram } from "./approach-diagram"
import { BarChart } from "./bar-chart"
import { CaseEnding } from "./case-ending"
import { CaseHeader } from "./case-header"
import { CaseLinks } from "./case-links"
import { KeyResult } from "./key-result"
import { Spectrograms } from "./spectrograms"
import { StoryRow } from "./story-row"

type CaseStudyViewProps = {
  study: CaseStudy
  copy: CaseCopy
  eyebrow: string
  next: { href: string; label: string; title: string } | null
  cursor: ChromeCopy["cursor"]
  /** Waveform paths by audio sample id, drawn from the WAV files at build time. */
  waves: Record<string, string>
}

/**
 * A case study, top to bottom: header and meta, the key result beside the A/B
 * listening test, the story, the approach, figures, results, lessons, and the
 * way out. Server-rendered; only the player and the charts are interactive.
 */
export function CaseStudyView({ study, copy, eyebrow, next, cursor, waves }: CaseStudyViewProps) {
  const { listen, story, approach, spectrograms, decisions, results, learned } = study
  const [leadChart, ...moreCharts] = results.charts
  const chartCopy = { view: copy.chartView, pending: copy.pendingValue }

  return (
    <article className="flex flex-col">
      <CaseHeader study={study} eyebrow={eyebrow} back={copy.allWork} cursor={cursor.home} />

      <div className="mt-16 page-grid gap-y-12 md:mt-28">
        <div className="col-span-full flex lg:col-span-4">
          <KeyResult result={study.result} />
        </div>
        <div className="col-span-full lg:col-span-8">
          <AbPlayer
            listen={listen}
            copy={{ play: copy.play, pause: copy.pause, position: copy.position }}
            cursor={{ pick: cursor.pick, play: cursor.play }}
            waves={waves}
          />
        </div>
      </div>

      <div className="mt-20 md:mt-36">
        {story.map((block) => (
          <StoryRow key={block.id} block={block} />
        ))}
        <StoryRow block={approach.block} wide>
          <ApproachDiagram groups={approach.groups} />
        </StoryRow>
      </div>

      <div className="mt-16 md:mt-28">
        <Spectrograms figure={spectrograms} />
      </div>

      <div className="mt-20 md:mt-36">
        {decisions.map((block) => (
          <StoryRow key={block.id} block={block} />
        ))}
        <StoryRow block={{ id: results.id, heading: results.heading, statement: "" }} wide>
          {leadChart ? <BarChart chart={leadChart} copy={chartCopy} cursor={cursor.view} /> : null}
          {moreCharts.length > 0 ? (
            <div className="grid gap-x-gutter gap-y-12 pt-6 xl:grid-cols-2">
              {moreCharts.map((chart) => (
                <BarChart key={chart.id} chart={chart} copy={chartCopy} cursor={cursor.view} />
              ))}
            </div>
          ) : null}
        </StoryRow>
        <StoryRow block={results.followUp} />
        <StoryRow
          block={learned.block}
          aside={<CaseLinks label={learned.linksLabel} links={learned.links} cursor={cursor.open} />}
        />
      </div>

      <div className="mt-16 md:mt-28">
        <CaseEnding copy={copy} next={next} cursor={{ home: cursor.home, open: cursor.open }} />
      </div>
    </article>
  )
}
