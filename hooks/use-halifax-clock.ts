import { useSyncExternalStore } from "react"

import { clockInterval } from "@/lib/motion"
import { currentMinute } from "@/lib/time"

/*
 * One shared store for every clock on the page: a single interval runs while
 * at least one clock is mounted, and pauses while the tab is hidden.
 */
const listeners = new Set<() => void>()
let minute: number | null = null
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  const next = currentMinute()
  if (next !== minute) {
    minute = next
    listeners.forEach((listener) => listener())
  }
}

function start() {
  tick()
  timer ??= setInterval(tick, clockInterval)
}

function stop() {
  clearInterval(timer)
  timer = undefined
}

function onVisibilityChange() {
  if (document.hidden) stop()
  else start()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    start()
    document.addEventListener("visibilitychange", onVisibilityChange)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      stop()
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }
}

function getSnapshot() {
  minute ??= currentMinute()
  return minute
}

// Nothing on the server or during hydration: the time only exists in the browser.
function getServerSnapshot() {
  return null
}

/** The current minute (epoch minutes), or null until mounted. */
export function useHalifaxClock(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
