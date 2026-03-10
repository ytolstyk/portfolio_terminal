# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev                 # Start dev server with HMR (Vite)
rtk tsc                     # Type-check (tsc -b)
rtk err npm run build       # Production build (vite build)
rtk lint                    # ESLint (flat config, v9+)
npm run preview             # Preview production build locally
```

No test runner is configured.

## Architecture

**Stack:** React 19, TypeScript 5.9, Vite 7, plain CSS (no preprocessor)

**Entry points:**

- `index.html` → `src/main.tsx` (React root via `createRoot`)
- `src/App.tsx` — root component

**TypeScript:** Two tsconfig files — `tsconfig.app.json` (src, strict, ES2022, bundler resolution) and `tsconfig.node.json` (vite.config.ts only).

**ESLint:** Flat config (`eslint.config.js`). Enforces react-hooks and react-refresh rules. Unused locals/parameters are errors.

**Styling:** Global styles in `src/index.css`, component styles co-located (e.g. `src/App.css`). Dark mode via `prefers-color-scheme`.

**State:** React built-in hooks only — no external state library.

**Routing:** React Router v7. Routes: `/` (Portfolio), `/project/:name` (ProjectDetail).

## Key Files

- `src/components/Portfolio/Portfolio.tsx` — main portfolio page; contains `EXPERIENCE`, `PROJECTS`, `SKILLS` data constants, `EXP_COLORS` accent map, and inline `ExperienceModal` component
- `src/components/Portfolio/Portfolio.css` — all portfolio styles including the 5-color cycling pattern for experience items and modal styles
- `src/components/Terminal/` — terminal emulator overlay toggled via `AppContext`
- `src/components/ProjectDetail/` — per-project detail pages, color-themed via `?c=` query param
- `src/context/AppContext.tsx` — terminal visibility state (`setTerminalVisible`)
- `public/resume.txt` — source of truth for experience bullets and company descriptions

## Design Conventions

**5-color cycling accent palette** (used for experience items, nth-child 1-based):

- index 0 → `#fbbf24` amber
- index 1 → `#22d3ee` cyan
- index 2 → `#fb7185` rose
- index 3 → `#34d399` emerald
- index 4 → `#fb923c` orange

CSS uses `:nth-child(5n+X)` selectors; JS uses `colorIdx = index % 5`.

## Validations

Run these commands. Ensure no errors before submitting.

1. **Lint** `rtk lint`
2. **Types** `rtk tsc`
