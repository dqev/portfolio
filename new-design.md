# Card Portfolio Design System Specification

Technical, zero-fluff specification for recreating this exact single-column card-based portfolio design.

---

## 1. Design Tokens & Core Rules

### Dimensions & Layout
- **Page Margin/Padding**: Strict `10px` around entire page (`body { padding: 10px; }`).
- **Container Max-Width**: `400px` fixed maximum width, centered horizontally (`margin: 0 auto;`).
- **Card-to-Card Gap**: `10px` vertical gap between cards.
- **Card Border-Radius**: `10px` on all cards.
- **Card Overflow**: `hidden`.
- **Card Border**: `none` (`0`).
- **Bottom Stretch**: The last card (`.card-writing`) has `flex: 1` so it expands to touch the bottom 10px page boundary with zero leftover whitespace.

### Colors
- **Page Canvas Background**: `#ffffff`
- **Card Background**: `#f5f5f5`
- **Primary Text**: `#000000`
- **Muted / Link Text**: `#707070`
- **Subtle / Date Text**: `#a0a0a0`
- **Link Hover State**: `#000000`
- **Button Purple**: `#9B8AFB`
- **Button White**: `#ffffff`

### Typography
- **Font Family**: `'Figtree', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Weights Used**:
  - `500` (Medium): Body text, button text, list items, dates, bio.
  - `600` (SemiBold): Name heading, section titles (`Projects`, `Socials`, `Writing`), live clock display.
- **Global Letter Spacing**: `-0.01em` (Headings use `-0.02em`).
- **Global Line Height**: `130%` (`1.3`).
- **Font Import**:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet" />
  ```

### Content Formatting Constraint
- **No Em Dashes**: Never use em dashes (`—`). Standard hyphens only (`-`), surrounded by spaces (` - `).

---

## 2. CSS Reset & Global Canvas

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}

html {
  height: 100%;
  overflow-x: hidden;
  max-width: 100vw;
}

body {
  margin: 0;
  padding: 10px;
  min-height: 100vh;
  min-height: 100dvh;
  max-width: 100vw;
  overflow-x: hidden;
  background-color: #ffffff;
  color: #000000;
  font-family: 'Figtree', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 130%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 400px;
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
}

.card {
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  min-width: 0;
  max-width: 100%;
}
```

---

## 3. Card-by-Card Specifications

### Card 1: Name
- **Selector**: `.card.card-name`
- **Padding**: `56px 20px`
- **Alignment**: Centered horizontally and vertically (`display: flex; align-items: center; justify-content: center; text-align: center;`).
- **`<h1>` Styles**:
  - `font-size: 34px;`
  - `font-weight: 600;`
  - `letter-spacing: -0.02em;`
  - `line-height: 1.1;`
  - `color: #000000;`
- **DOM**:
  ```html
  <section class="card card-name">
    <h1>Dev Chauhan</h1>
  </section>
  ```

---

### Card 2: Bio & Action Buttons
- **Selector**: `.card.card-bio`
- **Padding**: `20px`
- **Layout**: `display: flex; flex-direction: column; gap: 16px;`
- **Bio Text (`.bio-text`)**:
  - `font-size: 14px;`
  - `font-weight: 500;`
  - `line-height: 130%;`
  - `color: #000000;`
  - `letter-spacing: -0.01em;`
  - Links inside bio (`.bio-text a`, `.bio-text .muted-link`):
    - Default: `color: #707070; text-decoration: none; transition: color 0.15s ease;`
    - Hover: `color: #000000;`
- **Actions Bar (`.bio-actions`)**:
  - `display: flex; align-items: center; justify-content: space-between; width: 100%;`

#### Base Button System (`.btn`)
```css
.btn {
  will-change: var(--framer-will-change-effect-override, transform);
  border-radius: 100px;
  flex-flow: row;
  flex: none;
  place-content: center;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: fit-content;
  height: 30px;
  padding: 0 12px;
  text-decoration: none;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.01em;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn:active {
  transform: scale(0.98);
}
```

#### Button 1: "Let's talk" (`.btn-white`)
- **Background**: `#ffffff`
- **Text Color**: `#000000`
- **Padding**: `0 12px 0 9px`
- **Gap**: `6px`
- **Telegram Plane Takeoff Animation**:
  ```css
  .btn-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    display: block;
  }

  .tg-plane {
    transform-box: fill-box;
    transform-origin: center;
    will-change: transform, opacity;
  }

  .btn-white:hover .tg-plane {
    animation: tgFly 0.85s cubic-bezier(0.25, 0.9, 0.25, 1);
  }

  @keyframes tgFly {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    38% {
      transform: translate(140%, -140%);
      opacity: 0;
    }
    39% {
      transform: translate(-120%, 120%);
      opacity: 0;
    }
    65% {
      opacity: 1;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  ```
