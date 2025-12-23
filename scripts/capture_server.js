import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3001;
const FILE_PATH = path.join(process.cwd(), 'data', 'movement_search_index.json');

const server = http.createServer((req, res) => {
    // Enable CORS for the browser agent
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/save') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(`Received data, writing to ${FILE_PATH}`);
            fs.writeFileSync(FILE_PATH, body);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Saved');
            console.log('Data saved. Shutting down...');
            setTimeout(() => process.exit(0), 1000);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Capture server running on http://localhost:${PORT}`);
});
