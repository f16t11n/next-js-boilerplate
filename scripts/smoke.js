/* eslint-disable @typescript-eslint/no-require-imports */
// Simple smoke test runner: starts the production build locally and probes key endpoints.
// Assumptions: `npm run build` already executed, so `.next` exists.
// Usage: `node scripts/smoke.js`

const http = require('http');
const next = require('next');

const PORT = process.env.PORT || 4000;
const HOST = '127.0.0.1';

const TARGETS = [
  '/',
  '/api/health',
  '/api/version',
  '/api/config',
];

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

function request(path) {
  return new Promise((resolve) => {
    const req = http.request({ host: HOST, port: PORT, path, method: 'GET' }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        resolve({ path, status: res.statusCode, body: Buffer.concat(chunks).toString() });
      });
    });
    req.on('error', (err) => resolve({ path, error: err.message }));
    req.end();
  });
}

(async () => {
  console.log('Preparing Next.js server for smoke tests (programmatic)...');
  const app = next({ dev: false, port: PORT, hostname: HOST });
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = http.createServer((req, res) => handle(req, res));
  await new Promise((resolve) => server.listen(PORT, HOST, resolve));

  let attempts = 0;
  let healthy = false;
  while (attempts < 20 && !healthy) {
    attempts += 1;
    const res = await request('/api/health');
    if (res.status === 200) {
      healthy = true;
      break;
    }
    await wait(500);
  }
  if (!healthy) {
    console.error('Server failed to become healthy in time.');
    server.close();
    process.exit(1);
  }
  console.log('Server healthy, executing probes...');

  const results = [];
  for (const t of TARGETS) {
    /* eslint-disable no-await-in-loop */
    const r = await request(t);
    results.push(r);
  }

  let failed = false;
  for (const r of results) {
    if (r.error) {
      failed = true;
      console.error(`[FAIL] ${r.path} -> error: ${r.error}`);
    } else if (!r.status || r.status >= 500) {
      failed = true;
      console.error(`[FAIL] ${r.path} -> status: ${r.status}`);
    } else {
      console.log(`[OK] ${r.path} -> status: ${r.status}`);
    }
  }

  server.close();
  if (failed) {
    console.error('Smoke tests failed.');
    process.exit(1);
  }
  console.log('Smoke tests passed.');
})();
