---
name: Emmanuel Okaka Portfolio
colors:
  background: "#0d0d0d"
  on-background: "#e0e0e0"
  primary: "#a855f7"
  cinematic-bg: "#000000"
  cinematic-on-bg: "#ffffff"
  bento-surface: "rgba(255, 255, 255, 0.03)"
  bento-surface-hover: "rgba(255, 255, 255, 0.05)"
  bento-border: "rgba(255, 255, 255, 0.1)"
  bento-surface-accent: "rgba(168, 85, 247, 0.05)"
  brutalist-bg: "#f4f4f0"
  brutalist-yellow: "#ffff00"
  brutalist-magenta: "#ff00ff"
  brutalist-cyan: "#00ffff"
  brutalist-silver: "#c0c0c0"
  brutalist-navy: "#000080"
  brutalist-border: "#000000"
  brutalist-on-bg: "#000000"
typography:
  display-serif:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: 8vw
    fontWeight: "300"
  display-brutalist:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: 72px
    fontWeight: "900"
    letterSpacing: -0.05em
  headline-bento:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 60px
    fontWeight: "700"
    letterSpacing: -0.04em
  body-sans:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: 18px
    fontWeight: "400"
  label-mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: 11px
    fontWeight: "700"
    letterSpacing: 0.2em
rounded:
  none: 0px
  sm: 0.125rem
  md: 0.375rem
  lg: 0.5rem
  xl: 1rem
  2xl: 1.5rem
  bento: 24px
  full: 9999px
spacing:
  unit: 8px
  nav-gap: 8px
  bento-gap: 20px
  brutalist-gap: 16px
  brutalist-padding: 48px
components:
  nav-bar:
    backgroundColor: "rgba(0, 0, 0, 0.8)"
    rounded: "{rounded.full}"
    border: "1px solid rgba(255, 255, 255, 0.2)"
  nav-pill:
    backgroundColor: "transparent"
    textColor: "rgba(255, 255, 255, 0.6)"
    typography: "{typography.label-mono}"
    rounded: "{rounded.full}"
  nav-pill-active:
    backgroundColor: "#ffffff"
    textColor: "#000000"
  bento-tile:
    backgroundColor: "{colors.bento-surface}"
    rounded: "{rounded.bento}"
    border: "1px solid {colors.bento-border}"
  bento-tile-hover:
    backgroundColor: "{colors.bento-surface-hover}"
  brutalist-card:
    backgroundColor: "#ffffff"
    border: "4px solid {colors.brutalist-border}"
    shadow: "12px 12px 0px 0px rgba(0,0,0,1)"
  brutalist-sticker:
    border: "4px solid {colors.brutalist-border}"
    shadow: "4px 4px 0px 0px rgba(0,0,0,1)"
  win95-popup:
    backgroundColor: "{colors.brutalist-silver}"
    borderTop: "2px solid #ffffff"
    borderLeft: "2px solid #ffffff"
    borderBottom: "2px solid #808080"
    borderRight: "2px solid #808080"
    shadow: "4px 4px 0px 0px rgba(0,0,0,1)"
---

## Brand & Style
This portfolio embraces a **Poly-Thematic Design System** where different sections of the application represent contrasting design philosophies. It transitions the user through three distinct visual journeys:
1. **Cinematic (Intro):** A minimalist, high-contrast, monochromatic theme focusing on elegance, smooth scrolling, and stark serif typography.
2. **Bento (Projects):** A dark mode, modern UI characterized by subtle glassmorphism, radial gradient hover effects, glowing purple accents, and heavily rounded corners.
3. **Brutalist (About):** A raw, unpolished, high-energy layout drawing inspiration from 90s web design and Windows 95 aesthetics, featuring hard solid drop shadows, stark primary colors (Magenta, Cyan, Yellow), marquee animations, and draggable "stickers".

The overarching brand personality is adaptable, creative, and highly technical, effortlessly shifting between formal elegance and playful chaos.

## Colors
The color palette changes dramatically based on the active "concept" page:
- **Global / Nav:** `#0D0D0D` background, highly blurred black for navigation, `#E0E0E0` text.
- **Cinematic:** Deep black to stark white scroll-driven transitions.
- **Bento:** Subtle transparencies `rgba(255,255,255,0.03)` with a striking glowing purple `#A855F7` as the primary accent color.
- **Brutalist:** A textured off-white paper background `#F4F4F0` paired with stark `#000000` text and borders. Accentuated with highly saturated "sticker" colors: `#FF00FF` (Magenta), `#00FFFF` (Cyan), `#FFFF00` (Yellow).

## Typography
The system employs a strict tripartite typographic scale to match the visual themes:
- **Serif (Cinematic):** Playfair Display is used at massive scales to create a "Hook" and convey elegance and gravity.
- **Sans-Serif (Bento & Global):** Inter is used for body copy and general layout, maintaining maximum readability and a clean modern tech feel.
- **Monospace (Brutalist & Labels):** Used for micro-copy, technical details, marquee headers, and Windows 95 UI elements. In the Brutalist section, fonts are rendered in extremely heavy "Black" weights.

## Layout & Spacing
- **Navigation:** A floating, highly-rounded pill navigation sits at the bottom center of the screen, acting as the anchor between the three worlds.
- **Cinematic:** Utilizes horizontal scrolling and massive viewport-height sections to control the pacing of the content.
- **Bento:** Employs a CSS Grid based "Bento box" layout with `20px` to `24px` gaps, combining varying spans to create visual interest.
- **Brutalist:** Embraces controlled chaos. Elements overlap, utilize absolute positioning, and break traditional grid constraints to create an unpolished poster-like aesthetic.

## Elevation & Depth
Depth is treated completely differently in each concept:
- **Bento:** Depth is created through light. Radial gradient "spotlights" follow the user's cursor on hover, and subtle 1px translucent borders define the tiles.
- **Brutalist:** Depth is created through harsh, solid black drop shadows (e.g., `12px 12px 0px 0px rgba(0,0,0,1)`). There are no soft blurs.
- **Win95 Components:** The classic inset/outset 2px border trick (using white and gray borders) simulates old-school 3D UI elements.

## Shapes & Borders
- **Bento:** Extremely soft. The tiles use a `24px` border radius, creating a bubbly, modern feel.
- **Brutalist:** Extremely sharp. Elements have a `0px` border radius and thick `4px` black borders.
- **Interactive States:** Across the board, hover states are significant. The Bento section uses mouse-tracking radial gradients, while the Brutalist section uses harsh rotation snaps, background color changes, and 90s-style active button presses (inverting the faux-3D borders).
