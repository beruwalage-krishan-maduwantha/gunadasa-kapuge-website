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

## Content

Biography, timeline, albums, songs and concert facts are sourced from
[Wikipedia — Gunadasa Kapuge](https://en.wikipedia.org/wiki/Gunadasa_Kapuge)
(birth 1945-08-07 Thanabaddegama/Elpitiya; SLBC from 1960; first release
"Daesa Nilupul Thema" 1973; Kampana premiered 1990-08-25 at Lumbini,
~1,000 shows; died 2003-04-03). Sinhala spellings of titles were
transliterated from the English article — worth a native-speaker review.

## TODO before launch

- [ ] Replace gradient placeholders with real sepia photos (`client/public/images/`)
- [ ] Native-speaker check of Sinhala song/album title spellings
- [ ] Point Listen-modal links at official uploads instead of searches (optional)
- [ ] Set MONGODB_URI in production
```
