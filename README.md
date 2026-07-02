# leonid-tots-portfolio

Personal portfolio of Leonid Tots — Software Developer.

**Live:** https://leonidtots.dev

---

## Stack

- **Next.js 16** (App Router, TypeScript strict)
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
- Hidden cover letter page at `/cover-letter` — EN/RU, no links from the main site; share the URL directly with employers

**Internationalisation**
- EN / RU language switcher (React Context, no routing, no extra bundle)
- Language-aware CV button — links to the matching Reactive Resume page (always up to date, no PDF to re-upload)

**Projects section**
- Modal with image/GIF preview, skeleton pulse loader while media loads
- Per-project `imagePosition` field for custom `object-position` (e.g. align left for wide screenshots)
- Body scroll locked when modal is open — `position: fixed` technique for iOS Safari compatibility
- Per-project links: GitHub, live site, press coverage
- Keyboard accessible (Escape to close, Enter/Space to open)
- Mobile layout: title + badge stack above buttons on narrow screens

**Theme**
- Light / dark with `localStorage` persistence and zero flash on load
- `<Script strategy="beforeInteractive">` applies the saved class before first paint
- `suppressHydrationWarning` on `<html>` prevents React mismatch

**Contact**
- Contact form with server-side email delivery via Resend
- Honeypot field for spam protection
- Client-side and server-side validation (required fields, max lengths, email regex)

**SEO / Meta**
- Russian-first title and description (`lang="ru"`)
- Auto-generated OG image 1200×630 and favicon via `ImageResponse`
- JSON-LD structured data (Person schema)
- Canonical URL, robots meta, Open Graph, Twitter card
- `sitemap.ts` — only the main page is indexed; `/lab` is noindex, `/cover-letter` is hidden
- `@vercel/speed-insights` for real-user performance monitoring
- Lighthouse (mobile): **93 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO)

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
│   │   ├── page.tsx            # Hero, About, Skills, Projects, Contact, Footer
│   │   └── cover-letter/
│   │       └── page.tsx        # Hidden cover letter page (EN/RU)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # POST handler — validates input, sends email via Resend
│   ├── lab/
│   │   └── page.tsx            # /lab — terminal experience (noindex)
│   ├── not-found.tsx           # Interactive 404 terminal page
│   ├── opengraph-image.tsx     # Auto-generated OG image via ImageResponse
│   ├── icon.tsx                # Auto-generated favicon via ImageResponse
│   ├── sitemap.ts              # Sitemap — main page only
│   ├── layout.tsx              # Root layout: fonts, theme script, SEO, providers
│   └── globals.css             # Tailwind, keyframes, cursor, glow, shimmer
├── components/
│   ├── Navbar.tsx              # Fixed nav with IntersectionObserver active section
│   ├── AnimateOnScroll.tsx     # Reusable fadeUp wrapper
│   ├── sections/
│   │   ├── Hero.tsx            # Name, role, CTA buttons, language-aware CV
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx        # Cards + modal with media skeleton loader
│   │   └── Contact.tsx         # Contact cards + email form
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
└── projects/
    ├── tramplin.gif            # AI career platform preview
    ├── epidemic.gif            # Disease spread simulation preview
    ├── solar_system.gif        # Solar system visualization preview
    ├── fractals.png            # Fractal simulator preview
    ├── integrals.png           # Computational mathematics preview
    └── mp3.svg                 # MP3 metadata editor preview (vector)
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

**Custom cursor** — a data-URI SVG set via CSS `cursor: url(...)`. No JavaScript involved, no lag. `cursor: inherit` on all interactive elements (including `input`, `textarea`, `select`) keeps the arrow consistent instead of showing the browser's pointer hand.

**Card glow** — `onMouseMove` writes `--mouse-x` / `--mouse-y` CSS custom properties on the card element. A `::before` pseudo-element uses `radial-gradient` centered at those coordinates. Active only in dark mode via `:where(.dark) .card-glow::before`.

**Body scroll lock** — when the project modal opens, `document.body.style.position = "fixed"` + `top: -${scrollY}px` is applied. Plain `overflow: hidden` is not enough on iOS Safari — `position: fixed` is the only reliable method. The saved `scrollY` is restored on close to prevent the page jumping to the top.

**Modal image position** — each project in the `projects` array accepts an optional `imagePosition` string (e.g. `"left center"`). It is passed to `<Image style={{ objectPosition }}>` so wide screenshots can be cropped from the correct edge instead of always centering.

**Terminal /lab** — `IntersectionObserver` with `threshold: 0.6` triggers a `setInterval` typewriter per screen. Output lines appear with staggered `animation-delay`. The scroll container uses `scroll-snap-type: y mandatory` so each section snaps into view. Six screens total: `whoami`, `cat stack.json`, `git log`, `cat contact`, `cat readme.md`, `uptime`.

**GIF/image skeleton loader** — `useState<boolean>` tracks whether the `<Image>` has fired `onLoad`. Before load: an `animate-pulse` div overlays the container. After load: the image transitions from `opacity-0` to `opacity-100` over 300 ms.

**OG image and favicon** — generated at build time via Next.js `ImageResponse` in `opengraph-image.tsx` and `icon.tsx`. No static image files needed.

**404 page** — `not-found.tsx` is a client component that renders a fake interactive terminal. Supports a set of commands (`help`, `ls`, `pwd`, `whoami`, `git blame`, `man lost`, etc.) with `↑ / ↓` command history. `cd /` and `exit` redirect to the homepage after 700 ms. A CSS glitch animation fires on the "404" heading every ~5 seconds.

**Contact form** — `POST /api/contact` validates name, email, and message server-side, then sends via Resend. A hidden `name="website"` honeypot field is included; any submission that fills it is silently discarded. The Resend client is initialised inside the handler (not at module level) to avoid build-time errors when `RESEND_API_KEY` is absent.

**Performance** — `browserslist` in `package.json` targets Chrome/Edge 92+, Firefox 90+, Safari 15.4+. This tells Next.js/SWC not to emit polyfills for `Array.prototype.at`, `.flat`, `.flatMap`, `Object.fromEntries`, saving ~14 KiB of unnecessary JavaScript.
