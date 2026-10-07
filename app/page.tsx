import { site } from "@/content/site"

// Temporary: the real hero and sections land in M3–M10.
export default function Home() {
  const [greeting, line2, line3] = site.hero.lines

  return (
    <main id="main" className="px-page py-24">
      <h1 className="flex flex-col">
        <span className="text-greeting">{greeting}</span>
        <span className="text-statement">{line2}</span>
        <span className="text-statement type-outline">{line3}</span>
      </h1>
    </main>
  )
}
