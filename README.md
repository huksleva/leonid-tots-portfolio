# leonid-tots-portfolio

Личное портфолио Леонида Тоца — Software Developer.

**Live:** https://leonidtots.dev

---

## Стек

- **Next.js 16** (App Router, TypeScript strict)
- **React 19**
- **Tailwind CSS v4** (CSS-first конфигурация)
- Шрифт **Geist** (Vercel)

Без UI-библиотек. Без библиотек анимаций. Всё написано с нуля.

---

## Возможности

**UX / Интерактив**
- Кастомный CSS-курсор — SVG-стрелка в стиле Apple, отдельные версии для светлой и тёмной темы, без JS-лагов
- Эффект свечения карточек — радиальный градиент следует за курсором в тёмной теме (CSS custom properties через `onMouseMove`)
- Диагональный shimmer-блик при наведении на карточку (CSS-анимация через `::after`)
- Анимации секций при скролле через `IntersectionObserver`
- Плавный snap-скролл терминала на `/lab` (`scroll-snap-type: y mandatory` + `scroll-smooth`)
- Интерактивная страница 404 — терминал с историей команд, glitch-анимация на «404», оверлей со сканлайнами
- Скрытая страница сопроводительного письма на `/cover-letter` — EN/RU, без ссылок с основного сайта; URL передаётся работодателям напрямую

**Интернационализация**
- Переключатель языка EN / RU (React Context, без роутинга, без лишнего бандла)
- Кнопка CV с учётом языка — ведёт на соответствующую страницу Reactive Resume (всегда актуально, не нужно перезаливать PDF)

**Секция проектов**
- Модальное окно с превью изображения/GIF и skeleton-лоадером с пульсацией на время загрузки медиа
- Поле `imagePosition` у каждого проекта для кастомного `object-position` (например, выравнивание влево для широких скриншотов)
- Блокировка скролла body при открытой модалке — техника `position: fixed` для совместимости с iOS Safari
- Ссылки у каждого проекта: GitHub, живой сайт, упоминания в прессе
- Доступность с клавиатуры (Escape — закрыть, Enter/Space — открыть)
- Мобильная вёрстка: заголовок и бейдж располагаются над кнопками на узких экранах

**Тема**
- Светлая / тёмная с сохранением в `localStorage` и нулевым миганием при загрузке
- `<Script strategy="beforeInteractive">` применяет сохранённый класс до первой отрисовки
- `suppressHydrationWarning` на `<html>` предотвращает несовпадение при гидратации React

**Контакты**
- Контактная форма с серверной отправкой писем через Resend
- Honeypot-поле для защиты от спама
- Валидация на клиенте и на сервере (обязательные поля, ограничение длины, regex для email)

**SEO / Мета**
- Заголовок и описание в первую очередь на русском (`lang="ru"`)
- Автогенерация OG-изображения 1200×630 и фавиконки через `ImageResponse`
- Структурированные данные JSON-LD (схема Person)
- Canonical URL, robots meta, Open Graph, Twitter card
- `sitemap.ts` — индексируется только главная страница; `/lab` — noindex, `/cover-letter` скрыта
- `@vercel/speed-insights` для мониторинга производительности на реальных пользователях
- Lighthouse (mobile): **93 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO)

**Доступность**
- Ссылка «перейти к содержимому» (skip-to-content)
- `aria-label` на всех кнопках-иконках
- `aria-modal` / `role="dialog"` на модалке проектов
- Контраст цветов ≥ 4.5:1 в обеих темах

---

## Структура проекта

```
src/
├── app/
│   ├── (portfolio)/            # Страницы с Navbar (route group)
│   │   ├── layout.tsx          # Navbar + обёртка main-content
│   │   ├── page.tsx            # Hero, About, Skills, Projects, Contact, Footer
│   │   └── cover-letter/
│   │       └── page.tsx        # Скрытая страница сопроводительного письма (EN/RU)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # POST-хендлер — валидирует ввод, отправляет письмо через Resend
│   ├── lab/
│   │   └── page.tsx            # /lab — терминальный экспириенс (noindex)
│   ├── not-found.tsx           # Интерактивная терминальная страница 404
│   ├── opengraph-image.tsx     # Автогенерация OG-изображения через ImageResponse
│   ├── icon.tsx                # Автогенерация фавиконки через ImageResponse
│   ├── sitemap.ts              # Sitemap — только главная страница
│   ├── layout.tsx              # Корневой layout: шрифты, скрипт темы, SEO, провайдеры
│   └── globals.css             # Tailwind, keyframes, курсор, glow, shimmer
├── components/
│   ├── Navbar.tsx              # Фиксированная навигация с активной секцией через IntersectionObserver
│   ├── AnimateOnScroll.tsx     # Переиспользуемая обёртка fadeUp
│   ├── sections/
│   │   ├── Hero.tsx            # Имя, роль, CTA-кнопки, языко-зависимое CV
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx        # Карточки + модалка со skeleton-лоадером медиа
│   │   └── Contact.tsx         # Контактные карточки + форма email
│   └── lab/
│       └── Terminal.tsx        # Snap-скролл терминал из 6 экранов с анимацией печати
├── contexts/
│   ├── LanguageContext.tsx     # lang, toggle, tr()
│   └── ThemeContext.tsx
└── lib/
    └── translations.ts         # Все строки интерфейса для EN и RU
```

