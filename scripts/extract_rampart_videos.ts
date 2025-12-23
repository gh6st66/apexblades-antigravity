// scripts/extract_rampart_videos.ts
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type HarEntry = {
    request: { url: string; method: string; headers: { name: string; value: string }[] };
    response: { status: number; content: { mimeType: string; size: number } };
    _resourceType: string;
};

type HarLog = { entries: HarEntry[] };

type Har = { log: HarLog };

type TechniqueVideosFile = {
    legend: string;
    technique_video_refs: Array<{
        technique_id: string;
        name?: string;
        video_refs: string[];
    }>;
};

const TECHNIQUE_MAP: Record<string, string> = {
    "amped_cover_superglide_platform": "Amped Cover Superglide Platform",
    "amped_cover_wall_bounce": "Amped Cover Wall Bounce",
    "amped_cover_wall_run": "Amped Cover Wall Run",
    "wall_boost_speed_vault": "Wall Boost / Speed Vault",
    "fall_stun_cancel": "Fall Stun Cancel",
    "sheila_double_climb": "Sheila Double‑Climb",
    "sheila_mobility_teleport": "Sheila Mobility & Teleport"
};

function safeEncode(url: string): string {
    const https = url.startsWith("http://") ? url.replace(/^http:\/\//, "https://") : url;
    return encodeURI(https);
}

async function main() {
    const harPath = path.resolve(process.cwd(), "apexmovement.tech.har");
    const harRaw = await readFile(harPath, "utf8");
    const har: Har = JSON.parse(harRaw);

    const videoMap: Map<string, Set<string>> = new Map();

    for (const entry of har.log.entries) {
        const url = entry.request.url;
        if (!url.endsWith(".mp4")) continue;
        if (!/rampart/i.test(url)) continue;
        const match = url.match(/rampart[_-]([^_/]+)\.mp4/i);
        if (!match) continue;
        const rawId = match[1].toLowerCase();
        const techniqueId = Object.keys(TECHNIQUE_MAP).find(k => rawId.includes(k)) ?? rawId;
        if (!videoMap.has(techniqueId)) videoMap.set(techniqueId, new Set());
        videoMap.get(techniqueId)!.add(safeEncode(url));
    }

    const output: TechniqueVideosFile = {
        legend: "Rampart",
        technique_video_refs: []
    };

    for (const [id, urlSet] of videoMap.entries()) {
        output.technique_video_refs.push({
            technique_id: id,
            name: TECHNIQUE_MAP[id] ?? id,
            video_refs: Array.from(urlSet)
        });
    }

    const outPath = path.resolve(process.cwd(), "data", "legends", "rampart.techniques.videos.json");
    await writeFile(outPath, JSON.stringify(output, null, 2), "utf8");
    console.log(`✅ Written ${output.technique_video_refs.length} technique entries to ${outPath}`);
}

main().catch(err => {
    console.error("❌ Extraction failed:", err);
    process.exit(1);
});
