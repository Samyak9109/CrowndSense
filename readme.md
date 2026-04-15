# 🏟️ CrowdSense — Smart Stadium Experience Platform

> **Built for Google X Hackathon — Vision Z: Virtual Prompt Wars**

CrowdSense solves the worst parts of large-scale sporting events — chaotic gate entry, long food queues, overcrowded washrooms, and lost friends — through a real-time, AI-assisted progressive web app. Designed for distracted, moving users in harsh stadium lighting.

---

## 🎯 Problem Statement

> *Design a solution that improves the physical event experience for attendees at large-scale sporting venues. The system should address challenges such as crowd movement, waiting times, and real-time coordination, while ensuring a seamless and enjoyable experience.*

---

## ✨ Core Features

### 🚪 Smart Gate Entry
- Real-time queue depth across all stadium gates
- AI-recommended fastest entry gate — **prioritizes wait time, not walking distance**
- Live lane count and avg. processing time per gate
- Color-coded congestion: `🟢 Low → 🟡 Moderate → 🟠 High → 🔴 Critical`
- Stadium SVG map with glowing gate nodes

### 🍔 Food & Drink Intelligence
- 12+ stall listings with live crowd levels and wait times
- Real-time crowd-sourced ratings (submit in-app)
- Sort by: ⭐ Top Rated / ⚡ Fastest / 👥 Least Crowded
- Zone-based filtering (North / East / South / West Stand)

### 🚻 Washroom Wait Times
- Live occupancy + queue depth per washroom block
- Available stall count updated every 10 seconds
- Sorted by estimated wait — always shows nearest free option

### 👥 Friend Finder
- Share your seat location via a 6-character code (no account needed)
- Codes expire after 2 hours automatically
- Works entirely in-browser — no sign-up friction

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Design** | [Stitch AI](https://stitch.withgoogle.com) via MCP |
| **AI Models** | Anthropic Claude Sonnet + Opus (Antigravity) |
| **Backend** | Node.js + Express |
| **Deployment** | Google Cloud Run |
| **Containerization** | Docker |
| **Real-time Updates** | In-memory simulation engine (10s tick) |

---

## 🎨 Design System — *The Kinetic Pulse*

Built for **stadium conditions**: moving users, harsh lighting, glancing interactions.

- **Dark-mode first** — background `#0a0e14`, no pure white text
- **No border lines** — depth via tonal surface layering (`surface → surface-container-high → highest`)
- **Glassmorphism overlays** — `backdrop-filter: blur(20px)` at 60% opacity
- **Neon accent palette** — Primary `#81ecff`, Success `#2ff801`, Alert `#ff716c`
- **Typography** — Space Grotesk (headlines) + Manrope (body)
- **48dp minimum tap targets** — designed for one-handed outdoor use
- **Glow indicators** — 4px dot + 12px outer glow = live data signal

---

## 🏗️ Architecture

```
crowdsense/
├── server.js          # Express API + simulation engine
├── public/
│   ├── index.html     # SPA — all 4 views (Gates, Food, Washrooms, Friends)
│   └── style.css      # Kinetic Pulse design system
├── Dockerfile         # Node 20 Alpine image, port 8080
├── DESIGN.md          # Full design token reference
└── package.json
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/your-org/crowdsense
cd crowdsense
npm install
npm start
# → http://localhost:8080
```

### Docker

```bash
docker build -t crowdsense .
docker run -p 8080:8080 crowdsense
```
### Live link
https://crowdsense-api-710722782220.asia-south1.run.app
---

## 📱 UX Principles

- **No sign-up** — zero friction entry, friend codes work instantly
- **Single-hand use** — bottom nav, large tap targets
- **Glanceable data** — color + number conveys status in under 1 second
- **Live badge** — pulsing dot signals real-time updates at all times

---

## 👨‍💻 Team

Built at **Google X Hackathon — Vision Z: Virtual Prompt Wars**

---

## 📄 License

MIT
