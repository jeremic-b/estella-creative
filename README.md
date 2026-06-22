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

## Brand system (from Figma)

| Token | Value |
|-------|-------|
| Type | **Rethink Sans** (Google Font, weights 400–800) |
| Black / White | `#000000` / `#FFFFFF` |
| Grey / Light Grey | `#939393` / `#F1F1F1` |
| **Red** (sole accent) | `#7B1D1D` |
| Gray accent (dark/red surfaces) | `#CFCFCF` |
| Logo | **official vector artwork** — mark + ESTELLA wordmark (inline `<symbol>`) |
| Voice | confident — *"Leading the way."* |

The logo is the brand's own vector art (in [`assets/brand/`](assets/brand/) as
PDFs, embedded as SVG in `index.html`) — not a recreation. Type is **Rethink Sans**
(the client's final call). The Figma mint/green `#A6FFDA` is an official brand color
but is intentionally **not used** on the site — red is the only accent, with a
neutral gray (`#CFCFCF`) for highlights on dark/red surfaces.
Other Figma reference exports live in [`figma/`](figma/).

## Layout

White editorial base, black type, red as the accent. Social leads, the work follows.

1. **Hero — reels-led** — *"Leading the way."* with the two site reels (9:16) autoplaying
2. **Studio** — short statement (simplified, no filler)
3. **Work** — *"The work speaks first."* — large captioned photography: Photography, Campaigns, Editorial, Shot on Film
4. **Services** — concise list (Photography, Videography, Social, Post, Web)
5. **Contact** — red band, gray accent, `info@estella.rs`
6. **Footer**

## Notes vs. the original site

- **Animated marquee removed** (per brief); motion is now calm and gallery-like.
- **Copy simplified** — agency-speak trimmed to short, confident lines.
- **Header** shrinks to a thin frosted-glass bar on scroll; the full lockup
  cross-fades to just the mark.
- **Reels** autoplay muted, pause off-screen (IntersectionObserver), and have no
  poster (fixes a still-photo flash on load).
- **Photography treated bigger** — full-bleed features, generous space, captions.
- **Phone-first** — mobile layout is primary; fullscreen menu with visible close.
- All work imagery uses the **already-downloaded photos** under `assets/img/`.

## Assets

`assets/img/` — photography library · `assets/video/` — the two reels.
Swap files 1:1 to update content; markup is in `index.html`.
