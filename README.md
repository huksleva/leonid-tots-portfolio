# leonid-tots-portfolio

Personal portfolio of Leonid Tots — Software Developer.

**Live:** https://leonidtots.dev

---

## Stack

- **Next.js 15** (App Router, TypeScript strict)
- **React 19**
- **Tailwind CSS v4** (CSS-first config)
- **Geist** font (Vercel)

No UI libraries. No animation libraries. Everything is built from scratch.

---

## Features

**UX / Interaction**
- Custom CSS cursor — Apple-style arrow SVG, separate versions for light and dark theme, no JS lag
- Card glow effect — radial gradient follows the cursor in dark mode (CSS custom properties via `onMouseMove`)
- Shimmer sweep on card hover (CSS `::after` diagonal animation)
- Scroll-triggered section animations via `IntersectionObserver`
- Smooth snap-scroll terminal in `/lab` (`scroll-snap-type: y mandatory` + `scroll-smooth`)
- Interactive 404 page — terminal with command history, glitch animation on "404", scanline overlay

**Internationalisation**
- EN / RU language switcher (React Context, no routing, no extra bundle)
- Language-aware CV button — opens the matching PDF in a new tab

**Projects section**
- Modal with GIF preview, skeleton pulse loader while the GIF loads
- Per-project links: GitHub, live site, press coverage
- Keyboard accessible (Escape to close, Enter/Space to open)

**Theme**
- Light / dark with `localStorage` persistence and zero flash on load
- `<Script strategy="beforeInteractive">` applies the saved class before first paint
- `suppressHydrationWarning` on `<html>` prevents React mismatch

**SEO / Meta**
- Russian-first title and description (`lang="ru"`)
- Auto-generated OG image 1200×630 and favicon via `ImageResponse`
- JSON-LD structured data (Person schema)
- Canonical URL, robots meta, Open Graph, Twitter card
- `@vercel/speed-insights` for real-user performance monitoring
- Lighthouse score: **100 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO)

**Accessibility**
- Skip-to-content link
- `aria-label` on all icon buttons
- `aria-modal` / `role="dialog"` on project modal
- Color contrast ≥ 4.5:1 in both themes

---

## Project structure

```
src/
├── app/
│   ├── (portfolio)/            # Pages with Navbar (route group)
│   │   ├── layout.tsx          # Navbar + main-content wrapper
│   │   └── page.tsx            # Hero, About, Skills, Projects, Contact, Footer
│   ├── lab/
│   │   └── page.tsx            # /lab — terminal experience (noindex)
│   ├── not-found.tsx           # Interactive 404 terminal page
│   ├── opengraph-image.tsx     # Auto-generated OG image via ImageResponse
│   ├── icon.tsx                # Auto-generated favicon via ImageResponse
│   ├── layout.tsx              # Root layout: fonts, theme script, SEO, providers
│   └── globals.css             # Tailwind, keyframes, cursor, glow, shimmer
├── components/
│   ├── Navbar.tsx              # Fixed nav with IntersectionObserver active section
│   ├── AnimateOnScroll.tsx     # Reusable fadeUp wrapper
│   ├── sections/
│   │   ├── Hero.tsx            # Name, role, CTA buttons, language-aware CV
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx        # Cards + modal with GIF skeleton loader
│   │   └── Contact.tsx
│   └── lab/
│       └── Terminal.tsx        # 6-screen snap-scroll terminal with typing animation
├── contexts/
│   ├── LanguageContext.tsx     # lang, toggle, tr()
│   └── ThemeContext.tsx
└── lib/
    └── translations.ts         # All UI strings for EN and RU
```

---

## Public assets

```
public/
├── projects/
│   ├── tramplin.gif            # AI career platform preview (~4 MB)
│   ├── epidemic.gif            # Disease spread simulation preview (~4.8 MB)
│   └── solar_system.gif        # Solar system visualization preview (~2.6 MB)
├── leonid-tots-software-developer-en.pdf
└── leonid-tots-software-developer.pdf
```

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Technical notes

**Theme without flash** — `<Script strategy="beforeInteractive">` runs a one-liner synchronously in `<head>` before React hydrates. It reads `localStorage` and adds `class="dark"` to `<html>` if needed. `suppressHydrationWarning` prevents React mismatch on the `<html>` node.

**Route groups** — the `(portfolio)` group adds `Navbar` only to main-page routes. `/lab` sits outside the group and renders without any chrome.

**Custom cursor** — a data-URI SVG set via CSS `cursor: url(...)`. No JavaScript involved, no lag. `cursor: inherit` on all interactive elements keeps the arrow consistent instead of showing the browser's pointer hand.

**Card glow** — `onMouseMove` writes `--mouse-x` / `--mouse-y` CSS custom properties on the card element. A `::before` pseudo-element uses `radial-gradient` centered at those coordinates. Active only in dark mode via `:where(.dark) .card-glow::before`.

**Terminal /lab** — `IntersectionObserver` with `threshold: 0.6` triggers a `setInterval` typewriter per screen. Output lines appear with staggered `animation-delay`. The scroll container uses `scroll-snap-type: y mandatory` so each section snaps into view. Six screens total: `whoami`, `cat stack.json`, `git log`, `cat contact`, `cat readme.md`, `uptime`.

**GIF skeleton loader** — `useState<boolean>` tracks whether the `<Image>` has fired `onLoad`. Before load: an `animate-pulse` div overlays the container. After load: the image transitions from `opacity-0` to `opacity-100` over 300 ms.

**OG image and favicon** — generated at build time via Next.js `ImageResponse` in `opengraph-image.tsx` and `icon.tsx`. No static image files needed.

**404 page** — `not-found.tsx` is a client component that renders a fake interactive terminal. Supports a set of commands (`help`, `ls`, `pwd`, `whoami`, `git blame`, `man lost`, etc.) with `↑ / ↓` command history. `cd /` and `exit` redirect to the homepage after 700 ms. A CSS glitch animation fires on the "404" heading every ~5 seconds.
