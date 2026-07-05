# ගුණදාස කපුගේ — Tribute Website (MERN)

Cinematic old-vibe tribute site for Gunadasa Kapuge (1945–2003).
React + Vite + Framer Motion + Lenis · Express + MongoDB (optional).

## Run (development)

```bash
npm install          # root (concurrently)
npm run dev          # starts server (:5000) + client (:5173)
```

Open http://localhost:5173

- Works **without MongoDB** — the API serves `server/data/content.json` as fallback.
- To enable MongoDB: copy `server/.env.example` → `server/.env` and set `MONGODB_URI`
  (local MongoDB or free Atlas cluster). Songs/albums auto-seed on first run;
  contact messages are then persisted.

## Structure

```
client/   React app (pages: Home, Biography, Music, Concerts, Gallery, Contact)
server/   Express API (/api/songs, /api/albums, /api/timeline, /api/gallery,
          /api/concerts, POST /api/messages)
```

## Design

From the Figma design: https://www.figma.com/design/W5n7HGbrI1aCROdMo4vKdZ
Sepia-earth palette (#1a120b / #e8d5b0 / #c9a227), fonts: Abhaya Libre,
Cinzel, EB Garamond, Josefin Sans.

## TODO before launch

- [ ] Replace gradient placeholders with real sepia photos (`client/public/images/`)
- [ ] Verify album/song titles & years against the real discography
      (current ones are PLACEHOLDERS)
- [ ] Point Listen-modal links at official uploads instead of searches (optional)
- [ ] Set MONGODB_URI in production
```
