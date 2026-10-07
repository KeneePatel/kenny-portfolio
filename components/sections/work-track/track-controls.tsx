import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { RoundButton } from "@/components/signal/round-button"
import { ordinal } from "@/lib/track"

type TrackControlsProps = {
  index: number
  count: number
  controls: string
  labels: { previous: string; next: string }
  cursor: { previous: string; next: string }
  onPrevious: () => void
  onNext: () => void
}

/** "01 / 03" and the round prev / next buttons. Tablet and up only. */
export function TrackControls({
  index,
  count,
  controls,
  labels,
  cursor,
  onPrevious,
  onNext,
}: TrackControlsProps) {
  return (
    <div className="hidden items-center gap-3.5 md:flex">
      <p className="font-mono text-data">
        <span>{ordinal(index + 1)}</span>
        <span className="text-muted-foreground"> / {ordinal(count)}</span>
      </p>
      <RoundButton
        aria-label={labels.previous}
        aria-controls={controls}
        data-cursor={cursor.previous}
        onClick={onPrevious}
      >
        <ArrowLeftIcon aria-hidden="true" />
      </RoundButton>
      <RoundButton
        aria-label={labels.next}
        aria-controls={controls}
        data-cursor={cursor.next}
        onClick={onNext}
      >
        <ArrowRightIcon aria-hidden="true" />
      </RoundButton>
    </div>
  )
}
