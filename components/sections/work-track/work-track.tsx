"use client"

import { Children, Fragment, useEffect, useId, useRef, useState } from "react"

import { SectionHeading } from "@/components/signal/section-heading"
import type { WorkCopy } from "@/content/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { fillTemplate, indexForKey, ordinal, wrapIndex } from "@/lib/track"

import { TrackControls } from "./track-controls"
import { TrackTabs } from "./track-tabs"

type WorkTrackProps = {
  number: string
  headingId: string
  copy: WorkCopy
  titles: string[]
  cursor: { previous: string; next: string }
  /** One server-rendered panel per project, in order. */
  children: React.ReactNode
}

/**
 * Tablet and up: one panel in focus; prev / next, numbered tabs and arrow keys
 * slide the track (700 ms in-out; it jumps with reduced motion). Neighbours dim
 * and are inert, so Tab only reaches the panel in focus. Phones: a native
 * scroll-snap row where every panel is live.
 */
export function WorkTrack({ number, headingId, copy, titles, cursor, children }: WorkTrackProps) {
  const panels = Children.toArray(children)
  const count = panels.length
  const [index, setIndex] = useState(0)
  const [announcement, setAnnouncement] = useState("")
  const stepped = useMediaQuery("(min-width: 48rem)")
  const baseId = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const slides = useRef<(HTMLDivElement | null)[]>([])
  // Where focus should go once the new panel is no longer inert.
  const pendingFocus = useRef<"tab" | "slide" | null>(null)

  const trackId = `${baseId}-track`
  const slideId = (i: number) => `${baseId}-slide-${i}`
  const tabRef = (i: number) => (element: HTMLButtonElement | null) => {
    tabs.current[i] = element
  }

  const show = (next: number) => {
    setIndex(next)
    setAnnouncement(
      fillTemplate(copy.announcement, { current: next + 1, total: count, title: titles[next] })
    )
  }

  useEffect(() => {
    const target = pendingFocus.current
    pendingFocus.current = null
    if (target === "tab") tabs.current[index]?.focus()
    if (target === "slide") slides.current[index]?.focus()
  }, [index])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!stepped) return
    const next = indexForKey(event.key, index, count)
    if (next === null) return
    event.preventDefault()
    const from = event.target instanceof HTMLElement ? event.target : null
    // Keep focus with the user: on the new tab, or on the new panel if it was inside the old one.
    if (from?.dataset.trackTab !== undefined) pendingFocus.current = "tab"
    else if (from?.closest("[data-slide]")) pendingFocus.current = "slide"
    show(next)
  }

  return (
    <div onKeyDown={onKeyDown}>
      <SectionHeading
        number={number}
        label={fillTemplate(copy.label, { total: ordinal(count) })}
        title={copy.title.map((line, i) => (
          <Fragment key={line}>
            {i > 0 ? " " : null}
            <span className="block">{line}</span>
          </Fragment>
        ))}
        id={headingId}
        className="px-page"
      >
        <TrackControls
          index={index}
          count={count}
          controls={trackId}
          labels={{ previous: copy.previous, next: copy.next }}
          cursor={cursor}
          onPrevious={() => show(wrapIndex(index, -1, count))}
          onNext={() => show(wrapIndex(index, 1, count))}
        />
      </SectionHeading>

      <div
        id={trackId}
        role="group"
        aria-roledescription={copy.trackRole}
        aria-label={copy.trackLabel}
        // Phones: the row scrolls natively, so keyboard users can focus and scroll it.
        tabIndex={stepped ? undefined : 0}
        className="mt-8 snap-x snap-mandatory scroll-px-page overflow-x-auto px-page md:mt-14 md:overflow-clip"
      >
        <div
          style={{ "--track-index": index } as React.CSSProperties}
          className="flex gap-(--track-gap) md:track-offset md:transition-transform md:duration-(--duration-slow) md:ease-in-out"
        >
          {panels.map((panel, i) => {
            const active = i === index
            return (
              <div
                key={slideId(i)}
                id={slideId(i)}
                ref={(element) => {
                  slides.current[i] = element
                }}
                role="group"
                aria-roledescription={copy.slideRole}
                aria-label={fillTemplate(copy.slideLabel, { current: i + 1, total: count })}
                tabIndex={-1}
                inert={stepped && !active}
                data-slide=""
                data-active={active}
                className="min-h-(--panel-h) w-(--panel-w) shrink-0 snap-start border md:origin-left md:transition-[opacity,scale,border-color] md:duration-(--duration-slow) md:ease-in-out md:data-[active=false]:scale-(--panel-dim-scale) md:data-[active=false]:opacity-(--panel-dim) md:data-[active=true]:border-primary"
              >
                {panel}
              </div>
            )
          })}
        </div>
      </div>

      <TrackTabs
        titles={titles}
        index={index}
        label={copy.tabsLabel}
        tabLabel={copy.tabLabel}
        slideId={slideId}
        tabRef={tabRef}
        onSelect={show}
      />
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  )
}
