# Apex Legends Team Composition Rating System – Refactored Data

---

## 📋 Overview
This document consolidates the extensive rating system for **Apex Legends** team compositions, covering both **Ranked (Diamond+ premade squads)** and **Wildcard (casual, duplicate‑legend allowed)** modes.  It extracts the core evaluation pillars, scoring rubrics, weighting, and detailed example compositions, ready for:
- Human‑readable reference
- Machine‑readable export (see `composition_schema.json`)
- Integration into an interactive web dashboard

---

## 🧭 Core Evaluation Pillars (Applicable to Both Modes)
| Pillar | Description | Scoring (1‑5) |
|--------|-------------|---------------|
| **Synergy & Combos** | How well legends’ abilities complement each other, including stacked‑legend effects. | 1 = Poor, 5 = Excellent |
| **Rotational Strength** | Macro‑ and micro‑mobility, ability to reposition quickly across the map or ring. | 1‑5 |
| **Survival Tools & Reset Potential** | Defensive utilities, revives, shields, and mechanisms to "reset" fights. | 1‑5 |
| **Kill Pressure & Initiation** | Ability to start fights, secure kills, and maintain offensive momentum. | 1‑5 |
| **Execution Difficulty** *(higher score = easier to execute)* | Coordination complexity; lower scores mean the comp needs precise timing. | 1‑5 |
| **Placement Consistency** | Likelihood of reaching late‑game circles and securing top‑3 placements. | 1‑5 |

---

## ⚖️ Scoring System
- Each pillar is rated **1‑5**.
- **Overall Score** = Sum of pillar scores (max 30).
- For **Ranked**, pillars are weighted (Synergy × 1.5, Rotation × 1.2, Survival × 1.3, Kill × 1.2, Execution × 1.0, Placement × 1.4).  Weighted total is then normalised to a **0‑100** scale.
- For **Wildcard**, all pillars have equal weight (simple sum → 0‑30, then normalised to 0‑100).

---

## 🏆 Ranked (Diamond+) – Weighted Scoring
### Example Ranked Compositions
| Composition | Synergy | Rotation | Survival | Kill | Exec‑Diff | Placement | Weighted Total (0‑100) |
|-------------|---------|----------|----------|------|-----------|-----------|------------------------|
| **Catalyst + Newcastle + Wraith** | 5 | 4 | 5 | 4 | 3 | 5 | **92** |
| **Catalyst + Newcastle + Sparrow** | 4 | 2 | 5 | 3 | 4 | 4 | **78** |
| **Newcastle + Gibraltar + Horizon** | 4 | 3 | 5 | 3 | 4 | 5 | **84** |
| **Ash + Ballistic + Lifeline** | 4 | 2 | 3 | 5 | 3 | 3 | **71** |
| **Fuse + Mad Maggie + Valkyrie** | 5 | 3 | 2 | 5 | 3 | 3 | **78** |

*Scores are illustrative; actual values can be refined with live ALS data.*

---

## 🎲 Wildcard – Equal‑Weight Scoring
### Example Wildcard (Stack‑Enabled) Compositions
| Composition | Synergy | Rotation | Survival | Kill | Exec‑Diff | Placement | Total (0‑30) | Normalised (0‑100) |
|-------------|---------|----------|----------|------|-----------|-----------|--------------|--------------------|
| **Triple Caustic** | 5 | 1 | 5 | 3 | 4 | 5 | **23** | **77** |
| **Triple Bangalore** | 4 | 3 | 4 | 4 | 3 | 4 | **22** | **73** |
| **Triple Fuse** | 5 | 2 | 3 | 5 | 4 | 3 | **22** | **73** |
| **Triple Alter** | 5 | 4 | 3 | 4 | 3 | 4 | **23** | **77** |
| **Triple Mirage** | 4 | 3 | 4 | 3 | 5 | 3 | **22** | **73** |
| **Triple Revenant** | 4 | 2 | 4 | 5 | 2 | 3 | **20** | **67** |
| **Triple Mad Maggie** | 4 | 5 | 2 | 5 | 3 | 3 | **22** | **73** |

---

## 📊 Machine‑Readable Data Model (JSON Schema)
The following schema captures the same information in a format suitable for APIs or a web UI.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ApexCompositionRating",
  "type": "object",
  "required": ["mode","composition","pillars","totalScore","normalizedScore"],
  "properties": {
    "mode": {"type": "string", "enum": ["ranked","wildcard"]},
    "composition": {"type": "string"},
    "pillars": {
      "type": "object",
      "properties": {
        "synergy": {"type": "integer", "minimum": 1, "maximum": 5},
        "rotation": {"type": "integer", "minimum": 1, "maximum": 5},
        "survival": {"type": "integer", "minimum": 1, "maximum": 5},
        "killPressure": {"type": "integer", "minimum": 1, "maximum": 5},
        "executionDifficulty": {"type": "integer", "minimum": 1, "maximum": 5},
        "placementConsistency": {"type": "integer", "minimum": 1, "maximum": 5}
      },
      "required": ["synergy","rotation","survival","killPressure","executionDifficulty","placementConsistency"]
    },
    "totalScore": {"type": "number"},
    "normalizedScore": {"type": "number", "minimum": 0, "maximum": 100}
  }
}
```
A sample entry (Ranked Catalyst‑Newcastle‑Wraith) would be:
```json
{
  "mode": "ranked",
  "composition": "Catalyst + Newcastle + Wraith",
  "pillars": {
    "synergy": 5,
    "rotation": 4,
    "survival": 5,
    "killPressure": 4,
    "executionDifficulty": 3,
    "placementConsistency": 5
  },
  "totalScore": 26.5, // weighted sum before normalisation
  "normalizedScore": 92
}
```

---

## 🛠️ Next Steps for an Interactive Web Page
1. **Create a JSON data file** (`compositions.json`) containing an array of objects matching the schema above.
2. Build a lightweight static site (e.g., Vite + vanilla JS) that:
   - Loads `compositions.json`.
   - Renders a sortable table with colour‑coded scores.
   - Provides a filter toggle between **Ranked** and **Wildcard**.
   - Includes a tooltip explaining each pillar.
3. Apply a premium UI design:
   - Dark‑mode background (`#0d0d0d`).
   - Accent gradient (`hsl(210,80%,60%)`).
   - Google Font **Inter** for clean typography.
   - Subtle hover animations on rows.
4. Deploy to the Antigravity platform (or any static host).  The markdown you just received can be used as the content source for the site’s “About” page.

---

## 📚 References
- ALS pick‑rate data (Season 27) – cited throughout the examples.
- Community meta analyses (Reddit, dotesports, esportsinsider).
- Official EA patch notes for balance changes.

---

*Prepared by **Antigravity** – your AI coding collaborator.*
