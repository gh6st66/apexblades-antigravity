// ingest_pick_rates.js
// Parses the markdown table from data_dump/win-pick-rates and saves it as structured JSON.
// This ensures that LLM responses use grounded, local data.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DUMP_PATH = path.resolve(__dirname, '../data_dump/win-pick-rates');
const OUTPUT_PATH = path.resolve(__dirname, '../data/meta/global_pick_rates.json');

function parseMarkdownTable(content) {
    const lines = content.split('\n');
    const tableStartIndex = lines.findIndex(line => line.includes('| Rank | Legend | Pick Rate |') || line.includes('| Rank | Legend | Pick Rate |'));

    if (tableStartIndex === -1) {
        // Try to find the second table (Global Pick Rate)
        const globalHeaderIndex = lines.findIndex(line => line.includes('APEX LEGENDS — LEGEND POPULARITY (GLOBAL PICK RATE)'));
        if (globalHeaderIndex === -1) throw new Error('Could not find global pick rate table in dump file.');

        const subLines = lines.slice(globalHeaderIndex);
        const subTableStart = subLines.findIndex(line => line.includes('| Rank |') || line.includes('|Rank|'));
        if (subTableStart === -1) throw new Error('Could not find table header after the global pick rate title.');

        return extractTable(subLines.slice(subTableStart));
    }

    return extractTable(lines.slice(tableStartIndex));
}

function extractTable(tableLines) {
    const data = [];
    // Skip header and separator
    for (let i = 2; i < tableLines.length; i++) {
        const line = tableLines[i].trim();
        if (!line.startsWith('|')) break;

        const parts = line.split('|').map(p => p.trim()).filter(p => p.length > 0);
        if (parts.length >= 3) {
            data.push({
                rank: parseInt(parts[0], 10),
                legend: parts[1],
                pickRate: parts[2]
            });
        }
    }
    return data;
}

try {
    const content = fs.readFileSync(DUMP_PATH, 'utf8');
    const pickRates = parseMarkdownTable(content);

    const output = {
        last_updated: new Date().toISOString(),
        source: 'data_dump/win-pick-rates',
        data: pickRates
    };

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 4));
    console.log(`✅ Successfully ingested ${pickRates.length} legends into ${OUTPUT_PATH}`);
} catch (error) {
    console.error(`❌ Ingestion failed: ${error.message}`);
    process.exit(1);
}
