// scripts/update_als.js
// Real implementation: fetch Apex Legends Status (ALS) data via public API.
// Requires an ALS API key set in the environment variable ALS_API_KEY.

import fs from 'fs';
import path from 'path';
import https from 'https';

async function fetchALS() {
    const apiKey = process.env.ALS_API_KEY;
    if (!apiKey) throw new Error('Missing ALS_API_KEY environment variable');

    const endpoints = {
        mapRotation: `https://api.mozambiquehe.re/maprotation?auth=${apiKey}&version=2`,
        predator: `https://api.mozambiquehe.re/predator?auth=${apiKey}`
    };

    const results = {};

    for (const [key, url] of Object.entries(endpoints)) {
        console.log(`Fetching ${key}...`);
        results[key] = await new Promise((resolve, reject) => {
            https.get(url, res => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        resolve(json);
                    } catch (e) {
                        console.error(`Error parsing ${key}:`, data);
                        reject(e);
                    }
                });
            }).on('error', reject);
        });
    }
    return results;
}

async function main() {
    console.log('Fetching ALS data...');
    try {
        const alsData = await fetchALS();
        const outPath = path.resolve('data/meta/als_snapshot.json');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, JSON.stringify(alsData, null, 2));
        console.log('Wrote ALS data to', outPath);
    } catch (err) {
        console.error('Failed to fetch ALS data:', err);
        process.exit(1);
    }
}

main();
