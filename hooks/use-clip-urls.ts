import { useEffect, useState } from "react"

type Clip = { id: string; src?: string }

/**
 * Downloads each clip once and returns an object URL for it, by id (empty
 * until each one arrives). Cloudflare's static assets ignore byte-range
 * requests, so audio played straight from them can't seek in Chrome and
 * won't play at all in Safari. Audio from an object URL always can, which
 * the A/B player needs to switch versions mid-sentence.
 */
export function useClipUrls(clips: Clip[]): Record<string, string> {
  const [urls, setUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    const controller = new AbortController()
    const made: string[] = []
    for (const { id, src } of clips) {
      if (!src) continue
      fetch(src, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`${src}: ${response.status}`)
          return response.blob()
        })
        .then((blob) => {
          if (controller.signal.aborted) return
          const url = URL.createObjectURL(blob)
          made.push(url)
          setUrls((current) => ({ ...current, [id]: url }))
        })
        // A clip that fails to load keeps its play button disabled.
        .catch(() => {})
    }
    return () => {
      controller.abort()
      made.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [clips])

  return urls
}
