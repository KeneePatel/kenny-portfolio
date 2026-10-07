@AGENTS.md
@resources/kenny_patel_portfolio_art_direction.html

# Kenny Patel — Portfolio (“Signal”)

Personal portfolio for Kenny Patel, software engineer in Halifax, NS. The design is **Direction 3 — Experimental Interactive**: night-first, one amber accent, huge type in filled and outlined voices, and a hero “field” of noisy dots that clears into a clean signal wherever the cursor goes (from Kenny’s master’s thesis on speech denoising).

The design lives on a Claude Design canvas (Kenny can open it; agents can’t):
https://claude.ai/code/artifact/1d6d6c0a-03dc-42c4-94cd-eb7e63801aec
**This file is the source of truth for agents.** If something here conflicts with the canvas, ask Kenny.

---

## Stack & commands

- Next.js (App Router) · TypeScript (strict) · Tailwind · shadcn/ui · **pnpm only** (never npm/yarn/bun).
- `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm exec tsc --noEmit` (typecheck)
- Add shadcn components with `pnpm dlx shadcn@latest add <name>`. Never hand-write a shadcn component that the CLI can generate.
- shadcn style is `base-luma` (Base UI, not Radix: compose with the `render` prop, not `asChild`). After adding a component, change its `import { cn } from "cn"` to `import { cn } from "@/lib/utils"`. The configured `cn` knows our theme scales; the plain one merges `text-label` away as a colour.
- **Ask before adding any dependency** not listed here. Prefer CSS + small hooks over animation libraries. Allowed without asking: `next-themes`, shadcn-generated deps (e.g. `embla-carousel-react`, Radix packages), `clsx`/`tailwind-merge`/`class-variance-authority`.

## Skills (`.claude/skills`)

This repo has project skills in `.claude/skills/<name>/SKILL.md`. Use them — they encode how Kenny wants things done.

1. At the start of every task, list `.claude/skills/` and read the `description` in each `SKILL.md` frontmatter.
2. If a skill matches the task, **read its whole `SKILL.md` before writing code** and follow it. If several match, apply all of them.
3. On conflict: this file wins for project decisions (tokens, structure, behaviour); the skill wins for technique.
4. In your final summary, name the skills you used.
5. Don’t edit skills unless asked. If you find a skill folder that isn’t in the table below, add a row.

| Skill          | Use it when                                                         |
| -------------- | ------------------------------------------------------------------- |
| `design-taste-frontend` | Building any UI. Technique only (RSC client leaves, no scroll listeners, transform/opacity motion, z-index scale, contrast checks). Its bans on custom cursors, section numbers, time strips and dots are overridden by this file. |
| `full-output-enforcement` | Writing code: complete files, no elided sections. (`[TODO: …]` copy placeholders in `content/` are still required.) |
| `design-taste-frontend-v1` | Not used: superseded by `design-taste-frontend`. |
| `gpt-taste` | Not used: GSAP-driven; animation libraries need Kenny's OK. |
| `high-end-visual-design` | Not used: competing aesthetic (glass, double-bezel). |
| `minimalist-ui` | Not used: competing aesthetic (pastels, bento). |
| `industrial-brutalist-ui` | Not used: competing aesthetic (CRT, red accent). |
| `redesign-existing-projects` | Not used: this is a greenfield build. |
| `image-to-code` | Not used: the design already exists on the canvas. |
| `imagegen-frontend-web` | Not used: image generation only. |
| `imagegen-frontend-mobile` | Not used: image generation only. |
| `brandkit` | Not used: brand-board image generation. |
| `stitch-design-taste` | Not used: writes DESIGN.md for Google Stitch. |

## How to work

- Work in small, reviewable steps. Before a multi-file change, state the plan (files to add/change) in 3–6 bullets, then build.
- Follow the build order at the end of this file; one milestone per PR-sized change.
- Don’t polish copy. Kenny will rewrite all text later — keep copy in `content/` and leave `[TODO: …]` placeholders rather than inventing facts.
- **Never invent facts or metrics.** No percentages, user counts or results that aren’t in `content/`. GPA scale is unconfirmed (show “GPA 3.78” only).

### Definition of done (every task)

- [ ] `pnpm lint`, `pnpm exec tsc --noEmit` and `pnpm build` pass with no new warnings
- [ ] Works with keyboard only (visible focus, logical order, Escape closes overlays)
- [ ] Works with `prefers-reduced-motion: reduce` (final frames, no follow effects)
- [ ] Works at 390 px wide and at 200% zoom with no page-wide horizontal scroll
- [ ] No hydration warnings or console errors
- [ ] No raw hex colours or magic numbers in components — tokens only

---

## Architecture (keep it modular)

