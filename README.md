# Terminal Portfolio

A personal portfolio site with a terminal-inspired aesthetic, built with React, TypeScript, and Vite.

## Features

- **Portfolio view** — hero, about, skills, experience, and projects sections
- **Experience modals** — click any work history card to see detailed achievements; accent color matches the card's timeline color
- **Terminal emulator** — in-browser terminal with custom commands (`help`, `about`, `skills`, `experience`, `projects`, `clear`)
- **Project detail pages** — per-project pages with color-coded theming
- **Dark mode** — dark background with a cycling neon accent palette

## Stack

- React 19, TypeScript 5.9, Vite 7
- React Router v7
- Plain CSS (no preprocessor)

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Project Structure

```
src/
  App.tsx                        # Root component, router setup
  components/
    Portfolio/                   # Main portfolio page
    Terminal/                    # Terminal emulator overlay
    ProjectDetail/               # Individual project pages
  context/
    AppContext.tsx                # Terminal visibility state
```
