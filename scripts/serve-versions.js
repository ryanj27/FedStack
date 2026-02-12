#!/usr/bin/env node

/**
 * Static file server for versioned builds
 * Simulates Azure Blob Storage container serving
 *
 * Serves files from dist-versions/ directory structure:
 *   /analytics/v1.0.0/remoteEntry.js
 *   /analytics/v1.1.0/remoteEntry.js
 *
 * Usage:
 *   node scripts/serve-versions.js
 *   node scripts/serve-versions.js --port 3100
 */

import { createServer } from 'http';
import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const PORT = process.env.PORT || 3100;
const PROJECT_ROOT = join(__dirname, '..');
const DIST_VERSIONS = join(PROJECT_ROOT, 'dist-versions');

// MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function sendResponse(res, statusCode, content, contentType = 'text/plain') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-cache',
  });
  res.end(content);
}

function listDirectory(dirPath, urlPath) {
  try {
    const items = readdirSync(dirPath);
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Version Directory - ${urlPath}</title>
  <style>
    body { font-family: system-ui; max-width: 900px; margin: 40px auto; padding: 20px; }
    h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px; }
    .path { color: #666; font-size: 14px; margin: 10px 0 20px; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px; border-bottom: 1px solid #eee; }
    li:hover { background: #f5f5f5; }
    a { color: #007acc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .dir { font-weight: 600; }
    .file { color: #333; }
    .meta { color: #999; font-size: 12px; margin-left: 10px; }
  </style>
</head>
<body>
  <h1>📦 Version Storage Directory</h1>
  <div class="path">Path: ${urlPath || '/'}</div>
  ${urlPath !== '/' ? '<p><a href="../">← Parent Directory</a></p>' : ''}
  <ul>
    ${items
      .map((item) => {
        const fullPath = join(dirPath, item);
        const isDir = statSync(fullPath).isDirectory();
        const icon = isDir ? '📁' : '📄';
        const className = isDir ? 'dir' : 'file';
        const href = isDir ? `${item}/` : item;
        const stats = statSync(fullPath);
        const size = isDir ? '' : `(${formatBytes(stats.size)})`;
        return `<li class="${className}">${icon} <a href="${href}">${item}</a> <span class="meta">${size}</span></li>`;
      })
      .join('\n')}
  </ul>
  <p style="margin-top: 40px; color: #999; font-size: 12px;">
    Simulating Azure Blob Storage container structure
  </p>
</body>
</html>
    `;
    return html;
  } catch (error) {
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

const server = createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    sendResponse(res, 200, '');
    return;
  }

  // Parse URL
  let urlPath = req.url?.split('?')[0] || '/';
  
  const filePath = join(DIST_VERSIONS, urlPath);

  console.log(`[${new Date().toISOString()}] ${req.method} ${urlPath}`);

  // Check if file exists
  if (!existsSync(filePath)) {
    console.log(`  ❌ Not found: ${filePath}`);
    sendResponse(res, 404, `Not Found: ${urlPath}`, 'text/plain');
    return;
  }

  // Check if it's a directory
  const stats = statSync(filePath);
  if (stats.isDirectory()) {
    // Try serving index.html from directory
    const indexPath = join(filePath, 'index.html');
    if (existsSync(indexPath)) {
      const content = readFileSync(indexPath);
      sendResponse(res, 200, content, 'text/html');
      console.log(`  ✅ Served index.html from ${urlPath}`);
    } else {
      // Generate directory listing
      const listing = listDirectory(filePath, urlPath);
      if (listing) {
        sendResponse(res, 200, listing, 'text/html');
        console.log(`  📂 Directory listing for ${urlPath}`);
      } else {
        sendResponse(res, 404, 'Directory not readable', 'text/plain');
      }
    }
    return;
  }

  // Serve file
  try {
    const content = readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    sendResponse(res, 200, content, mimeType);
    console.log(`  ✅ Served ${urlPath} (${mimeType})`);
  } catch (error) {
    console.error(`  ❌ Error reading file:`, error);
    sendResponse(res, 500, 'Internal Server Error', 'text/plain');
  }
});

server.listen(PORT, () => {
  console.log('');
  console.log('🚀 Version Storage Server (Simulating Azure Blob Storage)');
  console.log('');
  console.log(`   Local:   http://localhost:${PORT}/`);
  console.log(`   Storage: ${DIST_VERSIONS}`);
  console.log('');
  console.log('📦 Available versions:');
  console.log('');

  // List available versions
  try {
    if (existsSync(DIST_VERSIONS)) {
      const apps = readdirSync(DIST_VERSIONS);
      apps.forEach((app) => {
        const appPath = join(DIST_VERSIONS, app);
        if (statSync(appPath).isDirectory()) {
          const versions = readdirSync(appPath);
          versions.forEach((version) => {
            const remoteEntry = join(appPath, version, 'remoteEntry.js');
            if (existsSync(remoteEntry)) {
              console.log(
                `   ✓ ${app}/${version} → http://localhost:${PORT}/${app}/${version}/remoteEntry.js`
              );
            }
          });
        }
      });
    } else {
      console.log('   (no versions built yet)');
      console.log('');
      console.log('   Run: ./scripts/build-versioned.sh analytics 1.0.0');
    }
  } catch (error) {
    console.log('   (error reading versions)');
  }

  console.log('');
  console.log('💡 Build a new version:');
  console.log('   ./scripts/build-versioned.sh analytics 1.0.0');
  console.log('   ./scripts/build-versioned.sh analytics 1.1.0');
  console.log('');
  console.log('Press Ctrl+C to stop');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n\n👋 Shutting down version server...\n');
  server.close(() => {
    process.exit(0);
  });
});
