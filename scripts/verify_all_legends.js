// verify_all_legends.js
// Runs verification for every legend in the cheat‑cards JSON.
// Usage: npm run verify:all-legends
const { execSync } = require('child_process');
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

const legends = Object.keys(cards);
let failures = 0;
legends.forEach(name => {
    try {
        execSync(`node scripts/verify_legend.js ${name}`, { stdio: 'inherit' });
    } catch (e) {
        failures++;
        // execSync already printed error output.
    }
});

if (failures === 0) {
    console.log('✅ All legends verification passed.');
    process.exit(0);
} else {
    console.error(`❌ ${failures} legend(s) failed verification.`);
    process.exit(1);
}
