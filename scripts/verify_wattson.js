// verify_wattson.js
// Checks that the Wattson cheat card entry has been verified and has source references.
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
const wattson = cards.find(c => c.legend && c.legend.name === 'Wattson');
if (!wattson) {
    console.error('Wattson entry not found in cheat cards.');
    process.exit(1);
}
if (wattson.verified !== true) {
    console.error('Wattson entry is not marked as verified.');
    process.exit(1);
}
if (!Array.isArray(wattson.source) || wattson.source.length === 0) {
    console.error('Wattson entry missing source references.');
    process.exit(1);
}
console.log('✅ Wattson verification passed.');
process.exit(0);
