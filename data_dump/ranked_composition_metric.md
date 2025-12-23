# Ranked‑Only Team Composition Rating System (Season 27 “Amped”)

---

## 🎯 Goal
Create a **quantitative, reproducible metric** to evaluate **full‑premade 3‑stack squads** in **Diamond+ Ranked** Apex Legends matches. The system blends data‑driven insights (ALS pick/win rates, pro‑meta) with expert weighting of six core pillars.

---

## 📊 Core Pillars & Weighting (total = 100 pts)
| Pillar | Description | Weight |
|--------|-------------|--------|
| **Synergy & Combos** | How well the legends’ abilities amplify each other (e.g., Catalyst + Newcastle + Wraith wall + portal + shield). | **25 pts** |
| **Rotational Strength** | Macro‑ and micro‑mobility (portals, ult‑mobility, map‑tool reliance). | **20 pts** |
| **Survival / Reset Potential** | Defensive utilities, revive safety, shield/health buffers, and ability to reset fights. | **20 pts** |
| **Kill Pressure & Initiation** | Ability to create and close fights, damage burst, and crowd‑control. | **15 pts** |
| **Execution Difficulty** *(inverse)* | How easy the comp is to run for a typical Diamond‑player squad. Lower difficulty = higher score. | **10 pts** |
| **Placement Consistency** | Likelihood of reaching top‑3 placements consistently (end‑game durability). | **10 pts** |

---

## 📏 Scoring Method
1. **Rate each pillar 1‑5** (1 = poor, 5 = excellent).  
2. Multiply by the pillar weight factor (Weight ÷ 5).  
3. Sum the six results → **0‑100** overall rating.

**Formula (example for Synergy):**
```
SynergyScore = (SynergyRating / 5) * 25
```
Do this for every pillar and add them together.

---

## 🛠️ Example Evaluation – **Catalyst + Newcastle + Wraith**
| Pillar | Rating (1‑5) | Weighted Score |
|--------|--------------|----------------|
| Synergy & Combos | 5 (wall + shield + portal chain) | (5/5)*25 = **25** |
| Rotational Strength | 4 (Wraith portal + Newcastle wall‑leap) | (4/5)*20 = **16** |
| Survival / Reset | 5 (double‑layered shield + revive safety) | (5/5)*20 = **20** |
| Kill Pressure & Initiation | 4 (Wraith initiates, Catalyst + Newcastle provide safe push) | (4/5)*15 = **12** |
| Execution Difficulty | 3 (requires timed portal + wall + revive) | (3/5)*10 = **6** |
| Placement Consistency | 5 (high‑end‑game survivability) | (5/5)*10 = **10** |
| **Total** | — | **89 / 100** |

**Interpretation:** 89 pts → *Elite* (top‑tier Diamond+ composition).  Scores ≥ 80 are considered **elite**, 65‑79 **strong**, 45‑64 **viable**, < 45 **sub‑optimal**.

---

## 📁 JSON Schema (machine‑readable)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "RankedCompositionRating",
  "type": "object",
  "required": ["composition","ratings","totalScore"],
  "properties": {
    "composition": {
      "type": "array",
      "description": "Ordered list of legend names (3‑stack).",
      "items": {"type": "string"},
      "minItems": 3,
      "maxItems": 3
    },
    "ratings": {
      "type": "object",
      "properties": {
        "synergy": {"type": "integer", "minimum": 1, "maximum": 5},
        "rotation": {"type": "integer", "minimum": 1, "maximum": 5},
        "survival": {"type": "integer", "minimum": 1, "maximum": 5},
        "killPressure": {"type": "integer", "minimum": 1, "maximum": 5},
        "execution": {"type": "integer", "minimum": 1, "maximum": 5},
        "placement": {"type": "integer", "minimum": 1, "maximum": 5}
      },
      "required": ["synergy","rotation","survival","killPressure","execution","placement"]
    },
    "totalScore": {
      "type": "number",
      "description": "Overall rating out of 100 after weighting.",
      "minimum": 0,
      "maximum": 100
    }
  }
}
```

---

## 🚀 How to Use
1. **Collect data** – ALS pick‑rate, win‑rate, pro‑match frequencies for the three legends.
2. **Assign pillar ratings** – based on the qualitative guidelines above.
3. **Run the formula** – either manually or via a tiny script that consumes the JSON schema.
4. **Compare** – higher totalScore → more reliable Diamond+ squad.

---

## 📚 Sources (as of Season 27)
- **Apex Legends Status** – pick‑rate & win‑rate data for Diamond+.
- **AL‑Legends.gg** – pro‑team composition trends.
- **Esports Insider** – patch‑note analysis of Valkyrie, Horizon, Catalyst, Newcastle.
- **Community tier‑lists** – used only as tie‑breakers.

---

*This metric system is deliberately **ranked‑only**; a separate, lighter‑weight version can be derived for Wildcard by adjusting weights (e.g., higher emphasis on kill pressure, lower on placement consistency).*
