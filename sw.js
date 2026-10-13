// readwithatom.org now only helps people move to read.learnwithatom.org.
// This replaces the old app's offline copy so everyone lands on the moving page.
const CACHE = "atom-move-1";
self.addEventListener("install", e => {
  e.waitUntil((async () => { const c = await caches.open(CACHE); try { await c.add(new Request("index.html", { cache: "reload" })); } catch (err) {} await self.skipWaiting(); })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => { for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k); await self.clients.claim();
    for (const c of await self.clients.matchAll({ type: "window" })) { try { c.navigate(c.url); } catch (err) {} } })());
});
self.addEventListener("fetch", e => {
  if (e.request.mode !== "navigate") return;
  e.respondWith((async () => { try { return await fetch("index.html", { cache: "no-store" }); } catch (err) { return (await caches.match("index.html")) || Response.error(); } })());
});
