"use client"

import { PauseIcon, PlayIcon } from "lucide-react"
import { useRef, useState } from "react"

import { MonoLabel } from "@/components/signal/mono-label"
import { RoundButton } from "@/components/signal/round-button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { CaseCopy, CaseStudy } from "@/content/types"
import { useClipUrls } from "@/hooks/use-clip-urls"
import { isPending } from "@/lib/case-study"
import { formatDuration } from "@/lib/time"
import { fillTemplate } from "@/lib/track"
import { cn } from "@/lib/utils"

import { ListenWave } from "./listen-wave"

type AbPlayerProps = {
  listen: CaseStudy["listen"]
  copy: Pick<CaseCopy, "play" | "pause" | "position">
  cursor: { pick: string; play: string }
  /** Each clip's waveform path by sample id, read from its WAV at build time. */
  waves: Record<string, string>
}

/**
 * A/B listening: the same sentence noisy, denoised and (optionally) clean.
 * Never autoplays; sound starts only from the play button, and switching
 * clips while playing carries on from the same moment. Each clip plays from
 * an object URL (see useClipUrls), so play waits until it has loaded. The
 * transcript is always on the page.
 */
export function AbPlayer({ listen, copy, cursor, waves }: AbPlayerProps) {
  const { samples } = listen
  const [activeId, setActiveId] = useState(listen.defaultSample)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState({ current: 0, total: 0 })
  const urls = useClipUrls(samples)
  const elements = useRef(new Map<string, HTMLAudioElement>())
  // Media events land after React state; only the chosen side may report.
  const activeRef = useRef(activeId)

  const active = samples.find((sample) => sample.id === activeId) ?? samples[0]
  const hasAudio = Boolean(active.src)

  const sync = (id: string, el: HTMLAudioElement) => {
    if (id !== activeRef.current) return
    setTime({ current: el.currentTime, total: el.duration })
    setPlaying(!el.paused && !el.ended)
  }

  const choose = (id: string) => {
    if (id === activeRef.current) return
    const from = elements.current.get(activeRef.current)
    const to = elements.current.get(id)
    const resume = Boolean(from && !from.paused)
    activeRef.current = id
    setActiveId(id)
    from?.pause()
    if (!to) {
      setPlaying(false)
      setTime({ current: 0, total: 0 })
      return
    }
    if (from) to.currentTime = from.currentTime
    sync(id, to)
    if (resume) to.play().catch(() => setPlaying(false))
  }

  const toggle = () => {
    const el = elements.current.get(activeRef.current)
    if (!el) return
    if (el.paused) el.play().catch(() => setPlaying(false))
    else el.pause()
  }

  const progress = hasAudio && time.total > 0 ? (time.current / time.total) * 100 : null
  const action = fillTemplate(playing ? copy.pause : copy.play, { label: active.label })

  return (
    <figure className="flex min-w-0 flex-col gap-3.5 border-t border-foreground pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MonoLabel tone="muted">{listen.fig}</MonoLabel>
        <ToggleGroup
          aria-label={listen.groupLabel}
          value={[activeId]}
          // Pressing the chosen side again would clear the group; keep it.
          onValueChange={(value) => value[0] && choose(value[0])}
          variant="chip"
          size="chip"
          className="flex-wrap"
        >
          {samples.map((sample) => (
            <ToggleGroupItem key={sample.id} value={sample.id} data-cursor={cursor.pick}>
              {sample.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <ListenWave tone={active.tone} wave={waves[active.id] ?? null} progress={progress} />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-data">
        <RoundButton
          aria-label={action}
          disabled={!urls[active.id]}
          onClick={toggle}
          data-cursor={cursor.play}
          className="size-11"
        >
          {playing ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
        </RoundButton>
        <span>{active.detail}</span>
        <span className="text-muted-foreground md:ml-auto">
          {hasAudio
            ? fillTemplate(copy.position, {
                current: formatDuration(time.current),
                total: formatDuration(time.total),
              })
            : listen.pending}
        </span>
      </div>
      <p className="font-mono text-xs">
        <span className="text-muted-foreground">{listen.transcriptLabel}: </span>
        <span className={cn(isPending(listen.transcript) ? "text-muted-foreground" : "text-foreground-2")}>
          {listen.transcript}
        </span>
      </p>
      <figcaption className="font-mono text-xs text-muted-foreground">{listen.caption}</figcaption>
      {samples.map(({ id }) =>
        urls[id] ? (
          <audio
            key={id}
            src={urls[id]}
            preload="auto"
            ref={(el) => {
              if (!el) return
              elements.current.set(id, el)
              return () => {
                elements.current.delete(id)
              }
            }}
            onLoadedMetadata={(e) => sync(id, e.currentTarget)}
            onTimeUpdate={(e) => sync(id, e.currentTarget)}
            onPlay={(e) => sync(id, e.currentTarget)}
            onPause={(e) => sync(id, e.currentTarget)}
            onEnded={(e) => sync(id, e.currentTarget)}
          />
        ) : null
      )}
    </figure>
  )
}
