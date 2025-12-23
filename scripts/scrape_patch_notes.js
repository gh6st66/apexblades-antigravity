// scripts/scrape_patch_notes.js
// Real implementation: fetch Apex Legends patch notes page and store raw HTML.
// This simple version downloads the HTML content and saves it to data/meta/patch_notes.html.

import fs from 'fs';
import path from 'path';
import https from 'https';

async function fetchPatchNotes() {
    const url = 'https://www.ea.com/games/apex-legends/news/patch-notes';
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', err => reject(err));
    });
}

async function main() {
    console.log('Fetching Apex Legends patch notes...');
    try {
        const html = await fetchPatchNotes();
        const outPath = path.resolve('data/meta/patch_notes.html');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);
        console.log('Saved patch notes HTML to', outPath);
    } catch (err) {
        console.error('Failed to fetch patch notes:', err);
        process.exit(1);
    }
}

main();
