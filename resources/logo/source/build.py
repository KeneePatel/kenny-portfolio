"""Writes the logo's SVG sources: resources/logo/svg/ plus the site's app/icon.svg.

Run render.py afterwards for the PNGs and favicon.ico. Needs Python 3 with
fontTools, and Inter Display (.otf) for the outlined lockup and share-image
text; set INTER_DIR if the fonts aren't in the default folder.
"""
import math, os, random
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.abspath(os.path.join(HERE, '..'))              # resources/logo
REPO = os.path.abspath(os.path.join(HERE, '..', '..', '..'))  # the site

def target(rel):
    """app/ and public/ files go to the site; everything else stays in resources/logo."""
    return os.path.join(REPO if rel.split('/')[0] in ('app', 'public') else LOGO, rel)

# Klein palette (app/globals.css): Night is .dark, Day is :root.
NIGHT = '#0A0C12'; FG = '#EBEDF2'; FG2 = '#B9BCC4'; ACCENT = '#7B94FF'
DAY = '#EEF1F8'; INK = '#0F1118'; ACCENT_D = '#1326D2'
K = 0.512286623256592   # cubic-Bezier quarter-sine constants
K2 = 1.002313685767898

def f(v):
    s = f'{v:.2f}'.rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s

# ---------- geometry ----------
def wave(x0, x1, yc, amp):
    """One full sine period, up first, as 4 cubic Béziers."""
    L = (x1 - x0) / 4; s = L / (math.pi / 2); a, b = K * s, K2 * s; ka = K * amp
    pts = [
        (x0 + a, yc - ka, x0 + b, yc - amp, x0 + L, yc - amp),
        (x0 + 2*L - b, yc - amp, x0 + 2*L - a, yc - ka, x0 + 2*L, yc),
        (x0 + 2*L + a, yc + ka, x0 + 2*L + b, yc + amp, x0 + 3*L, yc + amp),
        (x0 + 4*L - b, yc + amp, x0 + 4*L - a, yc + ka, x0 + 4*L, yc),
    ]
    return f'M{f(x0)} {f(yc)}' + ''.join('C' + ' '.join(f(v) for v in p) for p in pts)

def signal(fg, acc, small=False, op=True, tiny=False):
    """The mark: scattered points that resolve into one clean wave. 100-unit space."""
    if tiny:   # 16 px: one point, heavier wave
        dots = [(25, 61, 6.2, acc, 1)]
        sw, x0, x1, amp = 13, 40, 88, 17
    elif small:
        dots = [(15, 36, 4.2, fg, .6), (27, 60, 5.0, acc, 1)]
        sw, x0, x1, amp = 11, 40, 88, 17
    else:
        dots = [(9, 30, 2.6, fg, .45), (17, 66, 3.1, fg, .55), (25, 40, 3.7, acc, .65), (32, 57, 4.3, acc, 1)]
        sw, x0, x1, amp = 9, 41, 89, 17
    p = []
    for x, y, r, c, o in dots:
        a = f' fill-opacity="{o:g}"' if (o != 1 and op) else ''
        p.append(f'<circle cx="{x}" cy="{y}" r="{r:g}" fill="{c}"{a}/>')
    p.append(f'<path d="{wave(x0, x1, 50, amp)}" fill="none" stroke="{acc}" stroke-width="{sw}" stroke-linecap="round"/>')
    return ''.join(p)

def kpring(c):
    s = f'fill="none" stroke="{c}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"'
    return (f'<circle cx="50" cy="50" r="44" fill="none" stroke="{c}" stroke-width="3"/>'
            f'<path d="M30 33V67M30 52L46 33M35.5 46L47 67" {s}/>'
            f'<path d="M57 67V33H64.5A9.5 9.5 0 0 1 64.5 52H57" {s}/>')

def dotk(fg, acc):
    rows = ["X..X", "X.X.", "XX..", "X.X.", "X..X"]
    xs = [23, 41, 59, 77]; ys = [14, 32, 50, 68, 86]
    jit = [(3, -4), (-4, 2), (2, 4), (-3, -3), (4, 1), (-2, 4), (3, -2), (-4, -1), (1, 3), (-3, 4), (4, -3), (-1, -4)]
    p, k = [], 0
    for ri, row in enumerate(rows):
        for ci, ch in enumerate(row):
            x, y = xs[ci], ys[ri]
            if ch == 'X':
                p.append(f'<circle cx="{x}" cy="{y}" r="6.6" fill="{acc}"/>')
            else:
                jx, jy = jit[k % len(jit)]; k += 1
                p.append(f'<circle cx="{x+jx}" cy="{y+jy}" r="3" fill="{fg}" fill-opacity=".5"/>')
    return ''.join(p)

# ---------- type (Inter Display, outlined, GPOS-kerned) ----------
FONTDIR = os.environ.get('INTER_DIR', '/usr/share/fonts/opentype/inter')
_fonts = {}
def font(name):
    if name not in _fonts:
        _fonts[name] = TTFont(os.path.join(FONTDIR, name + '.otf'))
    return _fonts[name]