Use `src/` if the repo already does; otherwise the same tree at the root.

```
app/
  layout.tsx              fonts, ThemeProvider, <Chrome/>, <RingCursor/>
  page.tsx                composes homepage sections only — no logic
  work/[slug]/page.tsx    case studies (generateStaticParams from content)
  globals.css             tokens (CSS variables), base styles, utilities
components/
  ui/                     shadcn-generated. Extend with cva variants; don’t fork.
  signal/                 design-system primitives (see below)
  chrome/                 top bar (KP mark, clock, theme, Menu pills) and the Menu dialog
  field/                  Field (canvas), field math wrapper, static fallback
  sections/
    hero/  work-track/  archive/  about/  stack/  path/  open-source/  contact/
content/                  typed data — the ONLY place copy and facts live
  site.ts  projects.ts  archive.ts  timeline.ts  stack.ts  open-source.ts  types.ts
hooks/                    use-reduced-motion, use-fine-pointer, use-halifax-clock, use-in-view
lib/                      cn(), motion tokens, pure math (field.ts, timeline.ts)
```

Rules:

- **Server Components by default.** `"use client"` only on interactive leaves (Field, RingCursor, ThemeToggle, Menu, WorkTrack, ArchiveFilter, ThinkLoop, StackLayers, YearScrubber, CopyEmail, plus the live HalifaxTime and the ThemeProvider wrapper). A section’s `index.tsx` stays a Server Component and passes content down as props.
- One component per file, named export, kebab-case filenames, aim for < 150 lines. Split before it grows.
- Components never import from `content/` directly except section `index.tsx` files and route pages.
- Pure logic (dot grid, lens falloff, timeline positions, filters) lives in `lib/` as plain functions with no React — easy to test.
- Shared types in `content/types.ts`: `Project`, `ArchiveItem` (`area: 'cloud' | 'ai' | 'systems' | 'web'`, `team?: boolean`, `role?: string`), `TimelineItem` (`lane`, `start`, `end`, `kind: 'technical' | 'other'`), `StackLayer`.

### Signal primitives (`components/signal/`)

`OutlineText` · `SectionHeading` (giant outlined number + amber mono label + title) · `MonoLabel` · `Pill` (Button variant) · `RoundButton` (Button variant) · `ThemeToggle` · `CopyButton` · `RingCursor` · `SkipLink`. Every section heading uses `SectionHeading`; every outlined phrase uses `OutlineText`.

---

## Design tokens

Define in `globals.css` as CSS variables, mapped onto shadcn’s variable names, then exposed to Tailwind the way the repo already does (Tailwind v4 `@theme inline`, or `tailwind.config` on v3). **Night = `.dark` and is the default theme.**

| Token                               | Night (`.dark`, default) | Day (`:root`)         | Use                                         |
| ----------------------------------- | ------------------------ | --------------------- | ------------------------------------------- |
| `--background`                      | `#0F1011`                | `#ECEAE4`             | page                                        |
| `--card` / `--popover` / `--accent` | `#17181A`                | `#E2DFD8`             | panels, open-source band, hover surface     |
| `--foreground`                      | `#EDEBE6`                | `#0F1011`             | text, filled display                        |
| `--foreground-2` (custom)           | `#B5B2AB`                | `#45433E`             | secondary text                              |
| `--muted-foreground`                | `#8C8983`                | `#625F59`             | labels, captions (lightest text allowed)    |
| `--border` / `--input`              | `#2A2B2E`                | `#CFCBC2`             | hairlines                                   |
| `--primary` (amber)                 | `#FFB547`                | `#B36F00`             | lens, ring, active states, marks            |
| `--primary-foreground`              | `#0F1011`                | `#0F1011`             | text on amber                               |
| `--amber-text` (custom)             | `#FFB547`                | `#8A5300`             | small amber text (Day needs the darker one) |
| `--stroke` (custom)                 | `rgb(237 235 230 / .4)`  | `rgb(15 16 17 / .42)` | quiet outlines (decorative, inactive), pill borders |
| `--ring`                            | `#FFB547`                | `#0F1011`             | focus ring                                  |
| `--pill` (custom)                   | background @ 62%         | background @ 70%      | pill backdrop                               |
| `--overlay` (custom)                | background @ 97%         | background @ 97%      | menu backdrop                               |

