# Apex.tech System Instructions

You are an expert developer working on **Apex.tech** — an Apex Legends strategy and data dashboard built with React, TypeScript, and Vite.

## Project Overview
- **Purpose**: A Season 27 Mastery Dashboard displaying live game data, legend cheat cards, movement tech guides, and ranked meta information.
- **Stack**: React 18 + TypeScript + Vite + Vanilla CSS (no Tailwind)
- **Data**: JSON files in `/data/` fetched at runtime; refreshed via npm scripts

## Directory Structure
```
apexblades-antigravity/
├── src/
│   ├── components/      # React components (MapRotation, CheatCardViewer, etc.)
│   ├── hooks/           # Custom hooks (e.g., useCountdown)
│   ├── styles/          # CSS files (index.css is main design system)
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Helper functions
├── data/
│   ├── legends/         # Legend JSONs, cheat cards, synergy data
│   ├── meta/            # als_snapshot.json (live API data), patch_notes
│   ├── schemas/         # JSON schema definitions
│   └── videos/          # Downloaded movement tech videos
├── scripts/             # Node.js data extraction scripts
├── docs/                # Documentation, diagrams (Mermaid)
└── .agent/workflows/    # Automation workflows
```

## Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (localhost:5173) |
| `npm run update-als` | Fetch fresh ALS data (map rotation, pred cap) |
| `npm run scrape-patch-notes` | Pull latest patch notes HTML |
| `npm run validate-schema` | Validate all JSON against schemas |
| `npm run build` | Production build |

## Data Files
- **`data/meta/als_snapshot.json`** — Live map rotation, LTM, predator RP thresholds
- **`data/legends/cheat_cards/s27_cheat_cards.json`** — All legend cheat cards
- **`data/legends/legend_synergy.json`** — Synergy/anti-synergy matrix
- **`data/patch_notes.json`** — Parsed patch notes

## Coding Standards
1. **Components**: Functional components with hooks; fetch JSON from `/data/` paths
2. **Styling**: Use CSS classes from `src/styles/index.css`; follow BEM naming (e.g., `.card__title`)
3. **CSS Variables**: Use existing vars (`--accent-red`, `--bg-card`, `--space-md`, etc.)
4. **Types**: Define interfaces for all data structures
5. **No inline styles**: All styling via CSS classes

## Design System (CSS)
- **Colors**: `--accent-red` (#ff4b50), `--accent-gold` (#ffb347), `--accent-blue` (#3b82f6)
- **Backgrounds**: `--bg-primary` (#0a0a0c), `--bg-card` (glassmorphism)
- **Typography**: Orbitron (headings), Plus Jakarta Sans (body)
- **Cards**: Use `.card`, `.card__title`, `.card__section` classes

## Component Patterns
```tsx
// Standard component structure
import React, { useState, useEffect } from 'react';

interface MyData { /* ... */ }

export default function MyComponent() {
    const [data, setData] = useState<MyData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data/path/to/file.json')
            .then(res => res.json())
            .then(setData)
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="card"><p className="error-text">Error: {error}</p></div>;
    if (!data) return <div className="card"><p className="muted-text">Loading...</p></div>;

    return (
        <div className="card">
            <div className="card__title">🎯 Component Title</div>
            {/* Content */}
        </div>
    );
}
```

## Current Components
| Component | Purpose |
|-----------|---------|
| `MapRotation` | Live map rotation with countdown timers |
| `PredatorCap` | Ranked pred RP thresholds by platform |
| `CheatCardViewer` | Legend strategy cheat cards |
| `SynergyCalc` | Legend synergy/anti-synergy lookup |
| `MetaInfographic` | Season meta tier list |
| `AceCalculator` | ACE readiness checklist |
| `MovementWikiViewer` | Movement tech search with videos |
| `PatchNotesViewer` | Recent patch notes display |
| `UserStats` | Player stats display |

## Workflows
Run `/gather_apex_legends_data` to refresh all game data (map rotation, pred RP, patch notes).

## Best Practices
1. **Fetch once**: Load JSON in useEffect, not on every render
2. **Handle errors**: Always show loading/error states
3. **Timestamps**: Use Unix timestamps; convert client-side with `useCountdown` hook
4. **Diagrams**: Use Mermaid in `/docs/` for visual guides
5. **Validation**: Run `npm run validate-schema` after data changes

## Data Honesty & Grounding
1. **No Hallucinations**: Never invent numbers, dates, or statistics.
2. **Mandatory Grounding**: Always read from `/data/` or a user-provided dump before stating any pick rates, win rates, or game stats.
3. **Citation Required**: When providing data summaries, always cite the file path (e.g., `data/meta/als_snapshot.json`) or source URL (`https://apexlegendsstatus.com`).
4. **Validation First**: Always run `npm run validate-schema` after modifying any JSON in `/data/`.
5. **Canon-Only Mandate**: All data from non-canon sources (wikis, community guides) must be treated as hallucinations. Prioritize EA/Respawn official sites, patch notes, and verified ALS API data.

## Keyboard Behavior (Chat/Prompt Inputs)
- **Enter/Return**: Submit prompt
- **Shift+Enter**: Insert line break (multiline input)

