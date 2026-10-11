import {
  logoAxis,
  logoPoints,
  logoViewBox,
  logoWave,
  logoWaveWidth,
} from "@/lib/logo"
import { cn } from "@/lib/utils"

type LogoMarkProps = Omit<React.ComponentProps<"svg">, "children"> & {
  /** Accessible name. Leave it out when the link around it is already named. */
  title?: string
}

/**
 * The Signal mark. Plain points use the text colour; the wave and the two
 * points nearest it use --primary, so the mark follows the theme.
 *
 * Inside a `group` (the home link), hover or keyboard focus slides the points
 * onto the wave's axis: the noise lines up into signal. With reduced motion
 * they still line up, just without the slide.
 */
export function LogoMark({ title, className, ...props }: LogoMarkProps) {
  return (
    <svg
      viewBox={logoViewBox}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={cn("block h-5 w-auto shrink-0", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {logoPoints.map((point) => (
        <circle
          key={point.cx}
          cx={point.cx}
          cy={point.cy}
          r={point.r}
          fillOpacity={point.opacity}
          // How far this point travels to reach the axis, in the mark's units.
          style={{ "--logo-dy": `${logoAxis - point.cy}px` } as React.CSSProperties}
          className={cn(
            point.accent ? "fill-primary" : "fill-current",
            "transition-[translate] duration-(--duration-ring) ease-out",
            "group-hover:translate-y-(--logo-dy) group-focus-visible:translate-y-(--logo-dy)"
          )}
        />
      ))}
      <path
        d={logoWave}
        strokeWidth={logoWaveWidth}
        strokeLinecap="round"
        className="stroke-primary"
      />
    </svg>
  )
}
