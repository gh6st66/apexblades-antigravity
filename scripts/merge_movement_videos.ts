import fs from 'fs';
import path from 'path';

const INDEX_PATH = path.resolve('data/movement_search_index.json');
const VIDEOS_PATH = path.resolve('data/scraped_videos.json');
const OUTPUT_PATH = path.resolve('data/master_movement_data.json');

function main() {
    if (!fs.existsSync(INDEX_PATH)) {
        console.error('Movement index not found at', INDEX_PATH);
        return;
    }
    if (!fs.existsSync(VIDEOS_PATH)) {
        console.error('Scraped videos not found at', VIDEOS_PATH);
        return;
    }

    const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
    const videos = JSON.parse(fs.readFileSync(VIDEOS_PATH, 'utf-8'));

    const masterData = index.map((item: any) => {
        const fullHref = item.href;
        const [baseUrl, hash] = fullHref.split('#');
        const cleanBaseUrl = `https://apexmovement.tech${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}`;

        // Find video URLs for this category
        const categoryVideos = videos[cleanBaseUrl] || [];

        // Try to find a video that matches the title in the filename
        let videoUrl = null;
        if (hash) {
            const searchTag = hash.toLowerCase().replace(/_/g, '');
            videoUrl = categoryVideos.find((v: string) => v.toLowerCase().replace(/%20/g, '').includes(searchTag));
        }

        // Fallback to first video if no specific match
        if (!videoUrl && categoryVideos.length > 0) {
            videoUrl = categoryVideos[0];
        }

        // Filter out 360p duplicates if we have a better one
        if (videoUrl && videoUrl.includes('_360p.m3u8')) {
            const betterUrl = videoUrl.replace('_360p.m3u8', '.m3u8');
            if (categoryVideos.includes(betterUrl)) {
                videoUrl = betterUrl;
            }
        }

        return {
            ...item,
            original_video_url: videoUrl,
            video_available: !!videoUrl
        };
    });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(masterData, null, 2));
    console.log(`Saved master movement data with videos to ${OUTPUT_PATH}`);
}

main();
