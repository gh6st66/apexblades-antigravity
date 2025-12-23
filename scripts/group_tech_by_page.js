import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const index = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'movement_search_index.json'), 'utf-8'));

// Group by page URL
const pages = {};

index.forEach(item => {
    if (item.href && item.href.startsWith('/wiki/tech/')) {
        const parts = item.href.split('/#');
        const pageUrl = 'https://apexmovement.tech' + parts[0];
        const anchor = parts.length > 1 ? parts[1] : null;

        if (!pages[pageUrl]) {
            pages[pageUrl] = {
                pageUrl: pageUrl,
                items: []
            };
        }

        pages[pageUrl].items.push({
            title: item.title,
            anchor: anchor,
            href: item.href,
            original_data: item
        });
    }
});

const groupedData = Object.values(pages);

fs.writeFileSync(path.join(DATA_DIR, 'grouped_tech_urls.json'), JSON.stringify(groupedData, null, 2));

console.log(`Grouped ${index.length} items into ${groupedData.length} unique pages.`);
console.log(`Saved to ${path.join(DATA_DIR, 'grouped_tech_urls.json')}`);
