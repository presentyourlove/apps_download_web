/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/csp-report-endpoint') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const report = JSON.parse(body);
                // eslint-disable-next-line no-console
                console.log('🛡️ Received CSP Report:', JSON.stringify(report, null, 2));
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Report received');
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error('❌ Invalid JSON:', e);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🛡️ CSP Report Server listening on port ${PORT}`);
    // eslint-disable-next-line no-console
    console.log(`   Endpoint: http://localhost:${PORT}/csp-report-endpoint`);
});
