import { Button } from "@/components/ui/button"

type PillProps = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> & {
  /** `icon` for icon-only pills (still at least 44px square). */
  size?: "default" | "icon"
}

/** Interactive pill: the chrome's buttons (theme, Menu, Close). */
export function Pill({ size = "default", ...props }: PillProps) {
  return (
    <Button
      variant="pill"
      size={size === "icon" ? "pill-icon" : "pill"}
      {...props}
    />
  )
}
