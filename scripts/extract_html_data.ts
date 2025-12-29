
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const DATA_DIR = path.join(process.cwd(), 'data');
const ROOT_DIR = process.cwd();

// Define a type for extraction strategies
type ExtractionStrategy = (filePath: string) => void;

function extractMovementWiki(filePath: string) {
    console.log(`Processing Movement Wiki: ${filePath}`);
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        const $ = cheerio.load(htmlContent);

        const data = {
            sidebarLinks: [] as { text: string; href: string }[],
            featuredArticles: [] as { title: string; href: string }[],
        };

        $('aside ul li a').each((_, element) => {
            const text = $(element).find('span').text().trim();
            const href = $(element).attr('href');
            if (text && href) {
                data.sidebarLinks.push({ text, href });
            }
        });

        $('.zoomin a').each((_, element) => {
            const href = $(element).attr('href');
            const title = $(element).find('h1').text().trim();
            if (title && href) {
                data.featuredArticles.push({ title, href });
            }
        });

        const outputPath = path.join(DATA_DIR, 'movement_wiki_data.json');
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Saved Movement Wiki data to ${outputPath}`);

    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

function extractAceLiteCalculator(filePath: string) {
    console.log(`Processing ACE Lite Calculator: ${filePath}`);
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        const $ = cheerio.load(htmlContent);

        interface PillarItem { id: string; label: string; description: string; value: number }
        const pillars: PillarItem[] = [];
        const wildcardFactors: PillarItem[] = [];

        // Extract checkpoints
        $('.checklist-item').each((_, element) => {
            const id = $(element).find('input').attr('id') || `checkpoint-${_}`;
            const label = $(element).find('.checklist-label').text().trim();
            const description = $(element).find('.checklist-desc').text().trim();

            // Heuristic to assign values based on description or default
            let value = 20; // Default weight for pillars
            if (description.includes('+10')) value = 10;
            if (description.includes('+20')) value = 20;

            const item = { id, label, description, value };

            // Separate into standard pillars vs wildcard based on parent container or ID
            if ($(element).closest('#wildCardSection').length > 0) {
                wildcardFactors.push(item);
            } else {
                pillars.push(item);
            }
        });

        // Extract Rank Logic (from script text using Regex)
        const scriptContent = $('script').text();
        const rankLogic = [];
        // Regex to find: if (score >= 100) { rank = 'S-TIER'; verdict = "..." }
        // Updated regex to handle mixed quotes correctly using backreferences
        const rankRegex = /if\s*\(score\s*>=\s*(\d+)\)\s*\{[^}]*rank\s*=\s*(['"])(.*?)\2[^}]*verdict\s*=\s*(['"])(.*?)\4/g;
        let match;
        while ((match = rankRegex.exec(scriptContent)) !== null) {
            rankLogic.push({
                minScore: parseInt(match[1]),
                rank: match[3], // Group 3 is the rank content
                verdict: match[5] // Group 5 is the verdict content
            });
        }
        // Capture the 'else' case manual addition
        rankLogic.push({ minScore: 0, rank: 'F-TIER', verdict: "High-risk composition. Are you trolling or just incredibly confident?" });

        const data = {
            calculatorName: 'ACE Lite',
            pillars,
            wildcardFactors,
            ratingSystem: rankLogic.sort((a, b) => b.minScore - a.minScore)
        };

        const outputPath = path.join(DATA_DIR, 'ace_calculator_data.json');
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Saved ACE Calculator data to ${outputPath}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`❌ extraction failed for ${filePath}:`);
            console.error(error.message);
        } else {
            console.error(`Error processing ${filePath}:`, error);
        }
    }

}

function extractPatchNotes(filePath: string) {
    console.log(`Processing Patch Notes: ${filePath}`);
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        // Check for 404/invalid content
        if (htmlContent.includes('<title>404 - Official EA Site</title>')) {
            console.warn('Skipping patch_notes.html: File indicates a 404 Error - No data to extract.');
            return;
        }

        const $ = cheerio.load(htmlContent);
        interface PatchArticle { title: string; date: string; href: string; img: string }
        const articles: PatchArticle[] = [];

        // Select the main wrapper for news items (Based on observed structure in valid data)
        const newsItems = $('.NewsHub_wrapper__McAtC').children();

        if (newsItems.length === 0) {
            console.warn('No news items found with selector .NewsHub_wrapper__McAtC');
        }

        newsItems.each((_, element) => {
            const el = $(element);

            // Extract Link
            const anchor = el.find('a');
            let href = anchor.attr('href') || '';
            if (href.startsWith('/')) {
                href = `https://www.ea.com${href}`; // Handle relative URLs
            }

            // Extract Title
            const title = el.find('h3').text().trim();

            // Extract Date (using the span immediately preceding the H3 or searching within the body wrapper)
            // The structure is usually: Tag(div) -> Date(span) -> Title(h3)
            let date = '';
            // Try explicit class generic match if possible, or relative position
            const bodyWrapper = el.find('[class*="Card_bodyWrapper"]');
            if (bodyWrapper.length) {
                // Find the span that is a direct child usually
                date = bodyWrapper.children('span').text().trim();
            }

            // Extract Image
            const img = el.find('img').attr('src') || '';

            // Filter out empty items
            if (title && href) {
                articles.push({
                    title,
                    date,
                    href,
                    img
                });
            }
        });

        const outputPath = path.join(DATA_DIR, 'patch_notes.json');
        fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2));
        console.log(`Saved ${articles.length} patch notes to ${outputPath}`);

    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}


// map of filenames to strategies
const strategies: Record<string, ExtractionStrategy> = {
    'movement_wiki.html': extractMovementWiki,
    'patch_notes.html': extractPatchNotes,
    'ace_lite_calculator.html': extractAceLiteCalculator
};

function main() {
    // 1. Look in data/meta
    if (fs.existsSync(path.join(DATA_DIR, 'meta'))) {
        const metaFiles = fs.readdirSync(path.join(DATA_DIR, 'meta'));
        metaFiles.forEach(file => {
            if (strategies[file]) {
                strategies[file](path.join(DATA_DIR, 'meta', file));
            }
        });
    }

    // 2. Look in docs/prototypes for ace_lite_calculator.html
    const prototypePath = path.join(ROOT_DIR, 'docs', 'prototypes', 'ace_lite_calculator.html');
    if (fs.existsSync(prototypePath)) {
        extractAceLiteCalculator(prototypePath);
    }
}

main();
