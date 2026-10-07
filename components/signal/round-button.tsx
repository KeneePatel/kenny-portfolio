import { Button } from "@/components/ui/button"

/** 52px circular button (track prev / next). Give it an aria-label: it's icon-only. */
export function RoundButton(
  props: Omit<React.ComponentProps<typeof Button>, "variant" | "size">
) {
  return <Button variant="round" size="round" {...props} />
}
