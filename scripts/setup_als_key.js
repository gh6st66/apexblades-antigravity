// scripts/setup_als_key.js
// specific-task: Automate the storage and validation of the ALS API Key.

import fs from 'fs';
import path from 'path';
import https from 'https';
import readline from 'readline';

const ENV_FILE = path.resolve('.env');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function validateKey(apiKey) {
    console.log('Validating key...');
    const url = `https://api.mozambiquehe.re/bridge?auth=${apiKey}&version=5`;

    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    // Even 200 checks might require parsing to see if it's an error message disguised as JSON
                    try {
                        const json = JSON.parse(data);
                        if (json.Error) {
                            reject(new Error(json.Error));
                        } else {
                            resolve(true);
                        }
                    } catch (e) {
                        resolve(true); // If it's 200 but not JSON, we assume it might be working or a different endpoint structure, but bridge usually returns JSON.
                    }
                } else {
                    reject(new Error(`API responded with status ${res.statusCode}`));
                }
            });
        }).on('error', err => reject(err));
    });
}

function updateEnvFile(key) {
    let content = '';
    if (fs.existsSync(ENV_FILE)) {
        content = fs.readFileSync(ENV_FILE, 'utf8');
    }

    // Remove existing key if present
    const lines = content.split('\n').filter(line => !line.startsWith('ALS_API_KEY='));
    lines.push(`ALS_API_KEY=${key}`);

    console.log(`Writing to ${ENV_FILE}...`);
    fs.writeFileSync(ENV_FILE, lines.join('\n').trim() + '\n');
}

async function main() {
    console.log('\n--- Apex Legends Status (ALS) API Setup ---\n');
    console.log('1. Go to https://api.mozambiquehe.re/getkey');
    console.log('2. Register your project (e.g., "ApexBlades Agent").');
    console.log('3. Copy the API Key generated.\n');

    const key = await askQuestion('Packet/Paste your API Key here: ');
    const cleanKey = key.trim();

    if (!cleanKey) {
        console.error('Key cannot be empty.');
        rl.close();
        return;
    }

    try {
        await validateKey(cleanKey);
        console.log('✅ Key validated via API!');
        updateEnvFile(cleanKey);
        console.log('✅ Key saved to .env file.');
        console.log('\nYou can now run: npm run update-als');
    } catch (err) {
        console.error(`❌ Key validation failed: ${err.message}`);
        console.log('Please check that you copied the key correctly and try again.');
    }

    rl.close();
}

main();
