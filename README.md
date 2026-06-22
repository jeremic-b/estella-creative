# Estella — Creative Studio

A brand-faithful redesign of [estella.rs](https://estella.rs), built to Estella's
**Figma brand guidelines**. Photography-led, social-aware, phone-first.

Dependency-free static site (vanilla HTML/CSS/JS) with three CDN libraries for
motion: **GSAP + ScrollTrigger** and **Lenis** smooth scroll.

## Run

```bash
python3 serve.py            # → http://localhost:8000
# or
python3 -m http.server 8000
```

A server is recommended so the reel videos stream correctly.

## Brand system

| Token | Value |
|-------|-------|
| Type | **Rethink Sans** (self-hosted variable woff2, weights 400–800) |
| Black / White | `#000000` / `#FFFFFF` |
| Grey / Light Grey | `#939393` / `#F1F1F1` |
| **Red** (sole color accent) | `#7B1D1D` |
| White (highlights on dark/red surfaces) | `#FFFFFF` |
| Logo | **official vector artwork** — mark + ESTELLA wordmark (inline `<symbol>`) |
| Voice | confident — *"Leading the way."* |

The logo is the brand's own vector art (in [`assets/brand/`](assets/brand/) as
PDFs, embedded as SVG in `index.html`) — not a recreation. Type is **Rethink Sans**,
self-hosted from [`assets/fonts/`](assets/fonts/) (no Google Fonts request at runtime).
The Figma mint/green `#A6FFDA` is an official brand color but is intentionally
**not used** on the site — red is the only color accent.

## Layout

Black base, full-bleed cinematic video hero, red as the sole accent.

1. **Hero — cinematic** — full-bleed autoplaying reel behind *"Leading the way."*
2. **Studio** — short statement (simplified, no filler)
3. **Work** — *"The work speaks first."* — large captioned photography: Photography, Campaigns, Editorial, Shot on Film
4. **Motion** — the second reel, in its own band with short copy
5. **Services** — concise list (Photography, Videography, Social, Post, Web)
6. **Contact** — red band, `info@estella.rs`
7. **Footer**

## Notes vs. the original site

- **Animated marquee removed** (per brief); motion is now calm and cinematic.
- **Copy simplified** — agency-speak trimmed to short, confident lines.
- **Header** shrinks to a thin frosted-glass bar on scroll; the full lockup
  cross-fades to just the (larger) mark. Light over the video, dark once scrolled.
- **Reels** autoplay muted, pause off-screen (IntersectionObserver), and have no
  poster (fixes a still-photo flash on load). Each has a **compressed mobile
  encode** (`assets/video/mobile/`) served via `<source media>` — phones never
  download the full desktop file.
- **Open Graph + Twitter cards** wired (`assets/img/og.jpg`, 1200×630) for clean
  link previews.
- **Photography treated bigger** — full-bleed features, generous space, captions.
- **Phone-first** — mobile layout is primary; fullscreen menu with visible close.
- All work imagery uses the **already-downloaded photos** under `assets/img/`.

## Assets

`assets/img/` — photography library + `og.jpg` (share image) · `assets/video/` —
the two reels, with phone-compressed copies in `assets/video/mobile/` ·
`assets/fonts/` — self-hosted Rethink Sans. Swap files 1:1 to update content;
markup is in `index.html`.
