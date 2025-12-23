// scripts/validate_schema.js
// Validates the integrity and schema compliance of Legend data and Meta data.

import fs from 'fs';
import path from 'path';

const SCHEMAS_DIR = path.resolve('data/legends/schemas');
const META_DIR = path.resolve('data/meta');

const REQUIRED_LEGEND_FILES = [
    'core.json',
    'decision_profile.json',
    'abilities.json',
    'fight_flow.json',
    'positioning.json',
    'weapon_bias.json',
    'failure_modes.json',
    'mental_rule.json'
];

function validateJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        return true;
    } catch (err) {
        console.error(`❌ Invalid JSON in ${filePath}: ${err.message}`);
        return false;
    }
}

function validateLegends() {
    console.log('\nValidating Legend Schemas...');
    if (!fs.existsSync(SCHEMAS_DIR)) {
        console.log('No schemas directory found.');
        return;
    }

    const legends = fs.readdirSync(SCHEMAS_DIR).filter(file => {
        return fs.statSync(path.join(SCHEMAS_DIR, file)).isDirectory();
    });

    let valid = true;

    legends.forEach(legend => {
        const legendDir = path.join(SCHEMAS_DIR, legend);
        const files = fs.readdirSync(legendDir);

        // Check for missing files
        const missing = REQUIRED_LEGEND_FILES.filter(f => !files.includes(f));
        if (missing.length > 0) {
            console.error(`❌ [${legend}] Missing files: ${missing.join(', ')}`);
            valid = false;
        }

        // Validate JSON content
        REQUIRED_LEGEND_FILES.filter(f => files.includes(f)).forEach(f => {
            if (!validateJsonFile(path.join(legendDir, f))) {
                valid = false;
            }
        });
    });

    if (valid) console.log('✅ All Legend schemas are valid structure and JSON.');
    return valid;
}

function validateMeta() {
    console.log('\nValidating Meta Data...');
    const requiredMeta = ['als_snapshot.json']; // patch_notes and wiki are .html now
    let valid = true;

    if (fs.existsSync(META_DIR)) {
        requiredMeta.forEach(f => {
            const p = path.join(META_DIR, f);
            if (!fs.existsSync(p)) {
                console.warn(`⚠️ Missing meta file: ${f}`);
            } else {
                if (!validateJsonFile(p)) valid = false;
            }
        });
    }
    if (valid) console.log('✅ Meta data JSON checks passed.');
    return valid;
}

function main() {
    const v1 = validateLegends();
    const v2 = validateMeta();

    if (!v1 || !v2) {
        process.exit(1);
    }
}

main();
