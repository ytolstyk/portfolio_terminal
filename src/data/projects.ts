import type { Project } from "@/types/terminal";

export const projects: Project[] = [
  {
    name: "advanced-metronome",
    displayName: "advanced-metronome",
    description: "Drum loop machine and metronome with Web Audio API",
    language: "TypeScript",
    url: "https://drummallama.com",
    year: 2025,
    tags: ["audio", "web-audio", "react", "music"],
    readme: `advanced-metronome
Drum loop machine and metronome built with Web Audio API.

DESCRIPTION
  An interactive drum machine and metronome that runs entirely in the
  browser using the Web Audio API. Features a step sequencer for
  programming drum patterns with adjustable BPM and swing.

TECH STACK
  Language:   TypeScript
  Framework:  React
  Audio:      Web Audio API
  Build:      Vite

FEATURES
  • Step sequencer with 16 steps per pattern
  • Multiple drum tracks (kick, snare, hi-hat, etc.)
  • BPM control with tap tempo
  • Swing/groove adjustment
  • Visual beat indicator with precise timing

USAGE
  npm install
  npm run dev     # Start development server
  npm run build   # Build for production

GitHub: https://github.com/ytolstyk/advanced-metronome`,
  },
  {
    name: "eataburrita-native",
    displayName: "eataburrita-native",
    description: "Native Android app — first mobile venture",
    language: "Kotlin",
    url: "https://github.com/ytolstyk/eataburrita-native",
    year: 2025,
    tags: ["android", "kotlin", "mobile", "native"],
    readme: `eataburrita-native
Native Android app — the mobile companion to eataburrita.

DESCRIPTION
  First foray into native Android development. A companion app for
  the eataburrita brand, built with Kotlin and Android SDK. Explores
  native navigation, layouts, and lifecycle management.

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
    displayName: "saltmarsh-timeline",
    description:
      "Interactive timeline app for DnD campaign Ghosts of Saltmarsh",
    language: "TypeScript",
    url: "https://saltmarsh-timeline.com",
    year: 2025,
    tags: ["react", "dnd", "timeline", "game-tool"],
    readme: `saltmarsh-timeline
Interactive timeline app for D&D campaign: Ghosts of Saltmarsh.

DESCRIPTION
  A campaign management tool for tracking events, NPCs, and plot
  threads in the Ghosts of Saltmarsh D&D module. Features a visual
  timeline with filterable event categories and session notes.

TECH STACK
  Language:   TypeScript
  Framework:  React
  Build:      Vite
  Styling:    CSS

FEATURES
  • Visual timeline with zoom and pan
  • Event categorization (combat, story, NPC encounters)
  • Session log with searchable notes
  • NPC relationship tracker
  • Printable session summaries

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
    displayName: "battle-dice-web",
    description: "Web UI for battle dice game — React frontend",
    language: "TypeScript",
    url: "https://dicebattles.com",
    year: 2025,
    tags: ["react", "websockets", "game", "frontend"],
    readme: `battle-dice-web
React frontend for the battle dice multiplayer game.

DESCRIPTION
  The browser-based UI for battle-dice-server. Players join game
  sessions, roll dice in real time, and watch HP bars drain as
  the battle unfolds. Communicates via WebSocket to the server.

TECH STACK
  Language:   TypeScript
  Framework:  React
  Build:      Vite
  Comms:      WebSocket (native)

FEATURES
  • Real-time game state updates via WebSocket
  • Animated dice roll visualizations
  • HP bar with damage animations
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
    name: "battle-dice-server",
    displayName: "battle-dice-server",
    description:
      "Express server with WebSocket support for real-time battle dice game",
    language: "TypeScript",
    url: "https://github.com/ytolstyk/battle-dice-server",
    year: 2025,
    tags: ["express", "websockets", "game", "backend"],
    readme: `battle-dice-server
Express server with WebSocket support for real-time battle dice game.

DESCRIPTION
  Real-time multiplayer battle dice game backend. Players roll dice,
  attack each other, and track HP via persistent WebSocket connections.
  Built with Express and the ws library on Node.js.

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