def _kern(ft, l, r):
    gpos = ft['GPOS'].table
    idx = sorted({i for fr in gpos.FeatureList.FeatureRecord if fr.FeatureTag == 'kern' for i in fr.Feature.LookupListIndex})
    total = 0
    for li in idx:
        lk = gpos.LookupList.Lookup[li]
        for st in lk.SubTable:
            if lk.LookupType == 9: st = st.ExtSubTable
            if getattr(st, 'LookupType', 2) != 2 or l not in st.Coverage.glyphs: continue
            if st.Format == 1:
                ps = st.PairSet[st.Coverage.glyphs.index(l)]
                hit = next((pv for pv in ps.PairValueRecord if pv.SecondGlyph == r), None)
                if hit is None: continue
                total += getattr(hit.Value1, 'XAdvance', 0) or 0; break
            else:
                c1 = st.ClassDef1.classDefs.get(l, 0); c2 = st.ClassDef2.classDefs.get(r, 0)
                v = st.Class1Record[c1].Class2Record[c2].Value1
                total += getattr(v, 'XAdvance', 0) or 0; break
    return total

def text_path(s, fontname, size, x, y, track=0.0):
    """Outlined text; (x, y) is the baseline start. Returns (path_d, advance_width)."""
    ft = font(fontname); upm = ft['head'].unitsPerEm; sc = size / upm
    cmap = ft.getBestCmap(); gs = ft.getGlyphSet(); hmtx = ft['hmtx']
    names = [cmap[ord(c)] for c in s]
    pen = SVGPathPen(gs, ntos=lambda v: f(v)); cx = 0.0
    for i, g in enumerate(names):
        gs[g].draw(TransformPen(pen, (sc, 0, 0, -sc, x + cx, y)))
        cx += hmtx[g][0] * sc
        if i < len(names) - 1:
            cx += _kern(ft, g, names[i + 1]) * sc + track * size
    return pen.getCommands(), cx

def metrics(fontname, size):
    os2 = font(fontname)['OS/2']; upm = font(fontname)['head'].unitsPerEm
    return os2.sCapHeight * size / upm, os2.sxHeight * size / upm

# ---------- svg helpers ----------
def svg(body, vb, w=None, h=None, title='Kenny Patel', extra=''):
    dims = f' width="{w}" height="{h}"' if w else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"{dims} role="img" aria-label="{title}"{extra}>'
            f'<title>{title}</title>{body}</svg>\n')

def tile(fg, acc, bg, rx=22, scale=0.8, tiny=False):
    cx = 56.2 if tiny else 52.15
    return (f'<rect width="100" height="100" rx="{rx}" fill="{bg}"/>'
            f'<g transform="translate(50 50) scale({scale}) translate(-{cx} -50)">{signal(fg, acc, small=True, tiny=tiny)}</g>')

WORD_FONT = 'InterDisplay-ExtraBold'
def lockup(fg, acc, text_fill, words='Kenny Patel', domain=False):
    """Horizontal lockup in mark units: mark viewBox x 4..96, y 24..76. Text cap-height = 0.62 × wave height."""
    wave_h = 34 + 9                              # amplitude*2 + stroke
    cap_target = wave_h * 0.62
    cap, _ = metrics(WORD_FONT, 1)
    size = cap_target / cap
    base = 50 + cap_target / 2                   # cap-height centred on the wave axis
    x = 108
    if domain:
        d1, w1 = text_path('kennypatel', WORD_FONT, size, x, base, track=-0.02)
        d2, w2 = text_path('.dev', 'InterDisplay-Medium', size, x + w1 + size * 0.01, base, track=-0.01)
        body = f'<path d="{d1}" fill="{text_fill}"/><path d="{d2}" fill="{acc}"/>'
        width = w1 + size * 0.01 + w2
    else:
        d1, width = text_path(words, WORD_FONT, size, x, base, track=-0.02)
        body = f'<path d="{d1}" fill="{text_fill}"/>'
    right = x + width + 4
    return signal(fg, acc) + body, f'4 24 {f(right - 4)} 52'

def write(rel, content):
    p = target(rel); os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w') as fh: fh.write(content)
    return p

def field_dots(W, H, cell, jitter, r, color, opacity, seed=7, lens=None, fade=None):
    rnd = random.Random(seed); out = []
    for gy in range(int(H / cell) + 2):
        for gx in range(int(W / cell) + 2):
            x0, y0 = gx * cell + cell / 2, gy * cell + cell / 2
            jx, jy = rnd.uniform(-jitter, jitter), rnd.uniform(-jitter, jitter)
            t = 0
            if lens:
                lx, ly, R = lens; d = math.hypot(x0 - lx, y0 - ly)
                t = max(0.0, min(1.0, 1 - d / R)); t = t * t * (3 - 2 * t)
            x, y = x0 + jx * (1 - t), y0 + jy * (1 - t)
            o = opacity
            if fade:
                fx0, fx1 = fade; o *= max(0.0, min(1.0, (x - fx0) / (fx1 - fx0)))
            if o <= 0.01: continue
            out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{r}" fill="{color}" fill-opacity="{o:.2f}"/>')
    return ''.join(out)

