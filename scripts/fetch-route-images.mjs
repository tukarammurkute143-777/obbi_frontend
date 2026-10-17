// Picks one Unsplash photo per destination and saves it (with the photographer
// credit Unsplash requires) to src/lib/routes/unsplashManifest.json, so pages
// and builds never need the live API. A photo is only accepted if its own text
// (description, tags or location) names the place; otherwise the destination is
// left to the generic photo for its category, or the local fallback image.
//
// Most small pilgrimage towns have few or no photos on Unsplash, so expect many
// destinations to end up with the category photo.
//
//   node scripts/fetch-route-images.mjs
//
// Safe to re-run: it only looks up destinations that are not in the manifest
// yet. Unsplash demo apps get 50 requests an hour; the script stops before
// that limit and prints how many are left, so run it again an hour later.
// Delete an entry from the manifest to pick a different photo for it.
//
// The key is read from UNSPLASH_ACCESS_KEY or NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
// (the environment, or .env.local).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "src/lib/routes/unsplashManifest.json");
const destinationsPath = path.join(root, "src/lib/routes/destinations.ts");

function loadKey() {
  const fromEnv = process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (fromEnv) return fromEnv;
  const envFile = path.join(root, ".env.local");
  if (!existsSync(envFile)) return undefined;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^(?:NEXT_PUBLIC_)?UNSPLASH_ACCESS_KEY=(.+)$/);
    if (m) return m[1].trim();
  }
  return undefined;
}

// "Shirdi: {" / '"Ajanta Caves": {' followed by its query line.
function loadDestinations() {
  const src = readFileSync(destinationsPath, "utf8");
  const found = [];
  const re = /^\s{2}(?:"([^"]+)"|([A-Za-z]+)): \{[\s\S]*?query: "([^"]+)"/gm;
  let m;
  while ((m = re.exec(src))) found.push({ name: m[1] ?? m[2], query: m[3] });
  return found;
}

// One generic photo per route category (key "generic:<category>"). Keep in sync
// with RouteCategory in src/lib/routes/allRoutes.ts.
const GENERIC = {
  pilgrimage: "India temple architecture sunrise",
  hill_station: "Western Ghats Maharashtra hills mist",
  coastal: "Konkan coast beach India",
  city: "Maharashtra highway road trip India",
  airport: "airport terminal travel India",
};

const key = loadKey();
if (!key) {
  console.error("No Unsplash key found (UNSPLASH_ACCESS_KEY or .env.local).");
  process.exit(1);
}

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const todo = [
  ...loadDestinations().map((d) => ({ ...d, generic: false })),
  ...Object.entries(GENERIC).map(([category, query]) => ({
    name: `generic:${category}`,
    query,
    key: `generic:${category}`,
    generic: true,
  })),
].filter((d) => !((d.key ?? d.query) in manifest));
console.log(`${todo.length} destination(s) still need a photo.`);

let remaining = Infinity;
let added = 0;
const missing = [];

for (const { name, query, generic, key: manifestKey } of todo) {
  if (remaining <= 2) {
    console.log("Stopping before the hourly rate limit. Run again in an hour.");
    break;
  }
  const url =
    "https://api.unsplash.com/search/photos?" +
    new URLSearchParams({ query, orientation: "landscape", per_page: "10", content_filter: "high" });
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" } });
  remaining = Number(res.headers.get("x-ratelimit-remaining") ?? remaining);
  if (!res.ok) {
    console.log(`  ${name}: HTTP ${res.status}${res.status === 403 ? " (rate limit)" : ""} - stopping.`);
    break;
  }
  const { results = [] } = await res.json();

  // Destination photos must name the place; the category photo is the top result.
  const token = name.split(/\s+/)[0].toLowerCase();
  const text = (p) =>
    [p.alt_description, p.description, p.location?.name, p.location?.city, ...(p.tags ?? []).map((t) => t.title)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  const photo = generic ? results[0] : results.find((p) => text(p).includes(token));
  if (!photo) {
    missing.push(name);
    console.log(`  ${name}: no photo mentions "${token}" - will use the local fallback image`);
    continue;
  }
  manifest[manifestKey ?? query] = {
    raw: photo.urls.raw,
    alt: photo.alt_description || photo.description || query,
    name: photo.user.name,
    username: photo.user.username,
    link: photo.links.html,
  };
  added++;
  console.log(`  ${name}: ${photo.user.name} - ${photo.alt_description ?? photo.description}`);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + "\n");
  await new Promise((r) => setTimeout(r, 300));
}

console.log(`\nAdded ${added}. No suitable photo for: ${missing.join(", ") || "none"}. Requests left this hour: ${remaining}.`);
