/*
 * frontend_version2_static — snapshot shim.
 *
 * This frontend serves a SNAPSHOT of the live CMS data (see /data/api/v2/**), taken once from the
 * live public GET endpoints (baselok-backend.qpaix.com). This script must be the first script on
 * every page. It wraps window.fetch so that:
 *   - GET /api/v2/...        -> answered from /data/api/v2/....json (unknown page-elements -> [], other unknown -> 404)
 *   - GET /api/admin/status  -> {"loggedIn":false}   (visitor mode; no login in this build)
 *   - any other /api/... call (writes, login, upload, edit) -> blocked with 503, so NOTHING can reach a backend.
 * To connect a real backend later, delete this file's <script> tag from the pages (or make isApi() return false).
 */
(function () {
  'use strict';
  // true  = shim OFF: /api calls go to whatever backend this page's own proxy/rewrite points at.
  // false = offline snapshot mode: GETs are answered from /data, writes/login/upload are blocked.
  var USE_BACKEND = true;
  if (USE_BACKEND) return;
  var origFetch = window.fetch ? window.fetch.bind(window) : null;
  if (!origFetch) return;

  function json(body, status) {
    return new Response(JSON.stringify(body), { status: status || 200, headers: { 'Content-Type': 'application/json' } });
  }

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    var u;
    try { u = new URL(url, location.origin); } catch (e) { return origFetch(input, init); }
    if (u.origin !== location.origin || u.pathname.indexOf('/api/') !== 0) return origFetch(input, init);

    if (method === 'GET' && u.pathname === '/api/admin/status') return Promise.resolve(json({ loggedIn: false }));

    if (method === 'GET' && u.pathname.indexOf('/api/v2/') === 0) {
      var rel = u.pathname.replace(/^\/api\/v2\//, '').replace(/\/+$/, '');
      return origFetch('/data/api/v2/' + rel + '.json', { cache: 'no-cache' }).then(function (r) {
        var ct = r.headers.get('content-type') || '';
        if (r.ok && ct.indexOf('json') > -1) return r;
        // not in the snapshot
        if (rel.indexOf('page-elements/') === 0) return json([]);
        return json({ error: 'not in snapshot' }, 404);
      }).catch(function () {
        return rel.indexOf('page-elements/') === 0 ? json([]) : json({ error: 'snapshot unavailable' }, 404);
      });
    }

    // writes / login / upload / anything else: never leaves the browser
    return Promise.resolve(json({ error: 'frontend_version2_static: no backend is connected (snapshot build)' }, 503));
  };
})();
