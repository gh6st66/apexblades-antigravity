
import { exec } from 'child_process';
import * as util from 'util';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const execAsync = util.promisify(exec);

async function runScript(scriptName: string, description: string) {
    console.log(`\n--- ${description} (${scriptName}) ---`);
    try {
        const { stdout, stderr } = await execAsync(`node scripts/${scriptName}`);
        if (stdout) console.log(stdout.trim());
        if (stderr) console.error(stderr.trim());
        console.log(`✅ ${scriptName} completed.`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`❌ ${scriptName} failed:`);
            console.error(error.message);
        }
    }
}

async function runTsScript(scriptName: string, description: string) {
    console.log(`\n--- ${description} (${scriptName}) ---`);
    try {
        const { stdout, stderr } = await execAsync(`npx ts-node scripts/${scriptName}`);
        if (stdout) console.log(stdout.trim());
        if (stderr) console.error(stderr.trim());
        console.log(`✅ ${scriptName} completed.`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`❌ ${scriptName} failed:`);
            console.error(error.message);
        }
    }
}

async function main() {
    console.log('🚀 Starting Data Refresh Pipeline...');

    // 1. Ingest/Scrape Raw Data
    await runScript('ingest_movement_videos.js', 'Fetching Movement Wiki');
    await runScript('scrape_patch_notes.js', 'Fetching Patch Notes (News Page)');

    // 2. Fetch API Data (if key exists)
    if (process.env.ALS_API_KEY) {
        await runScript('update_als.js', 'Fetching Apex Legends Status Data');
    } else {
        console.log('\n⚠️ Skipping ALS fetch: ALS_API_KEY not found in env.');
    }

    // 3. Process/Extract Data
    await runTsScript('extract_html_data.ts', 'Extracting Structured Data from HTML');
    await runScript('validate_schema.js', 'Validating Data Schema'); // Assuming this exists or is useful

    console.log('\n✨ Data Refresh Pipeline Complete! ✨');
}

main();