- **SVG Structure**:
  ```html
  <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" class="btn btn-white">
    <svg class="btn-icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="16" height="16" preserveAspectRatio="xMidYMid" aria-hidden="true">
      <defs>
        <linearGradient id="tg-grad" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#2aabee" />
          <stop offset="100%" stop-color="#229ed9" />
        </linearGradient>
        <clipPath id="tg-clip">
          <circle cx="128" cy="128" r="128" />
        </clipPath>
      </defs>
      <path fill="url(#tg-grad)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0" />
      <g clip-path="url(#tg-clip)">
        <path class="tg-plane" fill="#ffffff" d="M57.94 126.648q55.98-24.385 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072" />
      </g>
    </svg>
    <span>Let's talk</span>
  </a>
  ```

#### Button 2: Secondary / Product Action (`.btn-purple`)
- **Background**: `#9B8AFB`
- **Text Color**: `#000000`
- **Default Padding**: `0 12px`
- **Hover Padding**: `0 10px 0 12px` (adjusts to accommodate slide-in arrow)
- **Arrow Micro-Interaction**:
  - Hidden at default (`width: 0; opacity: 0; margin-left: 0; transform: translate(-3px, 3px) scale(0.6)`).
  - Slides in smoothly on hover (`width: 14px; opacity: 1; margin-left: 2px; transform: translate(0, 0) scale(1)`).
- **CSS**:
  ```css
  .btn-purple {
    background-color: #9B8AFB;
    color: #000000;
    padding: 0 12px;
    transition: opacity 0.25s ease, transform 0.25s ease, padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-purple:hover {
    padding: 0 10px 0 12px;
  }

  .btn-arrow {
    width: 0;
    height: 12px;
    opacity: 0;
    margin-left: 0;
    transform: translate(-3px, 3px) scale(0.6);
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.35s ease,
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-block;
    flex-shrink: 0;
    pointer-events: none;
  }

  .btn-purple:hover .btn-arrow {
    width: 14px;
    opacity: 1;
    margin-left: 2px;
    transform: translate(0, 0) scale(1);
  }
  ```
- **DOM**:
  ```html
  <a href="https://reicon.dev" target="_blank" rel="noopener noreferrer" class="btn btn-purple">
    <span>Reicon</span>
    <svg class="btn-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="12" width="12" aria-hidden="true">
      <path fill="currentColor" d="M7 5a1 1 0 1 0 0 2h7.586l-8.543 8.543a1 1 0 1 0 1.414 1.414L16 8.414V16a1 1 0 1 0 2 0V6q0-.12-.027-.231l-.016-.062a1 1 0 0 0-.122-.257 1 1 0 0 0-.36-.33l-.041-.02a1 1 0 0 0-.141-.057l-.062-.016-.034-.007-.006-.001-.088-.014Q17.053 5 17 5z" />
    </svg>
  </a>
  ```

---

### Card 3: Live Clock & Location
- **Selector**: `.card.card-time`
- **Padding**: `32px 20px`
- **Alignment**: Centered horizontally and vertically (`display: flex; align-items: center; justify-content: center; text-align: center;`).
- **Display Text (`.time-display`)**:
  - `font-size: 24px;`
  - `font-weight: 600;`
  - `letter-spacing: -0.01em;`
  - `color: #000000;`
  - Text format: `HH:MM:SS AM/PM / India` (e.g. `10:29:15 PM / India`).
- **DOM**:
  ```html
  <section class="card card-time">
    <div class="time-display" id="clock-display">00:00:00 AM / India</div>
  </section>
  ```
- **Script**:
  ```js
  function updateClock() {
    const clockEl = document.getElementById("clock-display");
    if (!clockEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    clockEl.textContent = `${timeStr} / India`;
  }
  updateClock();
  setInterval(updateClock, 1000);
  ```

---

### Card 4: Directory Grid (Projects & Socials)
- **Selector**: `.card.card-grid`
- **Padding**: `20px`
- **Grid Layout**: 2 equal columns:
  ```css
  .grid-columns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .grid-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ```
- **Section Heading (`.col-title`)**:
  - `font-size: 14px;`
  - `font-weight: 600;`
  - `color: #000000;`
  - `letter-spacing: -0.01em;`
  - `line-height: 1.2;`
- **Item List (`.col-list`)**:
  ```css
  .col-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .col-list a,
  .col-list span {
    font-size: 13.5px;
    font-weight: 500;
    color: #707070;
    text-decoration: none;
    letter-spacing: -0.01em;
    line-height: 1.3;
    transition: color 0.15s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .col-list a:hover {
    color: #000000;
  }
  ```
