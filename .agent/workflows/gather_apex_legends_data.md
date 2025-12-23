---
description: Gather up‑to‑date Apex Legends data for the ApexBlades project
---

# Workflow: Gather Apex Legends Data (Season‑aware)

## 1️⃣ Define Scope & Sources
1. **Canonical sources** (must be checked on every patch day):
   - EA Patch Notes: `https://www.ea.com/games/apex-legends/news`
   - In‑game ability/tooltips (via Firing Range screenshots or API if available).
2. **Community‑verified sources** (used for enrichment, not authoritative):
   - ApexMovement.tech – movement‑tech videos & guides.
   - Apex Legends Status (ALS) – pick‑rate & meta data.
   - Trusted YouTube creators (e.g., Faide, Aceu) for edge‑case interactions.
3. **Supplemental sources** (cross‑check only):
   - Apex Wiki, Reddit, Twitter/X.

## 2️⃣ Automated Extraction Scripts
- **scripts/scrape_patch_notes.ts** – pulls the latest patch notes HTML, parses weapon/legend changes, writes JSON to `data/legends/` and `data/weapons/`.
- **scripts/update_als.ts** – calls the ALS public API, stores pick‑rate snapshots in `data/meta/als_snapshot_YYYYMMDD.json`.
- **scripts/ingest_movement_videos.ts** – reads `apexmovement.tech.har`, extracts HLS URLs, builds `data/legends/<legend>.techniques.videos.json`.

> // turbo‑all  (All `run_command` steps below are safe to auto‑run)

## 3️⃣ Run Extraction (Patch Day)
```bash
# 3a – Pull latest patch notes and generate JSON diff
npm run scrape-patch-notes   # → updates data/legends/*.json, data/weapons/*.json

# 3b – Refresh ALS meta data
npm run update-als

# 3c – Re‑ingest movement‑tech videos (if a new HAR is provided)
npm run ingest-movement-videos
```

## 4️⃣ Validation & QA
1. **Schema validation** – `npm run validate-schema` (uses Zod schemas).
2. **Manual spot‑check** – open a few updated legend JSONs and confirm:
   - Ability cooldowns, damage numbers, and descriptions match the official patch.
   - Video URLs are encoded (`%20`) and HTTPS.
3. **Commit checklist** – ensure the following files are staged:
   - `data/legends/*.json`
   - `data/weapons/*.json`
   - `data/meta/als_snapshot_*.json`
   - Any new `*.techniques.videos.json` files.

## 5️⃣ Commit & Tag
```bash
git add data/legends/*.json data/weapons/*.json data/meta/*.json data/legends/*.techniques.videos.json
git commit -m "Patch S27 update – abilities, weapons, meta (2025‑12‑07)"
git tag -a vS27-20251207 -m "Season 27 patch day data"
```

## 6️⃣ Post‑Patch Automation (Optional)
- Trigger CI pipeline to rebuild the app with the new data.
- Send a Slack notification with the commit/tag link.

---

**End of Workflow**
