const MINUTE = 60_000

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatterFor(timeZone: string) {
  let formatter = formatters.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // never "24:05"
      timeZoneName: "short",
    })
    formatters.set(timeZone, formatter)
  }
  return formatter
}

/** "21:28 ADT" (or "21:28" with `zone: false`) for an instant in an IANA time zone. */
export function formatClock(
  date: Date,
  timeZone: string,
  { zone = true }: { zone?: boolean } = {}
): string {
  const parts = formatterFor(timeZone).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""
  const time = `${part("hour")}:${part("minute")}`
  return zone ? `${time} ${part("timeZoneName")}` : time
}

/** Whole minutes since the epoch; the clock only needs to change once a minute. */
export function currentMinute(now = Date.now()): number {
  return Math.floor(now / MINUTE)
}

export function minuteToDate(minute: number): Date {
  return new Date(minute * MINUTE)
}
