// Downloads one Pixabay photo per route into public/images/routes/<slug>.jpg and
// records it in src/lib/routes/routeImages.json, so pages and builds never call
// the live API. Every route gets a different photo: routes that share a search
// query start at different result indexes, and a photo already used by another
// route is skipped.
//
//   node scripts/fetch-route-images.mjs
//
// Safe to re-run: routes that already have a manifest entry and file are
// skipped. Delete an entry (and its file) to pick a new photo for that route.
// Pixabay allows 100 requests per minute; the script waits when it is told to.
//
// The key is read from PIXABAY_API_KEY (the environment, or .env.local).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routesDir = path.join(root, "src/lib/routes");
const manifestPath = path.join(routesDir, "routeImages.json");
const imageDir = path.join(root, "public/images/routes");
const FALLBACK_KEY = "fallback";
const PER_PAGE = 20;

function loadKey() {
  if (process.env.PIXABAY_API_KEY) return process.env.PIXABAY_API_KEY;
  const envFile = path.join(root, ".env.local");
  if (!existsSync(envFile)) return undefined;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^PIXABAY_API_KEY=(.+)$/);
    if (m) return m[1].trim();
  }
  return undefined;
}

// Search query per route slug. Routes not listed use the first query given for
// the same destination, then the destination's own query in destinations.ts.
const QUERIES = {
  // pilgrimage
  "pune-to-shirdi": "Shirdi Sai Baba temple",
  "mumbai-to-shirdi": "Shirdi dargah India",
  "nashik-to-shirdi": "Sai Baba shrine India",
  "nagpur-to-shirdi": "Shirdi temple Maharashtra",
  "pune-to-trimbakeshwar": "Trimbakeshwar temple Nashik",
  "mumbai-to-trimbakeshwar": "Nashik temple river",
  "nashik-to-trimbakeshwar": "Trimbakeshwar Shiva temple",
  "pune-to-bhimashankar": "Bhimashankar jungle temple",
  "pune-to-aundha-nagnath": "Jyotirlinga temple India",
  "sambhajinagar-to-aundha-nagnath": "ancient Shiva temple India",
  "pune-to-grishneshwar": "Ellora caves Maharashtra",
  "sambhajinagar-to-grishneshwar": "Ellora caves UNESCO",
  "pune-to-pandharpur": "Pandharpur Vitthal temple",
  "mumbai-to-pandharpur": "Vitthal temple pilgrimage",
  "pune-to-akkalkot": "Swami Samarth temple",
  "mumbai-to-akkalkot": "Math temple Maharashtra",
  "pune-to-tuljapur": "Tulja Bhavani temple",
  "mumbai-to-tuljapur": "goddess temple Maharashtra",
  "pune-to-mahur": "Renukamata temple hills",
  "pune-to-kolhapur": "Kolhapur Mahalakshmi temple",
  "pune-to-jejuri": "Khandoba temple Maharashtra",
  "pune-to-alandi": "Alandi Sant Dnyaneshwar",
  "pune-to-dehu": "Sant Tukaram temple",
  "pune-to-ganpatipule": "Ganpatipule Ganesh temple beach",
  "mumbai-to-ganpatipule": "Ganesh temple beach Maharashtra",
  "pune-to-ashtavinayak-darshan": "Ashtavinayak Ganesh Maharashtra",
  "pune-to-shani-shingnapur": "Shani Shingnapur temple",
  "nashik-to-shani-shingnapur": "Shani temple village",
  "pune-to-nashik": "Nashik Godavari ghats",
  "pune-to-saptashrungi": "Saptashrungi goddess hills",
  "pune-to-shegaon": "Shegaon Gajanan Maharaj",
  "pune-to-narsobawadi": "river confluence temple India",
  "pune-to-gondavale": "village temple Maharashtra",
  "pune-to-ajanta-caves": "Ajanta caves paintings India",
  "sambhajinagar-to-ajanta-caves": "Buddhist cave paintings India",
  "pune-to-ellora-caves": "Ellora caves rock cut temples",
  // hill stations
  "pune-to-mahabaleshwar": "Mahabaleshwar hill station Maharashtra",
  "mumbai-to-mahabaleshwar": "Maharashtra hill station valley",
  "pune-to-panchgani": "Panchgani valley Maharashtra",
  "pune-to-lonavala": "Lonavala waterfall monsoon",
  "mumbai-to-lonavala": "monsoon hills Western Ghats",
  "pune-to-lavasa": "Lavasa planned city hills",
  "pune-to-matheran": "Matheran hill station forest",
  "mumbai-to-matheran": "Matheran toy train hills",
  "pune-to-igatpuri": "Igatpuri green hills Maharashtra",
  "mumbai-to-igatpuri": "Igatpuri Vipassana hills",
  "nashik-to-igatpuri": "Western Ghats hills Maharashtra",
  "pune-to-bhandardara": "Bhandardara lake dam",
  "mumbai-to-bhandardara": "lake dam hills Maharashtra",
  "pune-to-kaas-plateau": "Kaas plateau flowers Maharashtra",
  "mumbai-to-karjat": "Karjat river hills Maharashtra",
  "pune-to-saputara": "Saputara hill station Gujarat",
  // coastal
  "pune-to-alibaug": "Alibaug beach Maharashtra",
  "mumbai-to-alibaug": "Alibaug ferry beach",
  "pune-to-ratnagiri": "Ratnagiri Konkan coast",
  "pune-to-sindhudurg": "Sindhudurg sea fort",
  "pune-to-tarkarli": "Tarkarli clear water beach",
  "mumbai-to-tarkarli": "Tarkarli coral beach",
  "pune-to-dapoli": "Dapoli beach Konkan",
  "pune-to-murud-janjira": "Murud Janjira sea fort",
  "pune-to-kashid": "Kashid white sand beach",
  "pune-to-harihareshwar": "Harihareshwar beach temple",
  "mumbai-to-konkan-darshan": "Konkan coastal Maharashtra",
  "pune-to-goa": "Goa beach sunset",
  "mumbai-to-goa": "Goa beach party India",
  // city to city
  "pune-to-mumbai": "Mumbai Bandra Worli Sea Link",
  "pune-to-sambhajinagar": "Bibi Ka Maqbara Aurangabad",
  "pune-to-nagpur": "Nagpur city Maharashtra",
  "pune-to-solapur": "Solapur Maharashtra",
  "pune-to-satara": "Satara Maharashtra hills",
  "pune-to-latur": "Latur Maharashtra",
  "pune-to-nanded": "Nanded Gurudwara Sahib",
  "mumbai-to-pune": "Pune city expressway",
  "mumbai-to-nashik": "Nashik vineyards wine",
  "mumbai-to-nagpur": "Nagpur orange Maharashtra",
  "mumbai-to-kolhapur": "Kolhapur temple city",
  "mumbai-to-sambhajinagar": "Aurangabad historical city",
  "mumbai-to-solapur": "Maharashtra highway",
  "mumbai-to-surat": "Surat city Gujarat",
  "mumbai-to-vadodara": "Vadodara palace Gujarat",
  "mumbai-to-ahmedabad": "Ahmedabad Gujarat",
  "nashik-to-pune": "Pune city Sahyadri",
  "nashik-to-mumbai": "Mumbai city skyline night",
  "nashik-to-sambhajinagar": "Maharashtra highway travel",
  "nashik-to-nagpur": "Nagpur Maharashtra city",
  "sambhajinagar-to-pune": "Maharashtra expressway",
  "sambhajinagar-to-mumbai": "Mumbai highway Maharashtra",
  "sambhajinagar-to-nashik": "Nashik Maharashtra",
  "nagpur-to-pune": "Pune Maharashtra",
  "nagpur-to-mumbai": "Mumbai Maharashtra",
  "nagpur-to-tadoba": "Tadoba tiger reserve",
  // airport
  "pune-to-mumbai-airport": "Mumbai Chhatrapati Shivaji airport",
  "pune-to-pune-airport": "Pune airport terminal",
  "mumbai-to-pune-airport": "Pune airport Maharashtra",
  "nashik-to-mumbai-airport": "Mumbai airport international",
  "sambhajinagar-to-pune-airport": "airport terminal India",
};

