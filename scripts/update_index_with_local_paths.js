
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const VIDEOS_DIR = path.join(DATA_DIR, 'videos');
const INDEX_FILE = path.join(DATA_DIR, 'movement_search_index.json');
const URL_MAPPINGS_FILE = path.join(DATA_DIR, 'scraped_videos.json');
const UPDATED_INDEX_FILE = path.join(DATA_DIR, 'movement_search_index_with_videos.json'); // Or overwrite

function main() {
    if (!fs.existsSync(INDEX_FILE) || !fs.existsSync(URL_MAPPINGS_FILE)) {
        console.error('Missing index or mappings file.');
        return;
    }

    const indexData = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
    const mappings = JSON.parse(fs.readFileSync(URL_MAPPINGS_FILE, 'utf-8'));

    // Create a lookup for video filenames to their local paths
    // Actually, we need to map Tech Items -> Video Paths.
    // The mappings are Page URL -> [Video URLs].
    // Tech items have a link to the Page URL (or close to it).

    // Strategy:
    // 1. For each tech item in indexData:
    // 2. Determine its Page URL (using the same logic as group_tech_by_page.js).
    // 3. Look up the video list for that page.
    // 4. Ideally, find a video that matches the tech item's title somewhat?
    //    Or just associate ALL videos from that page to relevant items?
    //    The browser inspection showed titles like "Ghost Strafe" -> "Ghost_Strafe_CM_1.m3u8".
    //    We can try fuzzy matching or inclusion matching.

    // Let's create a map of normalized filename -> true (if exists locally)
    const localVideos = new Set();
    if (fs.existsSync(VIDEOS_DIR)) {
        fs.readdirSync(VIDEOS_DIR).forEach(f => {
            if (f.endsWith('.mp4')) localVideos.add(f);
        });
    }

    // Helper to fuzzy match
    function findBestVideoMatch(techLabel, videoUrls) {
        if (!videoUrls) return null;

        const labelNormalized = techLabel.toLowerCase().replace(/[^a-z0-9]/g, '');

        let bestMatch = null;
        let maxScore = -1;

        for (const url of videoUrls) {
            const filename = path.basename(url, '.m3u8');
            const fileMp4 = filename + '.mp4';

            // Check if we actually have this video locally (optional constraint?)
            // If we haven't downloaded it yet, we might still want to record the URL.
            // But the goal is "local_video_path".

            const filenameNormalized = filename.toLowerCase().replace(/[^a-z0-9]/g, '');

            // Score based on substring match
            let score = 0;
            if (filenameNormalized.includes(labelNormalized) || labelNormalized.includes(filenameNormalized)) {
                score += 10;
            }
            // Length similarity?

            if (score > maxScore && score > 0) {
                maxScore = score;
                bestMatch = fileMp4;
            }
        }

        return bestMatch;
    }

    let updatedCount = 0;

    indexData.forEach(item => {
        // Construct Page URL (reverse of grouping logic)
        let parts = item.href.split('#');
        let pageUrl = 'https://apexmovement.tech' + parts[0];
        // Decode to match keys in mappings
        pageUrl = decodeURIComponent(pageUrl);
        if (pageUrl.endsWith('/')) {
            pageUrl = pageUrl.slice(0, -1);
        }

        // Debug logging for first item
        if (updatedCount === 0 && indexData.indexOf(item) < 5) {
            console.log(`Checking Item: ${item.title}`);
            console.log(`Computed Page URL: ${pageUrl}`);
            console.log(`Has mapping? ${!!mappings[pageUrl]}`);
            if (mappings[pageUrl]) {
                console.log(`Video URLs count: ${mappings[pageUrl].length}`);
                const match = findBestVideoMatch(item.title, mappings[pageUrl]);
                console.log(`Best match: ${match}`);
            }
        }

        const videoUrls = mappings[pageUrl];
        if (videoUrls) {
            const match = findBestVideoMatch(item.title, videoUrls);
            if (match) {
                item.local_video_path = `data/videos/${match}`;
                // Check if it exists
                if (localVideos.has(match)) {
                    item.video_available = true;
                } else {
                    item.video_available = false; // Mapped but not downloaded
                }
                updatedCount++;
            }
        }
    });

    fs.writeFileSync(UPDATED_INDEX_FILE, JSON.stringify(indexData, null, 2));
    console.log(`Updated index saved to ${UPDATED_INDEX_FILE}. matched ${updatedCount} items.`);
}

main();
