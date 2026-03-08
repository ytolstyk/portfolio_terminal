# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR (Vite)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint (flat config, v9+)
npm run preview   # Preview production build locally
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
