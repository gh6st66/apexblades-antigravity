import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

async function main() {
    try {
        const chunk1 = fs.readFileSync(path.join(DATA_DIR, 'chunk1.txt'), 'utf-8').trim();
        const chunk2 = fs.readFileSync(path.join(DATA_DIR, 'chunk2.txt'), 'utf-8').trim();
        const chunk3 = fs.readFileSync(path.join(DATA_DIR, 'chunk3.txt'), 'utf-8').trim();

        let fullString = chunk1;

        // Patch Seam 1
        if (chunk1.endsWith('}') && chunk2.startsWith('_category')) {
            console.log('Patching Seam 1...');
            fullString += ',{"primary' + chunk2;
        } else {
            fullString += chunk2;
        }

        // Patch Seam 2 (seems fine, but just in case)
        fullString += chunk3;

        // Attempt to parse
        const data = JSON.parse(fullString);
        console.log(`Successfully parsed search index. Total items: ${data.length}`);

        const techItems = data.filter(item => item.href && item.href.startsWith('/wiki/tech/'));
        const articleItems = data.filter(item => item.href && item.href.startsWith('/articles/'));

        console.log(`Tech items: ${techItems.length}`);
        console.log(`Article items: ${articleItems.length}`);

        fs.writeFileSync(path.join(DATA_DIR, 'movement_search_index.json'), JSON.stringify(data, null, 2));
        console.log(`Saved full index to ${path.join(DATA_DIR, 'movement_search_index.json')}`);

    } catch (error) {
        console.error('Error reassembling chunks:', error);
    }
}

main();