- **DOM**:
  ```html
  <section class="card card-grid">
    <div class="grid-columns">
      <div class="grid-col">
        <h2 class="col-title">Projects</h2>
        <ul class="col-list">
          <li><a href="https://reicon.dev" target="_blank" rel="noopener noreferrer">Reicon</a></li>
          <li><a href="https://topfree.lol" target="_blank" rel="noopener noreferrer">TopFree</a></li>
          <li><a href="/curto">Curto Serif</a></li>
        </ul>
      </div>

      <div class="grid-col">
        <h2 class="col-title">Socials</h2>
        <ul class="col-list">
          <li><a href="https://x.com/devchauhann3" target="_blank" rel="noopener noreferrer">X/Twitter</a></li>
          <li><a href="https://github.com/dqev" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://linkedin.com/in/devchauhann3" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="mailto:dev@devchauhan.in">Email</a></li>
        </ul>
      </div>
    </div>
  </section>
  ```

---

### Card 5: Writing (Bottom Card with flex: 1)
- **Selector**: `.card.card-writing`
- **Flex Behavior**: `flex: 1` ensures this card expands to occupy all remaining vertical space in the viewport, landing cleanly at the exact 10px page bottom padding.
- **Padding**: `20px`
- **Gap**: `10px`
- **Header**:
  ```css
  .card-writing-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ```
- **Writing List**:
  ```css
  .writing-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .writing-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .writing-item a {
    font-size: 13.5px;
    font-weight: 500;
    color: #707070;
    text-decoration: none;
    letter-spacing: -0.01em;
    line-height: 1.3;
    transition: color 0.15s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .writing-item a:hover {
    color: #000000;
  }

  .writing-date {
    font-size: 13.5px;
    font-weight: 500;
    color: #a0a0a0;
    flex-shrink: 0;
    line-height: 1.3;
  }
  ```
- **DOM**:
  ```html
  <section class="card card-writing">
    <div class="card-writing-header">
      <h2 class="col-title">Writing</h2>
    </div>
    <ul class="writing-list">
      <li class="writing-item">
        <a href="/writing/curto">Curto Serif - The Free Open-Source Serif</a>
        <span class="writing-date">20/10</span>
      </li>
      <li class="writing-item">
        <a href="/writing/vibe-coded-designers">Vibe-Coded Designers</a>
        <span class="writing-date">15/09</span>
      </li>
      <li class="writing-item">
        <a href="/writing/reicon">Building Reicon - 2,700+ UI Icons</a>
        <span class="writing-date">29/07</span>
      </li>
    </ul>
  </section>
  ```

---

## 4. Complete Skeleton Template

To generate any page conforming 100% to this system, copy this exact boilerplate:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; border: 0; outline: 0; }
    html { height: 100%; }
    body {
      margin: 0; padding: 10px; min-height: 100vh; min-height: 100dvh;
      background-color: #ffffff; color: #000000;
      font-family: 'Figtree', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-weight: 500; letter-spacing: -0.01em; line-height: 130%;
      -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
      display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
    }
    .container {
      width: 100%; max-width: 400px; flex: 1; display: flex; flex-direction: column; gap: 10px; margin: 0 auto;
    }
    .card { background-color: #f5f5f5; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
    /* Place specific card styles here */
  </style>
</head>
<body>
  <main class="container">
    <!-- Cards inserted here -->
  </main>
</body>
</html>
```

---

## 5. Article Page Architecture

Writing/article pages under `/writing/*` share the identical 400px card system via `/writing/article.css`:

1. **Card 1: Navigation (`.card.card-nav`)**
   - Left: Back pill button (`.btn-back`): `#ffffff` pill with arrow icon linking to `/` (`Writing`).
   - Right: Date tag (`.nav-tag`): `13px` / `500` / `#707070`.
2. **Card 2: Article Header (`.card.card-header`)**
   - Title: `24px` / `600` / `line-height: 1.2` / `letter-spacing: -0.02em`.
   - Meta row: Date, reading time, author name separated by subtle dots (`.meta-dot`).
3. **Card 3: Article Body (`.card.card-content.blog-content`)**
   - Cover image: `border-radius: 8px; width: 100%;`
   - Body paragraphs: `14px` / `500` / `line-height: 155%`.
   - Section headings (`h2`): `17px` / `600` / `letter-spacing: -0.015em`.
   - Subsection headings (`h3`): `14.5px` / `600` / `letter-spacing: -0.01em`.
   - Links: Underlined `#707070` with hover transition to `#000000`.
   - Code blocks (`pre`): Clean `#ffffff` card, `12px` monospace, with compact cut-corner notch copy button (`top: 0; right: 0; width: 24px; height: 24px; border-radius: 0 8px 0 6px; background: #f5f5f5;`).
   - Comparison tables (`.comparison`): Clean `#ffffff` card rows with strong labels and muted values.
   - FAQs (`.faq details`): Expandable `#ffffff` cards with bold summaries and smooth rotating `+` SVG icon (`rotate(45deg)` on open).
4. **Card 4: More Writing (`.card.card-more`)**
   - Section title: `.col-title` (`14px` / `600`).
   - List of other articles with dates (`.writing-list`).
5. **Card 5: Footer (`.card.card-footer`)**
   - Copyright (`Dev Chauhan © 2026`) and link to `devchauhan.in`.