# leonid-tots-portfolio

Personal portfolio of Leonid Tots — Backend Developer.

**Live:** https://leonid-tots-portfolio.vercel.app

---

## Stack

- **Next.js 15** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS v4** (CSS-first config)
- **Geist** font (Vercel)

No UI libraries. No animation libraries. Everything is built from scratch.

---

## Features

- EN / RU language switcher (React Context, no routing)
- Light / dark theme with localStorage persistence and no flash on load
- Scroll-triggered section animations via `IntersectionObserver`
- `/lab` — interactive terminal page: each scroll step types a shell command and reveals output

---

## Project structure

```
src/
├── app/
│   ├── (portfolio)/        # Pages with Navbar (route group)
│   │   ├── layout.tsx
│   │   └── page.tsx        # Main page: Hero, About, Skills, Projects, Contact
│   ├── lab/
│   │   └── page.tsx        # /lab — terminal experience
│   ├── layout.tsx          # Root layout: fonts, theme script, providers
│   └── globals.css         # Tailwind import, keyframes, dark variant
├── components/
│   ├── Navbar.tsx
│   ├── sections/           # Hero, About, Skills, Projects, Contact
│   └── lab/
│       └── Terminal.tsx    # Snap-scroll terminal with typing animation
├── contexts/
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
└── lib/
    └── translations.ts     # All UI strings for EN and RU
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

**Theme without flash** — an inline `<script>` in `<head>` applies the saved theme synchronously before the first paint. `suppressHydrationWarning` on `<html>` prevents React hydration errors.

**Route groups** — the `(portfolio)` group adds the `Navbar` only to main-page routes. `/lab` sits outside the group and renders without any chrome.

**Terminal animation** — `IntersectionObserver` with `threshold: 0.6` triggers a `setInterval`-based typewriter per section. Output lines appear via `fadeIn` with staggered `animation-delay`. No external dependencies.
