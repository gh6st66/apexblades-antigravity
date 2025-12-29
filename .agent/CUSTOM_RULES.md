# Apex.tech Agent Customization Rules

These rules are enforced to maintain data integrity, design consistency, and visual excellence within the Apex.tech workspace.

### 1. Zero-Trust Numerical Policy
**Rule**: Any response involving game statistics (pick rates, win rates, RP thresholds) must start by performing a `grep_search` or `view_file` on the `/data` directory.
- **Goal**: Prevent hallucinations in meta-reports.
- **Enforcement**: Cite the local file path (e.g., `data/meta/global_pick_rates.json`) as the primary source of truth.

### 2. Design System Strictness (BEM & Vanilla CSS)
**Rule**: All UI styling must be implemented via external CSS files using the BEM (Block Element Modifier) naming convention.
- **Goal**: Avoid code bloat and maintain a unified "Flash UI" aesthetic.
- **Constraint**: **NO Tailwind CSS** or inline styles unless explicitly requested for a quick prototype. Use existing CSS variables from `src/styles/index.css`.

### 3. High-Fidelity Asset Requirement
**Rule**: Never use placeholder text (lorem ipsum) or generic stock image URLs for dashboard components.
- **Goal**: Ensure every preview feels like a "premium" product.
- **Action**: Use the `generate_image` tool to create specific assets (e.g., "Neon Wattson Portrait") or fetch real metadata for data-driven UI components.

### 4. Canon-Only Mandate
**Rule**: All data collected from non-canon sources must be treated as hallucinations or false. "Canon" is strictly limited to:
- Official EA/Respawn sites & patch notes.
- Verified API data (e.g., ApexLegendsStatus/ALS).
- Verified game file data (datamining).
**Action**: If a source is a community wiki, tier list, or unverified social media post, it MUST be flagged as "Non-Canon/Speculative" and excluded from the dashboard's "Official" stats.
