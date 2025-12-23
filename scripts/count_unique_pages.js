import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const index = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'movement_search_index.json'), 'utf-8'));

const uniquePages = new Set();
index.forEach(item => {
    if (item.href && item.href.startsWith('/wiki/tech/')) {
        const parts = item.href.split('/#');
        if (parts.length > 0) {
            uniquePages.add(parts[0]);
        }
    }
});

console.log(`Total items: ${index.length}`);
console.log(`Unique Category Pages: ${uniquePages.size}`);
console.log([...uniquePages].sort().join('\n'));