---

## Публичные ресурсы

```
public/
└── projects/
    ├── tramplin.gif            # Превью AI-платформы для карьеры
    ├── epidemic.gif            # Превью симуляции распространения болезни
    ├── solar_system.gif        # Превью визуализации Солнечной системы
    ├── fractals.png            # Превью симулятора фракталов
    ├── integrals.png           # Превью вычислительной математики
    └── mp3.svg                 # Превью редактора MP3-метаданных (вектор)
```

---

## Локальная разработка

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

---

## Технические заметки

**Тема без мигания** — `<Script strategy="beforeInteractive">` синхронно выполняет однострочник в `<head>` до гидратации React. Он читает `localStorage` и при необходимости добавляет `class="dark"` на `<html>`. `suppressHydrationWarning` предотвращает конфликт гидратации React на узле `<html>`.

**Route groups** — группа `(portfolio)` добавляет `Navbar` только к маршрутам главной страницы. `/lab` находится вне группы и рендерится без какого-либо обрамления.

**Кастомный курсор** — SVG в виде data-URI, задан через CSS `cursor: url(...)`. Никакого JavaScript, никаких лагов. `cursor: inherit` на всех интерактивных элементах (включая `input`, `textarea`, `select`) сохраняет стрелку вместо браузерной «руки».

**Свечение карточек** — `onMouseMove` записывает CSS custom properties `--mouse-x` / `--mouse-y` на элемент карточки. Псевдоэлемент `::before` использует `radial-gradient` с центром в этих координатах. Активно только в тёмной теме через `:where(.dark) .card-glow::before`.

**Блокировка скролла body** — при открытии модалки проекта применяется `document.body.style.position = "fixed"` + `top: -${scrollY}px`. Обычного `overflow: hidden` недостаточно на iOS Safari — `position: fixed` единственный надёжный метод. Сохранённый `scrollY` восстанавливается при закрытии, чтобы страница не прыгала наверх.

**Позиция изображения в модалке** — каждый проект в массиве `projects` принимает опциональную строку `imagePosition` (например, `"left center"`). Она передаётся в `<Image style={{ objectPosition }}>`, чтобы широкие скриншоты обрезались с нужного края, а не всегда по центру.

**Терминал /lab** — `IntersectionObserver` с `threshold: 0.6` запускает `setInterval`-«печатную машинку» для каждого экрана. Строки вывода появляются со ступенчатым `animation-delay`. Скролл-контейнер использует `scroll-snap-type: y mandatory`, поэтому каждая секция «прилипает» к экрану. Всего шесть экранов: `whoami`, `cat stack.json`, `git log`, `cat contact`, `cat readme.md`, `uptime`.

**Skeleton-лоадер GIF/изображений** — `useState<boolean>` отслеживает, сработал ли `onLoad` у `<Image>`. До загрузки контейнер перекрывает div с `animate-pulse`. После загрузки изображение переходит из `opacity-0` в `opacity-100` за 300 мс.

**OG-изображение и фавиконка** — генерируются на этапе сборки через `ImageResponse` Next.js в `opengraph-image.tsx` и `icon.tsx`. Статические файлы изображений не нужны.

**Страница 404** — `not-found.tsx` — клиентский компонент, отрисовывающий фейковый интерактивный терминал. Поддерживает набор команд (`help`, `ls`, `pwd`, `whoami`, `git blame`, `man lost` и др.) с историей команд по `↑ / ↓`. `cd /` и `exit` перенаправляют на главную через 700 мс. CSS glitch-анимация срабатывает на заголовке «404» примерно каждые 5 секунд.

**Контактная форма** — `POST /api/contact` валидирует имя, email и сообщение на сервере, затем отправляет через Resend. Включено скрытое honeypot-поле `name="website"`; любая отправка с заполненным полем молча отбрасывается. Клиент Resend инициализируется внутри хендлера (а не на уровне модуля), чтобы избежать ошибок сборки при отсутствии `RESEND_API_KEY`.

**Производительность** — `browserslist` в `package.json` нацелен на Chrome/Edge 92+, Firefox 90+, Safari 15.4+. Это указывает Next.js/SWC не генерировать полифиллы для `Array.prototype.at`, `.flat`, `.flatMap`, `Object.fromEntries`, экономя ~14 КиБ лишнего JavaScript.