const FALLBACK_QUERY = "Sahyadri mountains Maharashtra";

const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");
const readJson = (file) => JSON.parse(readFileSync(path.join(routesDir, file), "utf8"));

// "Shirdi: {" / '"Ajanta Caves": {' followed by its query line.
function loadDestinationQueries() {
  const src = readFileSync(path.join(routesDir, "destinations.ts"), "utf8");
  const found = {};
  const re = /^\s{2}(?:"([^"]+)"|([A-Za-z]+)): \{[\s\S]*?query: "([^"]+)"/gm;
  let m;
  while ((m = re.exec(src))) found[m[1] ?? m[2]] = m[3];
  return found;
}

function loadRoutes() {
  const seeds = readJson("routeSeeds.json");
  const metrics = readJson("routeMetrics.json");
  const destQuery = loadDestinationQueries();
  return seeds.routes
    .map(([from, to, category]) => ({ from, to, category, slug: `${slugify(from)}-to-${slugify(to)}` }))
    .filter((r) => r.slug in metrics && r.to in destQuery) // same rule as allRoutes.ts
    .map((r) => {
      const sameDestination = Object.keys(QUERIES).find((s) => s.endsWith(`-to-${slugify(r.to)}`));
      return { ...r, query: QUERIES[r.slug] ?? (sameDestination && QUERIES[sameDestination]) ?? destQuery[r.to] };
    });
}

const key = loadKey();
if (!key) {
  console.error("No Pixabay key found (PIXABAY_API_KEY in the environment or .env.local).");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query, page = 1) {
  const url =
    "https://pixabay.com/api/?" +
    new URLSearchParams({
      key,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      per_page: String(PER_PAGE),
      page: String(page),
    });
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url);
    if (res.status === 429) {
      const wait = Number(res.headers.get("x-ratelimit-reset") ?? 30);
      console.log(`  rate limited - waiting ${wait}s`);
      await sleep((wait + 1) * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} for "${query}"`);
    const remaining = Number(res.headers.get("x-ratelimit-remaining") ?? 100);
    if (remaining <= 2) await sleep(Number(res.headers.get("x-ratelimit-reset") ?? 30) * 1000 + 1000);
    return (await res.json()).hits ?? [];
  }
  throw new Error(`rate limit did not clear for "${query}"`);
}

// Pixabay has few photos of small Indian towns and returns unrelated ones
// (a keyboard for "Khandoba temple"), so a photo is only used if its own tags
// name the place (a capitalised word of the query) or the region.
const REGION = [
  "india", "indian", "maharashtra", "mumbai", "pune", "nashik", "goa", "konkan", "hindu", "hinduism",
  "sahyadri", "western ghats", "gujarat", "nagpur", "aurangabad", "kolhapur", "satara", "bombay",
];

function isRelevant(hit, query, category) {
  const tags = hit.tags.toLowerCase();
  if (/ai generated/.test(tags)) return false;
  if (category === "airport" && tags.includes("airport")) return true;
  const places = (query.match(/[A-Z][a-z]{3,}/g) ?? []).map((w) => w.toLowerCase());
  return [...REGION, ...places].some((w) => tags.includes(w));
}

// Tried in order when a route's own query has no unused relevant photo left.
const FALLBACKS = {
  pilgrimage: ["India temple", "Hindu temple", "Indian temple architecture", "Shiva temple India", "Ganesh Hindu India", "India pilgrimage", "Indian shrine", "India temple sunrise", "Hindu temple carving", "Indian temple gopuram"],
  hill_station: ["Western Ghats", "Maharashtra hills", "India hill station", "India waterfall", "Maharashtra valley", "India mountains mist", "India lake hills"],
  coastal: ["Konkan beach", "India beach", "Goa beach", "India fort sea", "Maharashtra coast", "India sunset beach", "Goa coast"],
  city: ["Maharashtra city", "Mumbai", "Pune city", "India highway", "Indian city skyline", "India road trip", "Maharashtra fort", "Mumbai skyline", "India city traffic"],
  airport: ["India airport", "airport terminal", "airplane India", "airport runway", "Mumbai airport", "airport lounge"],
  other: ["Sahyadri mountains Maharashtra", "Western Ghats", "Maharashtra hills", "India mountains"],
};

// Unused, relevant photos for one query (first two pages), cached.
async function candidates(query, category, cache) {
  const cacheKey = `${category}|${query}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const hits = [];
  for (const page of [1, 2]) {
    const found = await search(query, page);
    await sleep(700);
    hits.push(...found);
    if (found.length < PER_PAGE) break;
  }
  const relevant = hits.filter((h) => isRelevant(h, query, category));
  cache.set(cacheKey, relevant);
  return relevant;
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

mkdirSync(imageDir, { recursive: true });
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const save = () => writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + "\n");
const used = new Set(Object.values(manifest).map((e) => e.id));
const cache = new Map();
const startAt = new Map(); // query -> how many routes already took an index from it

const jobs = [
  ...loadRoutes().map((r) => ({ id: r.slug, query: r.query, category: r.category, file: `${r.slug}.jpg` })),
  { id: FALLBACK_KEY, query: FALLBACK_QUERY, category: "other", file: "fallback-sahyadri.jpg" },
];
// Routes sharing a query take consecutive indexes, in route order, whether or
// not they are already done, so a re-run does not shift anyone's photo.
const todo = [];
for (const job of jobs) {
  const index = startAt.get(job.query) ?? 0;
  startAt.set(job.query, index + 1);
  const done = manifest[job.id] && existsSync(path.join(imageDir, job.file));
  if (!done) todo.push({ ...job, index });
}
console.log(`${jobs.length} routes, ${todo.length} still need a photo.`);

let added = 0;
const failed = [];
for (const { id, query, category, file, index } of todo) {
  try {
    let photo;
    let usedQuery = query;
    for (const q of [query, ...FALLBACKS[category]]) {
      const relevant = await candidates(q, category, cache);
      // Routes sharing a query start at different results.
      const start = q === query ? index : 0;
      for (let i = 0; i < relevant.length && !photo; i++) {
        const candidate = relevant[(start + i) % relevant.length];
        if (!used.has(candidate.id)) photo = candidate;
      }
      if (photo) {
        usedQuery = q;
        break;
      }
    }
    if (!photo) {
      failed.push(id);
      console.log(`  ${id}: no unused relevant photo found`);
      continue;
    }
    await download(photo.largeImageURL, path.join(imageDir, file));
    used.add(photo.id);
    manifest[id] = {
      id: photo.id,
      file: `/images/routes/${file}`,
      alt: photo.tags,
      user: photo.user,
      pageUrl: photo.pageURL,
      query: usedQuery,
    };
    save();
    added++;
    console.log(`  ${id}: #${photo.id} (${photo.tags})`);
  } catch (error) {
    failed.push(id);
    console.log(`  ${id}: ${error.message}`);
  }
}

console.log(`\nAdded ${added}. Failed: ${failed.join(", ") || "none"}.`);
