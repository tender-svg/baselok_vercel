import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import JavaScriptObfuscator from 'javascript-obfuscator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all .html files in the current directory
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
const inputs = {};
files.forEach(file => {
  const name = file.replace('.html', '');
  inputs[name] = resolve(__dirname, file);
});

// Obfuscates our own hand-written JS before it ships in dist/, so casually opening the file
// in a browser/editor doesn't hand over readable logic/comments/variable names. This only
// deters casual reading — anything that runs in the browser can, in principle, still be
// reverse-engineered at runtime by a determined person; this is not encryption.
//
// CMS.methodName(...) calls are wired up via onclick="..." strings (both static in the HTML
// and generated at runtime by cms.js itself), which resolve `CMS` as a global identifier and
// `.methodName` as a plain object property at click-time. The obfuscator only renames
// *declared identifiers*, never object property names, so `.methodName` access is unaffected
// by any of these settings — the one thing that must never happen is the top-level `CMS`
// identifier (declared as `const CMS = {...}` in cms.js) getting renamed. `renameGlobals`
// defaults to false (must stay that way) and `reservedNames` whitelists `CMS` explicitly as
// defense in depth.
function obfuscateJs(code) {
  return JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    reservedNames: ['^CMS$'],
    stringArray: true,
    stringArrayThreshold: 0.75,
    // Left off deliberately for now: selfDefending, debugProtection, controlFlowFlattening —
    // riskier around this file's setInterval/DOM-closure-heavy code; add only after confirming
    // the conservative pass works end-to-end.
  }).getObfuscatedCode();
}

function copyJsDirWithObfuscation(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);
    if (entry.isDirectory()) {
      copyJsDirWithObfuscation(srcPath, destPath);
    } else if (entry.name.endsWith('.js')) {
      const code = fs.readFileSync(srcPath, 'utf8');
      try {
        fs.writeFileSync(destPath, obfuscateJs(code));
      } catch (e) {
        console.warn(`[obfuscate] Skipped (copied as-is): ${entry.name} — ${e.message.split('\n')[0]}`);
        fs.copyFileSync(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const dirsToCopy = ['css', 'images', 'js', 'fonts', 'pdf', 'pages', 'assets'];
      dirsToCopy.forEach(dir => {
        const src = resolve(__dirname, dir);
        const dest = resolve(__dirname, 'dist', dir);
        if (fs.existsSync(src)) {
          if (dir === 'js') {
            copyJsDirWithObfuscation(src, dest);
          } else {
            fs.cpSync(src, dest, { recursive: true, force: true });
          }
        }
      });
      // Copy all HTML files directly
      const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
      files.forEach(file => {
        const src = resolve(__dirname, file);
        const dest = resolve(__dirname, 'dist', file);
        fs.copyFileSync(src, dest);
      });
      // vercel.json must sit at the deployed project root for Vercel to read its rewrites —
      // without this, none of the /solution-:slug.html-style rewrites work in production.
      const vercelJsonSrc = resolve(__dirname, 'vercel.json');
      if (fs.existsSync(vercelJsonSrc)) {
        fs.copyFileSync(vercelJsonSrc, resolve(__dirname, 'dist', 'vercel.json'));
      }
    }
  };
}

// Mirrors vercel.json's rewrites locally, since Vite's dev server doesn't read that file —
// without this, a per-entity URL with no matching physical file (e.g.
// /case-study-<slug>.html once the per-entity file no longer exists) falls through to Vite's
// own SPA fallback and silently serves index.html instead of the shared template, making it
// impossible to dev/test the live-render pages locally. Must be a real plugin (configureServer
// is a plugin hook, not a `server` config key) or Vite silently ignores it.
function vercelRewritesDev() {
  return {
    name: 'vercel-rewrites-dev',
    configureServer(server) {
      const vercelJsonPath = resolve(__dirname, 'vercel.json');
      if (!fs.existsSync(vercelJsonPath)) return;
      const rewrites = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8')).rewrites || [];
      const compiled = rewrites.map(r => ({
        regex: new RegExp('^' + r.source.replace(/:[^/]+/g, '[^/]+').replace(/\./g, '\\.') + '$'),
        destination: r.destination,
      }));
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const match = compiled.find(r => r.regex.test(url.pathname));
        const physicalPath = resolve(__dirname, url.pathname.replace(/^\//, ''));
        if (match && !fs.existsSync(physicalPath)) {
          // No physical file at this exact path — apply the rewrite, mirroring Vercel's
          // behavior. If a physical file DOES exist (e.g. solution-referencefile.html itself,
          // or the biaxial/triaxial pages), fall through and let Vite serve it directly,
          // matching Vercel's static-file-wins-over-rewrite precedence.
          req.url = match.destination;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [copyStaticAssets(), vercelRewritesDev()],
  build: {
    cssMinify: false,
    rollupOptions: {
      input: 'dummy.js'
    }
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://holds-affecting-appropriations-newman.trycloudflare.com',
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'https://holds-affecting-appropriations-newman.trycloudflare.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  server: {
    proxy: {
      // Forward all /api requests to Spring Boot
      '/api': {
        target: 'https://holds-affecting-appropriations-newman.trycloudflare.com',
        changeOrigin: true,
        secure: false,
      },
      // Forward all /admin requests (login/logout/status) to Spring Boot
      '/admin': {
        target: 'https://holds-affecting-appropriations-newman.trycloudflare.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
