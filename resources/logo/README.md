# Logo: the Signal mark

A few scattered points grow toward one clean sine wave. It's the hero field in miniature: noise clears into signal, as in the speech-denoising thesis. Plain points take the text colour; the wave and the two points nearest it take the accent.

## Where it lives

| File | What it is |
| --- | --- |
| `lib/logo.ts` | The mark's geometry. The single source for the component and the files below. |
| `components/signal/logo-mark.tsx` | `LogoMark`, the inline SVG. Colours come from tokens (`fill-current`, `fill-primary`, `stroke-primary`), so it follows the theme. |
| `components/chrome/home-mark.tsx` | The top-bar home link: the mark, plus the name on desktop. Hover or focus lines the points up. |
| `app/favicon.ico` | 16, 32 and 48 px. The 16 px frame is simplified: one point and a heavier wave. |
| `app/icon.svg` | Tab icon for modern browsers: the Night tile. |
| `app/apple-icon.png` | iOS home-screen icon, 180 px, full bleed (iOS rounds the corners). |
| `app/opengraph-image.png` | Link-preview image, 1200 × 630, with alt text in `opengraph-image.alt.txt`. |
| `app/manifest.webmanifest` | Android home-screen icons from `public/icon-192.png`, `icon-512.png` and `icon-maskable-512.png`. |
| `resources/logo/svg/` | Sources and extras: the mark for Night, Day and one colour; lockups with the name and the domain; icon tiles; an avatar; the KP ring and dot-K alternates. |

Next.js adds the `app/` files to every page's `<head>` by file convention. `metadataBase` (from `site.url` in `content/site.ts`) makes the share-image URL absolute.

## Colour

The component uses tokens. The static files can't read CSS variables, so they carry the Night palette from `app/globals.css`: ground `#0a0c12`, points `#ebedf2`, accent `#7b94ff`. Day versions use `#eef1f8`, `#0f1118` and `#1326d2`.

**If the palette changes, regenerate the static files.** Edit the colours at the top of `source/build.py`, then from the repo root:

```bash
python3 resources/logo/source/build.py   # SVG sources and app/icon.svg
python3 resources/logo/source/render.py  # PNGs and favicon.ico
```

`build.py` needs Python 3 with `fontTools`, plus Inter Display (`.otf`) for the outlined text in the lockups and share image; set `INTER_DIR` to its folder. `render.py` needs Playwright with Chromium, and ImageMagick for the `.ico`. The manifest's `theme_color` and `background_color` are set by hand.

## Rules

- **Clear space:** at least half the mark's height on every side.
- **Smallest size:** 20 px tall for the mark. Below that, use the icon tile.
- **Colour:** the wave is the accent, the text colour, or one solid colour. Nothing else.
- **Don't** add glows or gradients, rotate or stretch the mark, set it on the accent, or move the points. Their sizes grow toward the wave on purpose.
