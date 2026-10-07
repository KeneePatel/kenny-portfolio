/** First focusable element on every page; hidden until focused. */
export function SkipLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="sr-only bg-primary px-4 py-3 font-mono text-data text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-(--z-skip)"
    >
      {children}
    </a>
  )
}
