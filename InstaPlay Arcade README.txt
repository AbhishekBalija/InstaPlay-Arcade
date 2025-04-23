# InstaPlay Arcade

## Overview
InstaPlay Arcade is a web-based gaming platform tailored for casual gamers and social players. It offers a library of quick, no-download games that can be played solo or with friends.

## Problem Statement
Many players seek instant, lightweight games they can jump into anywhere, without installing apps. They also want simple ways to compete and share results with friends.

## Key Features
- **Game Library**: Classic titles like chess, tic‑tac‑toe, memory match, card games, and puzzles.
- **Instant Play**: No login required—click and play immediately.
- **User Accounts (Optional)**: Register to track scores, save progress, and manage friend lists.
- **Multiplayer**: Invite friends via shareable links for real-time matches.
- **Social Sharing**: Automatically generate share cards for wins/losses and challenges.

## Viral Hooks
- Challenge links that notify friends directly.
- Shareable game result cards to social media platforms.
- Leaderboards and weekly tournaments.

## Monetization Strategy
1. **Ad-Supported (Free)**: Display banner and interstitial ads between games.
2. **Subscription** ($5/month): Ad-free experience + access to premium game packs.
3. **In-App Currency**: Purchase tokens for avatar/customization items or tournament entry fees.

## Proposed Tech Stack
| Layer              | Technology                                                   |
|--------------------|--------------------------------------------------------------|
| **Frontend**       | React (TypeScript + SWC) + Vite, Tailwind CSS, ShadCN UI     |
| **Backend**        | Node.js with Express.js (TypeScript)                         |
| **Realtime/WS**    | Socket.io                                                    |
| **Database**       | MongoDB Atlas                                                |
| **Auth & Storage** | MongoDB Atlas                                                |
| **Hosting**        | Vercel (frontend), Heroku (backend)                          |
| **CI/CD**          | GitHub Actions                                               |
| **Analytics**      | Plausible or Google Analytics                                |
| **Ads**            | Google AdSense (web)                                         |

## Architecture Diagram
```plaintext
+------------------+          +------------------+          +----------------+
|   React Frontend | <----->  | Express/Socket.io| <----->  | Mongo DB       |
| (Vercel)         |          | (Heroku)         |          | (Atlas )       |
+------------------+          +------------------+          +----------------+
         |                            
         |                            
         +-- Social Share / Ads
```

## Next Steps
1. Scaffold frontend with Vite + React + Tailwind.
2. Build game modules and integrate Socket.io for multiplayer.
3. Implement social sharing and ad placement.
4. Deploy CI/CD pipelines.

---

*This document serves as the initial specification and can be refined into detailed user stories and wireframes.*
