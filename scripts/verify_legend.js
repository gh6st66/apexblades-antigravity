// verify_legend.js
// Generic verification script for a legend cheat‑card entry.
// Usage: LEGEND=Wattson node scripts/verify_legend.js
// Or: node scripts/verify_legend.js <legendName>
const fs = require('fs');
const path = require('path');

const cheatCardsPath = path.resolve(__dirname, '..', 'data', 'legends', 'cheat_cards', 's27_cheat_cards.json');
let raw;
try {
    raw = fs.readFileSync(cheatCardsPath, 'utf8');
} catch (e) {
    console.error('Failed to read cheat cards JSON:', e.message);
    process.exit(1);
}
let cards;
try {
    cards = JSON.parse(raw);
} catch (e) {
    console.error('Invalid JSON in cheat cards file:', e.message);
    process.exit(1);
}

// Determine legend name from env var or first CLI argument
const legendName = process.env.LEGEND || process.argv[2];
if (!legendName) {
    console.error('Please provide a legend name via LEGEND env var or as an argument.');
    process.exit(1);
}

const entry = cards[legendName.toLowerCase()] || cards[legendName];
if (!entry) {
    console.error(`Legend "${legendName}" not found in cheat cards.`);
    process.exit(1);
}

if (entry.verified !== true) {
    console.error(`Legend "${legendName}" is not marked as verified.`);
    process.exit(1);
}
if (!Array.isArray(entry.source) || entry.source.length === 0) {
    console.error(`Legend "${legendName}" missing source references.`);
    process.exit(1);
}

console.log(`✅ Legend "${legendName}" verification passed.`);
process.exit(0);
