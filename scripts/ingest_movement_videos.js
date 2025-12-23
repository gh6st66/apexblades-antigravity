// scripts/ingest_movement_videos.js
// Real implementation: fetch Apex Movement Wiki page and store raw HTML.
// This simple version downloads the HTML content and saves it to data/meta/movement_wiki.html.

import fs from 'fs';
import path from 'path';
import https from 'https';

async function fetchWiki() {
    const url = 'https://apexmovement.tech/wiki';
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', err => reject(err));
    });
}

async function main() {
    console.log('Fetching Apex Movement Wiki...');
    try {
        const html = await fetchWiki();
        const outPath = path.resolve('data/meta/movement_wiki.html');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);
        console.log('Saved wiki HTML to', outPath);
    } catch (err) {
        console.error('Failed to fetch wiki:', err);
        process.exit(1);
    }
}

main();
