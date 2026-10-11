"""Renders the site's icon PNGs, favicon.ico and share image from the SVG sources.

Run build.py first. Needs Python 3 with Playwright (Chromium) and ImageMagick
(`convert`) for the .ico.
"""
import os, subprocess, tempfile
from playwright.sync_api import sync_playwright

from build import LOGO, REPO

# (source SVG, output, width, height). Sources are relative to resources/logo
# except app/icon.svg; outputs are relative to the site root.
JOBS = [
    ('svg/apple-icon.svg', 'app/apple-icon.png', 180, 180),
    ('svg/og-image.svg', 'app/opengraph-image.png', 1200, 630),
    ('app/icon.svg', 'public/icon-192.png', 192, 192),
    ('app/icon.svg', 'public/icon-512.png', 512, 512),
    ('svg/maskable-icon.svg', 'public/icon-maskable-512.png', 512, 512),
]
# favicon.ico frames: 16 px uses the simplified tile (one point, heavier wave).
ICO = [('svg/icon-16.svg', 16), ('app/icon.svg', 32), ('app/icon.svg', 48)]


def source(rel):
    base = REPO if rel.startswith('app/') else LOGO
    with open(os.path.join(base, rel)) as fh:
        return fh.read()


def page_for(svg_text, w, h):
    # Size the SVG to the canvas; the first width/height attributes win in HTML.
    svg = svg_text.replace('<svg ', f'<svg width="{w}" height="{h}" ', 1)
    return ('<!doctype html><html><head><style>html,body{margin:0;background:transparent}'
            f'svg{{display:block}}</style></head><body>{svg}</body></html>')


def shoot(browser, svg_text, w, h, dst):
    page = browser.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1)
    page.set_content(page_for(svg_text, w, h))
    page.screenshot(path=dst, omit_background=True, clip={'x': 0, 'y': 0, 'width': w, 'height': h})
    page.close()


def run():
    with sync_playwright() as p, tempfile.TemporaryDirectory() as tmp:
        browser = p.chromium.launch()
        for src, out, w, h in JOBS:
            dst = os.path.join(REPO, out)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shoot(browser, source(src), w, h, dst)
            print(out)
        frames = []
        for src, size in ICO:
            dst = os.path.join(tmp, f'icon-{size}.png')
            shoot(browser, source(src), size, size, dst)
            frames.append(dst)
        browser.close()
        subprocess.run(['convert', *frames, os.path.join(REPO, 'app', 'favicon.ico')], check=True)
        print('app/favicon.ico')


if __name__ == '__main__':
    run()
