# 🐍 Snake Game

A modern twist on the classic Snake arcade game — rebuilt for the web with **Next.js**, **TypeScript**, and **Tailwind CSS**. Responsive, fast, and packed with power-ups.
Live demo: [Click here](https://snake-game-peach-delta.vercel.app/)

## 🚀 Features

- 🎮 Playable directly in the browser — no install required
- ⚡ Built with Next.js for fast performance and server-side rendering
- 🔒 Written in TypeScript for type safety and maintainability
- 🎨 Styled using Tailwind CSS for rapid UI development
- 🧠 Gesture support for mobile devices
- 🛡️ Power-ups: Energy Shield, Speed Burst, Bombs
- 📈 Score tracking and leaderboard-ready
- 🌐 Deployed on Vercel

## 📦 Tech Stack

| Technology     | Purpose              |
|----------------|----------------------|
| Next.js        | Web framework        |
| TypeScript     | Static typing        |
| Tailwind CSS   | Styling              |
| Vercel         | Deployment platform  |

## 🌐 Deployment
Deploy instantly with Vercel, the platform built by the creators of Next.js..

## 📄 License
No license specified yet. Consider adding one (e.g. MIT) to clarify usage and contributions.

## 🛠️ Getting Started

To run the project locally:

```bash
npm install
npm run dev
Or use your preferred package manager:

yarn dev
# or
pnpm dev
# or
bun dev
Then open http://localhost:3000 in your browser.

📁 Project Structure
Code
src/
├── app/                     # Next.js app entry and backend logic
│   ├── api/                 # API routes (Next.js Route Handlers)
│   │   ├── clearLeaderboard/route.ts
│   │   ├── getLeaderboard/route.ts
│   │   └── submitScore/route.ts
│   ├── lib/                 # Shared backend utilities
│   │   └── mongoose.ts      # MongoDB connection setup
│   ├── models/              # Mongoose models
│   │   └── Leaderboard.ts
│   ├── services/            # Client-side data hooks
│   │   └── useLeaderboard.ts
│   ├── favicon.ico
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # App layout wrapper
│   └── page.tsx             # Main game page
│
├── components/              # UI and game components
│   ├── game/                # Game object renderers
│   │   ├── Board.tsx
│   │   ├── Bomb.tsx
│   │   ├── Energyshield.tsx
│   │   ├── Food.tsx
│   │   ├── Snake.tsx
│   │   └── Speedburst.tsx
│   ├── leaderboard/         # Leaderboard display
│   │   ├── Leaderboard.tsx
│   │   └── LeaderboardModal.tsx
│   └── ui/                  # General UI components
│       ├── BoardOverlay.tsx
│       ├── BuffStatus.tsx
│       ├── ControlButtons.tsx
│       ├── Score.tsx
│       ├── StartModal.tsx
│       └── Timer.tsx
│
├── constants/               # Game configuration values
│   └── gameConstants.ts
│
├── hooks/                   # Custom React hooks
│   └── useSnakeGame.ts
│
├── types/                   # TypeScript type definitions
│   ├── index.ts
│   └── mongoose.d.ts
│
└── utils/                   # Game logic helpers
    └── gameUtils.ts
