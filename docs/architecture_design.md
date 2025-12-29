# ApexLegends.tech Data Architecture

To handle the vast and complex data required for an elite Apex Legends dashboard (techniques, live stats, patch history, weapon metas), we should follow a **Pre-Build Aggregation + Modular Consumption** strategy.

## 1. Automated Data Pipeline (The "Forge")
Instead of the frontend making complex calculations or multiple API calls at runtime, we perform these during a "refresh" phase.

- **Scripts Layer**: Continue using the `scripts/` directory for discrete tasks:
    - `fetch_als.ts`: Pulls live map/player data.
    - `extract_wiki.ts`: Parses movement mechanics.
    - `analyze_meta.ts`: (Proposed) Calculates weapon rankings based on patch notes.
- **Normalization**: Every script must output to a strictly typed JSON schema in `data/meta/`.
- **Master Aggregator**: A final script (like `merge_movement_videos.ts`) that compiles these into a single `master_db.json`.

## 2. Calculation Engine (The "Brain")
For complex calculations (e.g., "how much recoil reduction does this attachment give?"), we use two levels:

- **Static Calculations**: Done during the script phase. Save the result (e.g., `effective_dps`) directly in the JSON.
- **Dynamic Utilities**: In `src/utils/`, create pure functions that take raw data and return formatted metrics. This keeps components "dumb" and focused on rendering.

## 3. Modular Display Layer (The "HUD")
The UI should be a collection of "Slices" that consume the Master Data.

### Proposed Component Hierarchy:
- **`DataProvider` (Context)**: A single React Context that loads the `master_db.json` once and provides it to the whole app.
- **`DashboardGrid`**: A CSS Grid/Masonry layout that hosts:
    - **`LiveStatusSlice`**: Real-time map/store.
    - **`TechniqueSlice`**: The library we just built.
    - **`MetaAnalyzerSlice`**: Charts/Tables for weapon/hero data.

## 4. Scalability Path
- **Phase 1 (Current)**: Local JSON files. Fast, easy to version control, and works great for static sites.
- **Phase 2**: If data grows >10MB, move to a **SQLite/IndexDB** edge database or a lightweight backend (Node/Fastify).
- **Phase 3**: Full Headless CMS or specialized Game Data API.

---

### Suggested Next Steps:
1. **Consolidate `loadWikiData` and `loadMasterMovementData`** into a unified `useData` hook.
2. **Implement a Search/Filter Engine** in the `Technique Library` to handle hundreds of items efficiently.
3. **Add Data Visualization**: Use a library like `Recharts` to display recoil patterns or legend pick rates.
