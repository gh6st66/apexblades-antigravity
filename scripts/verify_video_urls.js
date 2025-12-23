import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const index = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'movement_search_index.json'), 'utf-8'));

// Filter for only tech items
const techItems = index.filter(item => item.href && item.href.startsWith('/wiki/tech/'));

// Take first 3 items to test
const testItems = techItems.slice(0, 3);

function checkUrl(url) {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD' }, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', () => resolve({ url, status: 'ERROR' }));
        req.end();
    });
}

async function main() {
    for (const item of testItems) {
        console.log(`\nTesting for item: "${item.title}"`);
        console.log(`Href: ${item.href}`);

        // Parse href
        // format: /wiki/tech/Primary>Secondary>Tertiary>Article/#Anchor
        const rawPath = item.href.replace('/wiki/tech/', '');
        const [pathStr, anchor] = rawPath.split('/#');
        const parts = pathStr.split('>');

        // Construct candidates
        // Based on previous findings, the URL structure is likely mirroring the path structure
        // URL encoded path components

        const basePath = parts.map(p => encodeURIComponent(p)).join('/');
        const anchorName = anchor; // Usually snake_case
        const titleName = item.title; // Usually Normal Case

        const candidates = [
            `https://r2.apexmovement.tech/${basePath}/${anchorName}.m3u8`,
            `https://r2.apexmovement.tech/${basePath}/${encodeURIComponent(titleName)}.m3u8`,
            `https://r2.apexmovement.tech/${basePath}/${anchorName}.mp4`,
            // Try removing the last path component if it matches the one before (deduplication)
            // e.g. .../Advanced Slide Tech/Advanced Slide Tech/... -> .../Advanced Slide Tech/...
        ];

        // If last two parts are same
        if (parts.length >= 2 && parts[parts.length - 1] === parts[parts.length - 2]) {
            const dedupedParts = parts.slice(0, -1);
            const dedupedBasePath = dedupedParts.map(p => encodeURIComponent(p)).join('/');
            candidates.push(`https://r2.apexmovement.tech/${dedupedBasePath}/${anchorName}.m3u8`);
        }

        for (const url of candidates) {
            const result = await checkUrl(url);
            console.log(`[${result.status}] ${result.url}`);
            if (result.status === 200) {
                console.log('!!! FOUND VALID URL !!!');
            }
        }
    }
}

main();
