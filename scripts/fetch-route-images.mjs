// Picks one Unsplash photo per destination and saves it (with the photographer
// credit Unsplash requires) to src/lib/routes/unsplashManifest.json, so pages
// and builds never need the live API. Searches use broad, theme-level queries
// (see SEARCH below) because small Indian places are rarely named in photo text,
// and the first result is accepted.
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

// Broad search queries per destination name. The manifest is still keyed by the
// destination's own query in destinations.ts, which is what the pages look up.
// Destinations not listed here search with their own query.
const SEARCH = {
  Shirdi: "Sai Baba temple India",
  Trimbakeshwar: "Shiva temple Maharashtra India",
  Bhimashankar: "jungle temple Maharashtra",
  Pandharpur: "Vitthal temple India pilgrimage",
  Akkalkot: "Hindu temple Maharashtra",
  Tuljapur: "Goddess temple Maharashtra India",
  Mahur: "temple Maharashtra hills",
  Jejuri: "Khandoba temple Maharashtra",
  Alandi: "Sant temple Pune Maharashtra",
  Ganpatipule: "Ganesh temple beach Maharashtra",
  "Ashtavinayak Darshan": "Ganesh temple Maharashtra",
  "Shani Shingnapur": "temple village Maharashtra",
  Nashik: "Godavari river ghats India",
  Panchgani: "hill station Maharashtra valley",
  Lonavala: "monsoon waterfall Maharashtra",
  Lavasa: "planned city Maharashtra hills",
  Matheran: "hill station Maharashtra forest",
  Igatpuri: "Maharashtra hills green",
  Bhandardara: "lake dam Maharashtra",
  Alibaug: "beach Maharashtra coast",
  Ratnagiri: "Konkan coast Maharashtra",
  Sindhudurg: "sea fort Maharashtra",
  Tarkarli: "clear water beach Maharashtra",
  Sambhajinagar: "Bibi Ka Maqbara India",
  Nagpur: "orange city Maharashtra",
  Solapur: "Maharashtra city",
};

const key = loadKey();
if (!key) {
  console.error("No Unsplash key found (UNSPLASH_ACCESS_KEY or .env.local).");
  process.exit(1);
}

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const todo = [
  ...loadDestinations().map((d) => ({ ...d, search: SEARCH[d.name] ?? d.query, generic: false })),
  ...Object.entries(GENERIC).map(([category, query]) => ({
    name: `generic:${category}`,
    query,
    search: query,
    key: `generic:${category}`,
    generic: true,
  })),
].filter((d) => !((d.key ?? d.query) in manifest));
console.log(`${todo.length} destination(s) still need a photo.`);

let remaining = Infinity;
let added = 0;
const missing = [];

for (const { name, query, search, key: manifestKey } of todo) {
  if (remaining <= 2) {
    console.log("Stopping before the hourly rate limit. Run again in an hour.");
    break;
  }
  const url =
    "https://api.unsplash.com/search/photos?" +
    new URLSearchParams({ query: search, orientation: "landscape", per_page: "10", content_filter: "high" });
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" } });
  remaining = Number(res.headers.get("x-ratelimit-remaining") ?? remaining);
  if (!res.ok) {
    console.log(`  ${name}: HTTP ${res.status}${res.status === 403 ? " (rate limit)" : ""} - stopping.`);
    break;
  }
  const { results = [] } = await res.json();

  // Take the first result; no place-name matching.
  const photo = results[0];
  if (!photo) {
    missing.push(name);
    console.log(`  ${name}: no results for "${search}" - will use the local fallback image`);
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
