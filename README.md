<p align="center">
  <img src="icons/icon-192.svg" width="80" alt="NotePad Logo" />
</p>

<h1 align="center">NotePad</h1>

<p align="center">
  <strong>A beautiful, productive note-taking PWA built with vanilla JavaScript & OOP architecture.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/DaisyUI-3.9-5A0EF8?style=flat-square&logo=daisyui&logoColor=white" alt="DaisyUI" />
  <img src="https://img.shields.io/badge/PWA-Installable-purple?style=flat-square&logo=pwa&logoColor=white" alt="PWA" />
</p>

---

## Features

### Core
- **Create, edit & delete notes** with auto-save (debounced 600ms)
- **Search** instantly across all notes by title or body
- **Pin notes** to keep important ones at the top
- **Duplicate notes** with one click
- **Color-code notes** with 7 color tags for visual organization

### Categories & Groups
- **Custom categories** — create, rename, and delete your own topics
- **Filter by category** — click a chip to see only notes in that group
- **Note counts** on each category chip
- **New notes auto-assign** to the active category

### Productivity
- **Word count, character count & reading time** in the status bar
- **Relative timestamps** ("3m ago", "2h ago")
- **Keyboard shortcuts** — `Ctrl+N` new note, `Ctrl+F` search
- **Export all notes** as a categorized `.txt` file
- **Auto-save indicator** — "Typing..." / "Saved" in real-time

### Design
- **20 themes** — Dracula, Synthwave, Cyberpunk, Retro, Coffee, and more
- **Theme persistence** — your choice saved to localStorage
- **Responsive layout** — sidebar on desktop, bottom nav on mobile
- **iPhone Dynamic Island safe area** — proper `env(safe-area-inset)` padding
- **Delete confirmation modal** — no accidental deletions

### PWA
- **Installable** on desktop & mobile as a standalone app
- **Offline support** — service worker caches all assets
- **Custom app icon** — SVG notepad icon with Dracula colors

---

## Architecture

Built with a clean **MVC / OOP** pattern using ES6 classes and modules:

```
src/js/
  App.js          Controller — state, handlers, orchestration
  NotesView.js    View — DOM rendering, events, mobile/desktop layouts
  NotesAPI.js     Model — localStorage CRUD, categories, export
  main.js         Entry — bootstraps the app
```

**Data flow:**

```
User Action → View (event) → App (handler) → NotesAPI (localStorage) → App (refresh) → View (re-render)
```

**Storage:** All data lives in the browser's `localStorage` — no backend needed.

| Key | Content |
|-----|---------|
| `notes-app` | Array of note objects |
| `notes-app-categories` | Array of category objects |
| `notes-app-theme` | Active theme name |

---

## Tech Stack

| Tech | Role |
|------|------|
| **Vanilla JS (ES6+)** | Classes, modules, import/export |
| **Tailwind CSS 3.3** | Utility-first styling |
| **DaisyUI 3.9** | Component library (buttons, modals, themes) |
| **PostCSS** | CSS compilation |
| **Express.js** | Local dev server |
| **Service Worker** | Offline caching (stale-while-revalidate) |

---

## Getting Started

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/Note-App-OOP.git
cd Note-App-OOP

# Install
npm install

# Build CSS
npm run build

# Start dev server
npm start
# → http://localhost:3000

# Watch CSS changes (development)
npm run dev
```

---

## Deploy to Vercel

```bash
# Push to GitHub, then:
vercel --prod
```

The `vercel.json` is pre-configured with the build command and SPA rewrites. No extra setup needed.

---

## Project Structure

```
Note-App-OOP/
├── index.html              Entry HTML (root for Vercel)
├── manifest.json            PWA manifest
├── sw.js                    Service worker
├── icons/                   App icons (SVG)
├── src/
│   ├── js/                  Application code (ES6 modules)
│   │   ├── main.js
│   │   ├── App.js
│   │   ├── NotesView.js
│   │   └── NotesAPI.js
│   └── css/
│       └── tailwind.css     Source CSS (Tailwind directives)
├── public/build/
│   └── tailwind.css         Compiled CSS (PostCSS output)
├── server.js                Express dev server
├── tailwind.config.js       Tailwind + DaisyUI config
├── postcss.config.js        PostCSS plugins
├── vercel.json              Vercel deployment config
└── package.json
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | Create new note |
| `Ctrl + F` | Focus search bar |

---

## License

ISC
