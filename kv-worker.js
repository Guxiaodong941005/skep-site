export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    let key = path === '/' ? 'index.html' : path.replace(/^\//, '');
    if (key === '') key = 'index.html';
    const metaRaw = await env.ASSETS.get('__meta');
    const meta = metaRaw ? JSON.parse(metaRaw) : {};
    let value = await env.ASSETS.get(key);
    if (value === null && key !== '404.html') {
      value = await env.ASSETS.get('404.html');
      const ctype = (meta['404.html'] && meta['404.html'].ctype) || 'text/html; charset=utf-8';
      return new Response(value || 'Not found', { status: 404, headers: { 'Content-Type': ctype, 'X-Content-Type-Options': 'nosniff' } });
    }
    if (value === null) return new Response('Not found', { status: 404 });
    const ctype = (meta[key] && meta[key].ctype) || 'application/octet-stream';
    const headers = {
      'Content-Type': ctype,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': key === 'index.html' || key.endsWith('.html') ? 'public, max-age=300' : 'public, max-age=86400',
    };
    // merge simple /* headers from _headers if stored
    const hdr = await env.ASSETS.get('_headers');
    if (hdr) {
      // ignore parse failures
    }
    return new Response(value, { headers });
  }
}