- `--secondary` and `--muted` also point at the raised surface; `--card-foreground` etc. alias `--foreground`. `--destructive`/`--chart-*` keep shadcn's values (not part of the design). `--radius` is `0`: pills and round buttons use `rounded-full` explicitly.
- Tailwind's default palette is removed (`--color-*: initial`), so only token colours compile.
- Amber is for: lens/dots, ring cursor, section numbers & mono labels, active panel/chip/year, the one key number on a page. **Never** for backgrounds, body text, gradients or glows. Day `--primary` is 3.4:1, so small amber text uses `text-amber-text`.
- Outlined type that people read (hero line 3, menu links, section numbers) is stroked at full `--foreground` (`type-outline`); decorative giants and inactive states use the 40% `--stroke` (`type-outline-quiet`).
- Themes via `next-themes`: `attribute="class"`, `defaultTheme="system"`, `enableSystem` (Kenny's decision: the first visit follows the OS; Night is the server/no-JS fallback). The toggle persists the visitor's choice; no flash of the wrong theme.

### Type

- `next/font/google`: **Archivo** variable with `axes: ['wdth']` → `--font-sans`; **IBM Plex Mono** 400/500 → `--font-mono`.
- Scale (desktop → mobile, use `clamp()`): greeting “Hi.” 316→120 / 800 · section numbers 230→104 outlined, `font-stretch: 112%` · section titles 100→44 / 800 · project titles 72→38 / 800 · hero lines 66→32 / 700 · list titles 34→22 / 500 (800 on hover) · body 18→17 / 400 / lh 1.65 · mono 12–13.
- Tracking tightens with size (−6.5% at the top, 0 at body). Mono only for data/labels/stacks; uppercase only in 12 px mono labels; nothing under 12 px.
- `OutlineText` = `color: transparent; -webkit-text-stroke: 1–1.2px var(--stroke)` with a filled fallback under `@supports not (-webkit-text-stroke: 1px black)`. Outline only ≥ 30 px, never for body/links/buttons, always next to a filled phrase.

### Motion (`lib/motion.ts`)

- Durations: instant 120 · quick 200 · ring 240 · morph 360 · band 450 · slow 700 (ms).
- Easing: out `cubic-bezier(.2,.7,.1,1)` (arrivals, hover) · in-out `cubic-bezier(.65,0,.35,1)` (track, band, menu) · follow `x += (target − x) * 0.2` per frame (lens, ring).
- **No idle loops.** Lens and ring update only while the pointer moves; stop when it settles. Pause the field when off-screen (IntersectionObserver) or the tab is hidden.
- Reduced motion: no rise/slide/morph, no ring, field drawn once with the lens parked; colour changes still happen.
- Hero entrance (CSS only): “Hi.” 120 ms, line 2 700 ms, line 3 1300 ms (rise 16 px, 700 ms, out); status/hint fade at 1600 ms. Text is server-rendered — never hidden waiting for JS.

### Layout

12-col grid, fluid margins `clamp(20px, 4vw, 64px)`, gutter 24 (16 on mobile). Display type may break the grid (numbers hang off the left, the hero name bleeds off both edges); anything people read starts on a column line. Full-bleed only for the field, the open-source band and the work track. 1 px rules between rows; the only boxes are track panels. Breakpoints: mobile < 768 · tablet 768–1023 · desktop ≥ 1024 · large ≥ 1440.

---

## Signature components — behaviour specs

**Field** (`components/field/`) — Canvas 2D, client-only, below the SSR’d hero text.

- Grid of dots every 26 px; each has seeded jitter ±11 px (deterministic PRNG, e.g. mulberry32, so it never reshuffles).
- Lens radius 200 desktop / 120 mobile. `t = smoothstep(1 − dist / R)`; position = grid + jitter·(1−t), plus `y += sin(x / 38) · 9 · t` (the clean wave). Buckets: t > .55 amber 4 px · t > .08 foreground @60% 2.6 px · else foreground @24% 1.8 px (Night; Day uses 50% / 22% from the canvas, Kenny's decision, via `--field-near-alpha` / `--field-far-alpha`).
- Lens eases toward the pointer (follow k = 0.2); rest position ≈ (68% width, 44% height). Touch: follows a dragging finger, stays where lifted.
- Precompute grid + jitter on resize (ResizeObserver, devicePixelRatio aware); redraw only while the lens is moving; read colours from CSS variables and redraw on theme change.
- Variant `calm` (contact section): every dot in place, no lens, drawn once.
- `aria-hidden`; no information lives in the dots. Reduced motion → draw once.

**RingCursor** — fine pointers only (`(hover: hover) and (pointer: fine)`), never on touch or reduced motion. Never hides the system cursor. 36 px amber ring trailing the pointer (k = 0.24); over any element with `data-cursor="label"` it grows to 76 px, fills amber and shows the label. Move it with `transform` on a ref inside rAF — **never React state per frame.**

**Chrome & Menu** — KP mark + three pills (Halifax clock, theme, Menu). Menu = shadcn `Dialog` styled full-screen: six numbered links at up to 112 px, outlined until hover/focus, then amber; contact + local time in the corner. Focus trapped, Escape closes, focus returns to Menu; choosing a link closes the menu and moves focus to that section. Below 768 px the bar is KP + Menu only: the clock hides and the theme toggle moves into the menu as a row at thumb height (Kenny's decision). Below 1024 px the "Kenny Patel" text beside KP is visually hidden.

**Hero** — one `h1`: “Hi.” / “I’m Kenny Patel.” / “And this is my website.” (third line outlined). Status block (based, local time, builds, status). Outlined “KENNY PATEL” behind (aria-hidden); each letter is a span, hover weight 300→900, neighbours 640 (CSS `:hover` + `:has()`), 360 ms. From the canvas (approved): a hint line (pointer / touch copy, hidden with reduced motion) and a “Scroll → 01 Work” link at the bottom.

**WorkTrack** — featured projects from `content/projects.ts`, one in focus. Currently three (Speech Denoising, Microservices on GKE, Starknet): Kenny left out RoomM8, post-quantum for Node and team projects (repos on a collaborator's account). Built as a custom track (CSS transform on tablet+, native scroll-snap on phones) rather than Embla. Prev/next round buttons, numbered tabs, arrow keys; 700 ms in-out; inactive panels at 38% opacity. Mobile: native swipe with snap, panels at 84vw. Each panel: number, title, one line, a diagram drawn from the project (no stock images), stack in mono, one CTA.

**Archive** — filterable list (`ToggleGroup`): All · Cloud & DevOps · AI & Data · Systems & Security · Web & Mobile; “Showing n of N” updates. Kenny's decisions: team projects (collaborator repos) are left out, featured projects aren't repeated, Word Map is dropped (unsourced); the active chip fills amber. Only filters with at least one project are shown. Rows without a URL aren't links (no arrow, no hover effect). Row hover: title 500→800 + 10 px shift, arrow turns amber. Team projects show “Team project · my part: …”.

**About / ThinkLoop** — statement half filled, half outlined. Build → Break → Understand → Rebuild as toggle buttons; the chosen step fills amber; its line is announced (`aria-live="polite"`). Portrait tilted −2°, overlapping the column edge.

**StackLayers** — six layers (Interface, Services, Data, Infrastructure, Languages, Signal & ML) as giant outlined words; `Collapsible`/`Accordion` disclosure shows tools + “Seen in” projects.

**YearScrubber (Path)** — lanes: Education, Engineering, Open source, Other. Year buttons 2019–now; the chosen year gets an amber band across lanes (450 ms) and an announced “In {year}” list. Technical items 6 px bars; “other” work 2 px grey. On mobile the timeline scrolls inside its own `ScrollArea`. Education (MACS headline, thesis link) closes the section.

**Open source** — raised band with a 2 px amber top rule; diff-style log with amber “+” markers.

**Contact** — calm field behind “Have something interesting to build?” (“build?” outlined), email + CopyButton (“Copied ✓”, announced), GitHub, LinkedIn, live “It’s HH:MM in Halifax right now.”

**Halifax clock** — `Intl.DateTimeFormat('en-CA', { timeZone: 'America/Halifax', … })`. Render it only after mount (or with `suppressHydrationWarning`) so server and client don’t mismatch; update every 30 s.

**Case study** (`/work/[slug]`) — title with outlined second word, meta grid, the key number in amber, A/B audio (labelled, transcript, never autoplays), charts with a “View as table” toggle.

---

## Accessibility (non-negotiable)

- Contrast per the token table; amber small text in Day uses `--amber-text`.
- Skip link first; landmarks `header/nav/main/footer`; one `h1`; decorative giants (`KENNY PATEL`, section numbers) are `aria-hidden` with real headings carrying the words.
- Real `<button>`/`<a>` only; pressed/expanded state on toggles; focus ring 2 px, offset 3 px.
- Targets ≥ 44 px; nothing depends on hover.

## Don’t

- Hide the system cursor, hijack scroll, or run animation with nobody interacting.
- Put copy, links or facts inside components — use `content/`.
- Use outline text for anything people must read in full.
- Add a second accent colour, gradients, glows, skill bars or logo walls.
- Add libraries (Framer Motion, GSAP, three.js, MDX…) without asking.

## Build order

1. Tokens, fonts, ThemeProvider, `globals.css`, `cn()`, motion tokens
2. Signal primitives + Chrome (pills, SkipLink) + Menu
3. Hero text + Field + RingCursor
4. WorkTrack
5. Archive
6. About + ThinkLoop
7. StackLayers
8. Path (YearScrubber + education)
9. Open source band
10. Contact (calm field) + footer
11. `/work/[slug]` case study
12. Pass: accessibility, reduced motion, mobile, performance (LCP is the “Hi.” text; field must not block it)
