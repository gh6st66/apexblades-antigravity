import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

const GROUPED_FILE = path.join(DATA_DIR, 'grouped_tech_urls.json');
const RESULTS_FILE = path.join(DATA_DIR, 'scraped_videos.json');

const args = process.argv.slice(2);
const action = args[0];

if (!fs.existsSync(GROUPED_FILE)) {
    console.error('Grouped file not found!');
    process.exit(1);
}

const groups = JSON.parse(fs.readFileSync(GROUPED_FILE, 'utf-8'));
let results = {};

if (fs.existsSync(RESULTS_FILE)) {
    results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));
}

if (action === 'get_next') {
    const batchSize = 10;
    const pending = groups.filter(g => !results[g.pageUrl]);
    const batch = pending.slice(0, batchSize).map(g => g.pageUrl);

    console.log(JSON.stringify({
        batch: batch,
        remaining: pending.length - batch.length,
        total: groups.length,
        completed: Object.keys(results).length
    }, null, 2));

} else if (action === 'save') {
    // Expecting a JSON string as the second argument containing the batch results
    // Usage: node manage_batch_scraping.js save '{"url": ["vid1", "vid2"]}'
    // Expected to be passed as a file path or via temp file to avoid shell limits.
    // Actually, passing large JSON via CLI args is risky. 
    // Better to read from a temp file or stdin. Let's read from a fixed temp file "temp_batch_results.json"

    const TEMP_FILE = path.join(DATA_DIR, 'temp_batch_results.json');
    if (fs.existsSync(TEMP_FILE)) {
        const rawBatchResults = JSON.parse(fs.readFileSync(TEMP_FILE, 'utf-8'));
        const batchResults = {};
        for (const [key, val] of Object.entries(rawBatchResults)) {
            batchResults[decodeURIComponent(key)] = val;
        }

        results = { ...results, ...batchResults };
        fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
        console.log(`Saved ${Object.keys(batchResults).length} pages. Total completed: ${Object.keys(results).length}`);
        // fs.unlinkSync(TEMP_FILE); 
    } else {
        console.error('Temp results file not found.');
    }
} else if (action === 'status') {
    console.log(`Completed: ${Object.keys(results).length} / ${groups.length}`);
}
