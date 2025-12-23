
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('data');
const LNKS_FILE = path.join(DATA_DIR, 'wiki_links.json');
const OUT_FILE = path.join(DATA_DIR, 'video_urls_to_check.txt');

// Helper to construct R2 URL from Wiki Link
function transformLinkToVideoUrl(wikiLink) {
    try {
        // format: https://apexmovement.tech/wiki/tech/[PathEncoded]/#[Hash]
        const urlObj = new URL(wikiLink);

        // Extract the relevant path part after /wiki/tech/
        // pathname is like /wiki/tech/General%20Tech%3E...
        const prefix = '/wiki/tech/';
        if (!urlObj.pathname.startsWith(prefix)) return null;

        const rawPath = urlObj.pathname.substring(prefix.length);

        // Decode the path to get real characters (including >)
        // e.g. "General Tech>Fundamentals..."
        let decodedPath = decodeURIComponent(rawPath);
        if (decodedPath.endsWith('/')) {
            decodedPath = decodedPath.slice(0, -1);
        }


        // Replace > with / for directory structure
        const r2Path = decodedPath.replace(/>/g, '/');

        // Get the technique name from the hash (remove #)
        // hash is like #Walk
        const techName = urlObj.hash.substring(1);

        if (!techName) return null; // No technique specified

        // Construct R2 URL
        // We probably need to encode each component of the path, but let's try just standard encoding
        // If the S3/R2 keys have spaces, they need %20.
        // But simply encodeURI(r2Path) would encode / as well if used on the whole string? 
        // No, encodeURI protects /. encodeURIComponent encodes /.
        // So encodeURI(r2Path) should work if the > replacement happened first.

        // Wait, 'Dismounts & Juking'. 
        // decodedPath: "General Tech>Zip Tech>Dismounts & Juking..."
        // r2Path: "General Tech/Zip Tech/Dismounts & Juking..."
        // encodeURI(r2Path): "General%20Tech/Zip%20Tech/Dismounts%20&%20Juking..."
        // This looks correct for a URL.

        const videoUrl = `https://r2.apexmovement.tech/${encodeURI(r2Path)}/${encodeURI(techName)}.m3u8`;
        return videoUrl;
    } catch (e) {
        console.error(`Error processing ${wikiLink}:`, e);
        return null;
    }
}

// Main execution
if (fs.existsSync(LNKS_FILE)) {
    const hooks = JSON.parse(fs.readFileSync(LNKS_FILE, 'utf-8'));
    const videoUrls = hooks.map(transformLinkToVideoUrl).filter(u => u !== null);

    fs.writeFileSync(OUT_FILE, videoUrls.join('\n'));
    console.log(`Generated ${videoUrls.length} potential video URLs.`);

    // Preview first 5
    console.log("Preview:");
    videoUrls.slice(0, 5).forEach(u => console.log(u));
} else {
    console.error("Link file not found:", LNKS_FILE);
}
