
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const VIDEOS_DIR = path.join(DATA_DIR, 'videos');
const URL_MAPPINGS_FILE = path.join(DATA_DIR, 'scraped_videos.json');

if (!fs.existsSync(VIDEOS_DIR)) {
    fs.mkdirSync(VIDEOS_DIR, { recursive: true });
}

// Concurrency limit
const CONCURRENCY = 3;

async function downloadVideo(url) {
    const filename = path.basename(url, '.m3u8') + '.mp4';
    const outputPath = path.join(VIDEOS_DIR, filename);

    if (fs.existsSync(outputPath)) {
        console.log(`Skipping existing: ${filename}`);
        return { url, path: outputPath, status: 'skipped' };
    }

    console.log(`Downloading: ${filename} from ${url}`);

    return new Promise((resolve, reject) => {
        const ffmpeg = spawn('ffmpeg', [
            '-i', url,
            '-c', 'copy', // Copy stream without re-encoding (fastest)
            '-bsf:a', 'aac_adtstoasc', // Fix audio stream for mp4 container if needed
            outputPath
        ]);

        ffmpeg.on('close', (code) => {
            if (code === 0) {
                console.log(`Completed: ${filename}`);
                resolve({ url, path: outputPath, status: 'downloaded' });
            } else {
                console.error(`Failed: ${filename} (Exit code ${code})`);
                // Cleanup partial file
                if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
                resolve({ url, error: `Exit code ${code}`, status: 'failed' });
            }
        });

        ffmpeg.on('error', (err) => {
            console.error(`Error spawning ffmpeg for ${filename}:`, err);
            resolve({ url, error: err.message, status: 'failed' });
        });
    });
}

function chunkArray(array, size) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
}

async function main() {
    if (!fs.existsSync(URL_MAPPINGS_FILE)) {
        console.error(`Mappings file not found: ${URL_MAPPINGS_FILE}`);
        return;
    }

    const mappings = JSON.parse(fs.readFileSync(URL_MAPPINGS_FILE, 'utf-8'));

    // Extract unique video URLs
    const uniqueUrls = new Set();
    Object.values(mappings).forEach(videoList => {
        videoList.forEach(url => uniqueUrls.add(url));
    });

    const urlList = Array.from(uniqueUrls);
    console.log(`Found ${urlList.length} unique videos to download.`);

    // Process in chunks (concurrency)
    const chunks = chunkArray(urlList, CONCURRENCY);

    for (const chunk of chunks) {
        await Promise.all(chunk.map(url => downloadVideo(url)));
    }

    console.log('All downloads finished.');
}

main();
