import http from 'node:http';
import { mkdir, readFile, rename, unlink, writeFile, readdir, stat } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

const host = '127.0.0.1';
const port = Number(process.env.PORT || 8787);
const dataDir = process.env.DATA_DIR || '/var/lib/weiter-glauben';
const feedbackDir = path.join(dataDir, 'feedback');
const maxBodyBytes = 128 * 1024;
const ttlMs = 365 * 24 * 60 * 60 * 1000;
const feedbackTtlMs = 183 * 24 * 60 * 60 * 1000;
const rateWindowMs = 10 * 60 * 1000;
const rateLimit = 40;
const requests = new Map();

await mkdir(dataDir, { recursive: true, mode: 0o700 });
await mkdir(feedbackDir, { recursive: true, mode: 0o700 });

function json(response, status, data) {
  const body = JSON.stringify(data);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(body);
}

function clientKey(request) {
  return String(request.headers['x-real-ip'] || request.socket.remoteAddress || 'unknown').slice(0, 80);
}

function isRateLimited(request) {
  const now = Date.now();
  const key = clientKey(request);
  const recent = (requests.get(key) || []).filter(time => now - time < rateWindowMs);
  recent.push(now);
  requests.set(key, recent);
  return recent.length > rateLimit;
}

function recordPath(id) {
  return path.join(dataDir, `${id}.json`);
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodyBytes) throw new Error('too_large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function validPayload(payload) {
  return payload && payload.version === 1 &&
    typeof payload.iv === 'string' && /^[A-Za-z0-9_-]{12,32}$/.test(payload.iv) &&
    typeof payload.ciphertext === 'string' && payload.ciphertext.length >= 20 && payload.ciphertext.length <= 120000 &&
    /^[A-Za-z0-9_-]+$/.test(payload.ciphertext);
}

function cleanText(value, maxLength, required = false) {
  if (typeof value !== 'string') return required ? null : '';
  const cleaned = value.replace(/\r\n?/g, '\n').trim();
  if ((required && !cleaned) || cleaned.length > maxLength) return null;
  return cleaned;
}

function normalizeFeedback(payload) {
  if (!payload || payload.version !== 1 || payload.consent !== true) return null;
  if (!['daily', 'intro', 'bible', 'mixed'].includes(payload.area)) return null;
  if (!['phone', 'tablet', 'computer'].includes(payload.device)) return null;
  if (!Number.isInteger(payload.orientation) || payload.orientation < 1 || payload.orientation > 5) return null;
  if (!['too_shallow', 'right', 'too_demanding'].includes(payload.depth)) return null;
  if (!['yes', 'maybe', 'no'].includes(payload.churchContact)) return null;

  const feedback = {
    area: payload.area,
    device: payload.device,
    orientation: payload.orientation,
    depth: payload.depth,
    stopPoint: cleanText(payload.stopPoint, 1200),
    resonance: cleanText(payload.resonance, 1200),
    irritation: cleanText(payload.irritation, 1200),
    openQuestion: cleanText(payload.openQuestion, 1200),
    churchContact: payload.churchContact,
    firstChange: cleanText(payload.firstChange, 1200, true)
  };
  if (Object.values(feedback).some(value => value === null)) return null;
  return feedback;
}

async function cleanExpired() {
  const now = Date.now();
  for (const file of await readdir(dataDir)) {
    if (!/^[a-f0-9]{64}\.json$/.test(file)) continue;
    const filename = path.join(dataDir, file);
    try {
      const info = await stat(filename);
      if (now - info.mtimeMs > ttlMs) await unlink(filename);
    } catch {}
  }
}

async function cleanExpiredFeedback() {
  const now = Date.now();
  for (const file of await readdir(feedbackDir)) {
    if (!/^[0-9]+-[a-f0-9-]+\.json$/.test(file)) continue;
    const filename = path.join(feedbackDir, file);
    try {
      const info = await stat(filename);
      if (now - info.mtimeMs > feedbackTtlMs) await unlink(filename);
    } catch {}
  }
}

const server = http.createServer(async (request, response) => {
  if (isRateLimited(request)) return json(response, 429, { error: 'rate_limited' });
  if (request.url === '/health' && request.method === 'GET') return json(response, 200, { status: 'ok' });

  if (request.url === '/feedback') {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return json(response, 405, { error: 'method_not_allowed' });
    }
    try {
      const payload = await readBody(request);
      if (typeof payload.website === 'string' && payload.website.trim()) return json(response, 202, { saved: true });
      const feedback = normalizeFeedback(payload);
      if (!feedback) return json(response, 400, { error: 'invalid_payload' });
      const receivedAt = new Date();
      const record = {
        version: 1,
        id: randomUUID(),
        receivedAt: receivedAt.toISOString(),
        expiresAt: new Date(receivedAt.getTime() + feedbackTtlMs).toISOString(),
        ...feedback
      };
      const filename = path.join(feedbackDir, `${receivedAt.getTime()}-${record.id}.json`);
      await writeFile(filename, JSON.stringify(record), { mode: 0o600, flag: 'wx' });
      return json(response, 201, { saved: true });
    } catch (error) {
      if (error.message === 'too_large') return json(response, 413, { error: 'too_large' });
      if (error instanceof SyntaxError) return json(response, 400, { error: 'invalid_json' });
      console.error(error);
      return json(response, 500, { error: 'server_error' });
    }
  }

  const match = request.url?.match(/^\/progress\/([a-f0-9]{64})$/);
  if (!match) return json(response, 404, { error: 'not_found' });
  const id = match[1];
  const filename = recordPath(id);

  try {
    if (request.method === 'GET') {
      const record = JSON.parse(await readFile(filename, 'utf8'));
      if (Date.parse(record.expiresAt) < Date.now()) {
        await unlink(filename).catch(() => {});
        return json(response, 404, { error: 'not_found' });
      }
      return json(response, 200, record);
    }

    if (request.method === 'PUT') {
      const payload = await readBody(request);
      if (!validPayload(payload)) return json(response, 400, { error: 'invalid_payload' });
      const now = new Date();
      const record = {
        version: 1,
        updatedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + ttlMs).toISOString(),
        iv: payload.iv,
        ciphertext: payload.ciphertext
      };
      const temporary = `${filename}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(record), { mode: 0o600, flag: 'wx' });
      await rename(temporary, filename);
      return json(response, 200, { saved: true, updatedAt: record.updatedAt, expiresAt: record.expiresAt });
    }

    if (request.method === 'DELETE') {
      await unlink(filename).catch(error => { if (error.code !== 'ENOENT') throw error; });
      return json(response, 200, { deleted: true });
    }

    response.setHeader('Allow', 'GET, PUT, DELETE');
    return json(response, 405, { error: 'method_not_allowed' });
  } catch (error) {
    if (error.code === 'ENOENT') return json(response, 404, { error: 'not_found' });
    if (error.message === 'too_large') return json(response, 413, { error: 'too_large' });
    if (error instanceof SyntaxError) return json(response, 400, { error: 'invalid_json' });
    console.error(error);
    return json(response, 500, { error: 'server_error' });
  }
});

server.listen(port, host, () => console.log(`Progress API listening on http://${host}:${port}`));
cleanExpired().catch(console.error);
cleanExpiredFeedback().catch(console.error);
setInterval(() => cleanExpired().catch(console.error), 24 * 60 * 60 * 1000).unref();
setInterval(() => cleanExpiredFeedback().catch(console.error), 24 * 60 * 60 * 1000).unref();
