import type { Project } from "@/types/terminal";

export const projects: Project[] = [
  {
    name: "advanced-metronome",
    displayName: "DrummaLlama",
    description: "Drum loop machine and metronome with Web Audio API",
    language: "TypeScript",
    url: "https://drummallama.com",
    github: "https://github.com/ytolstyk/advanced-metronome",
    year: 2026,
    tags: [
      "audio",
      "web-audio",
      "react",
      "music",
      "metronome",
      "drum-machine",
      "guitar-tuner",
      "guitar-chords",
      "guitar-scales",
    ],
    readme: `advanced-metronome
Drum loop machine and metronome built with Web Audio API.

DESCRIPTION
  An interactive drum machine and metronome that runs entirely in the
  browser using the Web Audio API. Features a step sequencer for
  programming drum patterns with adjustable BPM and swing.

TECH STACK
  Language:   TypeScript
  Framework:  React, Shadcn UI
  Audio:      Web Audio API
  Build:      Vite

FEATURES
  • Step sequencer with variable steps per pattern
  • Multiple drum tracks (kick, snare, hi-hat, etc.)
  • BPM control with tap tempo
  • Swing/groove adjustment
  • Visual beat indicator with precise timing
  • Guitar tuner mode with real-time pitch detection
  • Guitar chord library with audio samples
  • Guitar scale reference tool with audio playback

USAGE
  npm install
  npm run dev     # Start development server
  npm run build   # Build for production

GitHub: https://github.com/ytolstyk/advanced-metronome`,
  },
  {
    name: "eataburrita-native",
    displayName: "Eat-a-Burrita",
    description: "Native Android app — first mobile venture",
    language: "Kotlin",
    url: "https://github.com/ytolstyk/eataburrita-native",
    github: "https://github.com/ytolstyk/eataburrita-native",
    year: 2025,
    tags: ["android", "kotlin", "mobile", "native", "google-maps"],
    readme: `eataburrita-native
Native Android app — the mobile companion to eataburrita.

DESCRIPTION
  First foray into native Android development, built with Kotlin
  and Android SDK. Explores native navigation, layouts,
  and lifecycle management. Integrates with Google Maps API.

TECH STACK
  Language:   Kotlin
  Platform:   Android SDK
  Build:      Gradle
  Min SDK:    Android 8.0 (API 26)

FEATURES
  • Native Android UI with Material Design components
  • Fragment-based navigation
  • ViewModel + LiveData for reactive state
  • Custom illustrations and branding

SETUP
  Open in Android Studio
  Sync Gradle dependencies
  Run on emulator or physical device

GitHub: https://github.com/ytolstyk/eataburrita-native`,
  },
  {
    name: "saltmarsh-timeline",
    displayName: "Saltmarsh Timeline",
    description:
      "Interactive timeline app for DnD campaign Ghosts of Saltmarsh",
    language: "TypeScript",
    url: "https://saltmarsh-timeline.com",
    github: "https://github.com/ytolstyk/saltmarsh-timeline",
    year: 2025,
    tags: [
      "react",
      "dnd",
      "timeline",
      "game-tool",
      "aws",
      "amplify",
      "cognito",
      "mantine",
      "styled-components",
      "typescript",
    ],
    readme: `saltmarsh-timeline
Interactive timeline app for D&D campaign: Ghosts of Saltmarsh.

DESCRIPTION
  A campaign management tool for tracking events and plot
  threads in the Ghosts of Saltmarsh D&D module. Features a visual
  timeline with filterable event categories and session notes.

TECH STACK
  Language:          TypeScript
  Framework:         React
  Build:             Vite
  Styling:           Mantine, Styled-Components
  Infrastructure:    AWS Amplify, AWS Cognito

FEATURES
  • Visual timeline with scale and auto-grouping of events
  • Event categorization (combat, story, NPC encounters)
  • Searchable event log with filters
  • Import/export campaign data as JSON
  • User authentication for private campaign timelines

LORE
  Set in the coastal town of Saltmarsh, this tool helps DMs track
  the complex web of smugglers, sea monsters, and political intrigue
  that defines the Saltmarsh campaign.

USAGE
  npm install
  npm run dev

GitHub: https://github.com/ytolstyk/saltmarsh-timeline`,
  },
  {
    name: "battle-dice-web",
    displayName: "Dice Battles",
    description: "Web UI for battle dice game — React frontend",
    language: "TypeScript",
    url: "https://dicebattles.com",
    github: "https://github.com/ytolstyk/battle-dice-web",
    year: 2025,
    tags: [
      "react",
      "websockets",
      "game",
      "frontend",
      "mantine",
      "typescript",
      "vite",
      "websocket",
    ],
    readme: `battle-dice-web
React frontend for the battle dice multiplayer game.

DESCRIPTION
  The browser-based UI for battle-dice-server. Players join game
  sessions, roll dice in real time, and watch HP bars drain as
  the battle unfolds. Communicates via WebSocket to the server.

TECH STACK
  Language:   TypeScript
  Framework:  React, Mantine UI
  Build:      Vite
  Comms:      WebSocket (native)

FEATURES
  • Real-time game state updates via WebSocket
  • Animated dice roll visualizations
  • Session lobby with shareable codes
  • Mobile-responsive battle arena UI

COMPANION
  Requires battle-dice-server running locally or deployed.
  See: https://github.com/ytolstyk/battle-dice-server

USAGE
  npm install
  npm run dev

GitHub: https://github.com/ytolstyk/battle-dice-web`,
  },
  {
    name: "dark-forest",
    displayName: "Dark Forest",
    description:
      "Top-down survival horror game with procedural terrain and enemy AI",
    language: "TypeScript",
    url: "https://darkforest.yuriytolstykh.com",
    github: "https://github.com/ytolstyk/dark-forest-game-concept",
    year: 2026,
    tags: [
      "game",
      "pixi.js",
      "canvas",
      "procedural-generation",
      "react",
      "typescript",
      "pathfinding",
      "astar",
    ],
    readme: `dark-forest
Top-down survival horror game built with Pixi.js and React.

DESCRIPTION
  Escape the forest before the creatures find you. Locate keys and
  fuel scattered across a procedurally generated map, then reach
  the car before forest spirits and enemies close in. Toggle your
  torch to see — but light attracts enemies.

TECH STACK
  Language:   TypeScript
  Framework:  React 19
  Renderer:   Pixi.js v8 (2D canvas/WebGL)
  Build:      Vite
  Terrain:    simplex-noise

FEATURES
  • Procedural terrain — rivers, forests, dirt paths, abandoned buildings
  • Enemy AI state machine — patrol, chase, search, return via A* pathfinding
  • The Leshen — a relentless forest spirit boss
  • Crow flocks, particle effects, and atmospheric lighting
  • Heart rate monitor HUD that reacts to danger
  • Torch mechanic — reveals surroundings but attracts enemies
  • Spatial audio — footsteps, torch crackle, growls, chase music
  • Mobile touchscreen controls
  • WASD / arrow key movement

CONTROLS
  WASD / Arrow keys   Move
  Spacebar            Toggle torch

GitHub: https://github.com/ytolstyk/dark-forest-game-concept`,
  },
  {
    name: "battle-dice-server",
    displayName: "Dice Battles Server",
    description:
      "Express server with WebSocket support for real-time battle dice game",
    language: "TypeScript",
    url: "https://github.com/ytolstyk/battle-dice-server",
    github: "https://github.com/ytolstyk/battle-dice-server",
    year: 2025,
    tags: [
      "express",
      "websockets",
      "game",
      "backend",
      "typescript",
      "websocket",
    ],
    readme: `battle-dice-server
Express server with WebSocket support for real-time battle dice game.

DESCRIPTION
  Real-time multiplayer battle dice game backend. Players roll dice,
  attack each other, and determine rules via persistent WebSocket connections.
  Built with Express and the WS library on Node.js.

TECH STACK
  Runtime:    Node.js
  Language:   TypeScript
  Framework:  Express
  Protocol:   WebSocket (ws)

FEATURES
  • Real-time bidirectional communication via WebSockets
  • Game session management and player state tracking
  • Dice roll logic with attack/defense calculations
  • RESTful endpoints for session creation

USAGE
  npm install
  npm run dev     # Development with hot reload
  npm run build   # Production build
  npm start       # Start production server

GitHub: https://github.com/ytolstyk/battle-dice-server`,
  },
];

export function getProject(name: string): Project | undefined {
  return projects.find((p) => p.name === name);
}
