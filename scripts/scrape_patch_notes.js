// scripts/scrape_patch_notes.js
// Real implementation: fetch Apex Legends patch notes page and store raw HTML.
// This simple version downloads the HTML content and saves it to data/meta/patch_notes.html.

import fs from 'fs';
import path from 'path';
import https from 'https';

async function fetchPatchNotes(url = 'https://www.ea.com/games/apex-legends/news') {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000 // 10 seconds timeout
        };

        const req = https.get(url, options, res => {
            // Handle redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                console.log(`Redirecting to ${res.headers.location}...`);
                fetchPatchNotes(res.headers.location).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Request failed with status code ${res.statusCode}`));
                return;
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });

        req.on('error', err => reject(err));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timed out'));
        });
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