def og_image():
    W, H = 1200, 630
    lens = (900, 315, 230)
    parts = [f'<rect width="{W}" height="{H}" fill="{NIGHT}"/>',
             field_dots(W, H, 30, 11, 1.8, FG, .36, lens=lens, fade=(380, 760))]
    # the mark, large, inside the lens
    parts.append(f'<circle cx="{lens[0]}" cy="{lens[1]}" r="{lens[2]}" fill="none" stroke="{FG}" stroke-opacity=".4" stroke-dasharray="3 7"/>')
    parts.append(f'<g transform="translate({lens[0]} {lens[1]}) scale(3.5) translate(-50 -49.5)">{signal(FG, ACCENT)}</g>')
    # text block
    cap, _ = metrics(WORD_FONT, 1)
    d, _ = text_path('Kenny Patel', WORD_FONT, 92, 80, 300, track=-0.03)
    parts.append(f'<path d="{d}" fill="{FG}"/>')
    d, _ = text_path('Software engineer in Halifax', 'InterDisplay-Medium', 34, 82, 362, track=-0.01)
    parts.append(f'<path d="{d}" fill="{FG2}"/>')
    d1, w1 = text_path('kennypatel', 'InterDisplay-SemiBold', 26, 82, 548, track=0)
    d2, _ = text_path('.dev', 'InterDisplay-SemiBold', 26, 82 + w1, 548, track=0)
    parts.append(f'<path d="{d1}" fill="{FG}"/><path d="{d2}" fill="{ACCENT}"/>')
    parts.append(f'<rect x="82" y="508" width="40" height="3" fill="{ACCENT}"/>')
    return svg(''.join(parts), f'0 0 {W} {H}', W, H, title='Kenny Patel — Software engineer in Halifax')

def build():
    MV = '4 24 92 52'
    files = {}
    files['svg/mark-night.svg'] = svg(signal(FG, ACCENT), MV)
    files['svg/mark-day.svg'] = svg(signal(INK, ACCENT_D), MV)
    files['svg/mark-mono.svg'] = svg(signal('currentColor', 'currentColor'), MV)
    files['svg/mark-black.svg'] = svg(signal('#0F1011', '#0F1011', op=False), MV)
    files['svg/mark-white.svg'] = svg(signal('#FFFFFF', '#FFFFFF', op=False), MV)
    files['svg/mark-mono-solid.svg'] = svg(signal('currentColor', 'currentColor', op=False), MV)
    files['svg/icon-night.svg'] = svg(tile(FG, ACCENT, NIGHT), '0 0 100 100')
    files['svg/icon-day.svg'] = svg(tile(INK, ACCENT_D, DAY), '0 0 100 100')
    files['app/icon.svg'] = files['svg/icon-night.svg']
    files['svg/icon-16.svg'] = svg(tile(FG, ACCENT, NIGHT, scale=0.9, tiny=True), '0 0 100 100')
    files['svg/apple-icon.svg'] = svg(tile(FG, ACCENT, NIGHT, rx=0, scale=0.74), '0 0 100 100')
    files['svg/maskable-icon.svg'] = svg(tile(FG, ACCENT, NIGHT, rx=0, scale=0.6), '0 0 100 100')
    files['svg/avatar.svg'] = svg(tile(FG, ACCENT, NIGHT, rx=0, scale=0.66), '0 0 100 100')
    for name, (fg, acc, tf) in {'night': (FG, ACCENT, FG), 'day': (INK, ACCENT_D, INK),
                                'mono': ('currentColor', 'currentColor', 'currentColor')}.items():
        body, vb = lockup(fg, acc, tf)
        files[f'svg/lockup-{name}.svg'] = svg(body, vb)
        body, vb = lockup(fg, acc, tf, domain=True)
        files[f'svg/lockup-domain-{name}.svg'] = svg(body, vb, title='kennypatel.dev')
    files['svg/alternates/kp-ring.svg'] = svg(kpring('currentColor'), '0 0 100 100', title='KP')
    files['svg/alternates/kp-ring-night.svg'] = svg(f'<rect width="100" height="100" rx="22" fill="{NIGHT}"/><g transform="translate(50 50) scale(.84) translate(-50 -50)">{kpring(ACCENT)}</g>', '0 0 100 100', title='KP')
    files['svg/alternates/dot-k-night.svg'] = svg(f'<rect width="100" height="100" rx="22" fill="{NIGHT}"/><g transform="translate(50 50) scale(.8) translate(-50 -50)">{dotk(FG, ACCENT)}</g>', '0 0 100 100', title='K')
    files['svg/og-image.svg'] = og_image()
    for rel, c in files.items(): write(rel, c)
    return files

if __name__ == '__main__':
    for rel in build(): print(rel)
