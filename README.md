# ⚽ Álbum — World Cup 2026 Sticker Tracker

A fast, installable **PWA** for tracking a World Cup 2026 sticker collection —
built for Luan. See what you **have**, what you **need**, keep your **doubles**
for trading, and add **real photos** of your stickers. Everything is saved on
the device automatically, so nothing gets lost.

## Features

- **"I'm Luan" one-tap load** — the welcome banner (and the Backup tab) has a
  button that loads Luan's real checklist: every sticker on his `COLADAS` list
  becomes _collected_, and each `REPETIDAS` adds that many _doubles_ (the
  `x2` / `x3` counts are respected). Safe to tap again — it only ever adds.
- **Full 993-sticker checklist** — his real 48-team album (grouped by
  confederation) with **real squad rosters** from the official Panini FIFA
  World Cup 2026 checklist, plus the special sections (FIFA World Cup trophy,
  emblem, mascots + special cards).
- **Real flag artwork** on every sticker, with a jersey-style design and a
  rarity ring (Common · Rare · Epic · **Legendary**, with a holographic shine).
- **Add real photos** — tap any sticker → _Add real photo_ to snap or pick the
  actual sticker from your phone. Photos are downscaled and stored privately on
  the device.
- **One-tap collecting** — the ✓/＋ button on each card, or a big toggle in the
  detail sheet. Track **doubles** with the gold ＋ stepper.
- **Search** by player name, country, confederation, or sticker number, and
  **filter** by rarity and by Have / Need.
- **Stats dashboard** — overall progress ring, per-rarity and per-group
  completion bars, and a "doubles to trade" list.
- **Never lose your data** — saved to `localStorage` instantly (with a mirrored
  backup key), plus **export/import to a file** from the Backup tab.
- **Installable** — add it to the home screen and it runs full-screen, offline.

## How your data is kept safe

1. Every tap writes straight to the browser's `localStorage` **and** a second
   backup key — no "save" button, and it survives closing the app.
2. The **Backup** tab can export the whole album to a `.json` file. Keep that
   file somewhere safe (email it to yourself, save to Photos/Drive). Restoring
   **merges** it back in, so you never overwrite good data.
3. Offline: once the app has loaded (and flags have been seen once), a service
   worker serves it with no network, so it keeps working anywhere.

> The only way to lose data is clearing the browser's site data / uninstalling
> without a backup file — that's exactly what the export button is for.

## Deploy to Vercel

This is a static Vite app — Vercel detects it automatically.

1. Push this repo to GitHub (already done if you're reading this there).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist`. Click **Deploy**.

That's it — you'll get a URL like `album-xxxx.vercel.app`. Open it on the
phone, then **Add to Home Screen** to install it as an app.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build
npm run gen:icons  # regenerate the PWA/app icons from scripts/gen-icons.mjs
```

## Editing the checklist

- `src/data/teams.ts` — the 48 teams (album code, flag, confederation, star
  players).
- `src/data/stickers.ts` — how each team's 20 stickers are generated, plus the
  special sections. The **FWC / CC / DD** special-section names and sizes are a
  best guess (the printed checklist isn't published); adjust the `SPECIALS`
  block there if the real album differs.
- `src/data/luan.ts` — Luan's `COLADAS` / `REPETIDAS` lists that power the
  "I'm Luan" button. Paste updated lists here anytime.

Every sticker is also renameable in-app via the ✏️ on its detail sheet, so
player names can be corrected as the real 2026 squads are confirmed.

## Tech

Vite · React · TypeScript · Tailwind CSS v4 · `vite-plugin-pwa` (Workbox) ·
self-hosted fonts (Anton + Manrope) for offline use.