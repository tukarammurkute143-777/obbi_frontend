// Downloads one Pixabay photo per landing-page vehicle into
// public/images/vehicles/<id>.jpg. Pixabay rarely has photos of a specific
// model, so each vehicle has a ladder of queries, most specific first; a photo
// is only used if its tags say it shows a vehicle and no other vehicle took it.
//
//   node scripts/fetch-vehicle-images.mjs
//
// Re-running skips vehicles whose file exists; delete a file to re-pick it.
// The key is read from PIXABAY_API_KEY (the environment, or .env.local).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/images/vehicles");

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

// Each query lists the tags a photo must have (any one of them). Specific
// queries need the brand or model; the generic ones need the right body type.
const VEHICLES = [
  { id: "swift-dzire", queries: [["Maruti Swift Dzire car", ["dzire", "swift", "maruti", "suzuki"]], ["white sedan car", ["sedan"]], ["sedan car", ["sedan"]], ["Maruti Suzuki hatchback car", ["maruti", "suzuki", "hatchback"]], ["white compact car", ["compact", "hatchback", "sedan"]]] },
  { id: "maruti-ertiga", queries: [["Maruti Ertiga MPV car", ["ertiga", "maruti", "suzuki"]], ["MPV car", ["mpv", "minivan", "people carrier"]], ["minivan car", ["mpv", "minivan", "people carrier"]]] },
  { id: "innova-crysta", queries: [["Toyota Innova Crysta car", ["innova", "crysta"]], ["Toyota Innova", ["innova", "toyota"]], ["family van car", ["mpv", "minivan", "family car"]]] },
  { id: "kia-carens", queries: [["Kia Carens car", ["carens"]], ["Kia MPV", ["kia"]], ["minivan family car", ["mpv", "minivan", "family car"]]] },
  { id: "scorpio-n", queries: [["Mahindra Scorpio N car", ["scorpio", "mahindra"]], ["Mahindra SUV", ["mahindra"]], ["black SUV car", ["suv"]], ["SUV car", ["suv"]]] },
  { id: "force-urbania", queries: [["Force Urbania van", ["urbania", "force"]], ["tempo traveller van", ["tempo", "traveller", "traveler"]], ["minibus van", ["minibus", "mini bus", "van"]]] },
  { id: "mini-bus", queries: [["mini bus India", ["minibus", "mini bus"]], ["minibus", ["minibus", "mini bus"]], ["small bus", ["minibus", "mini bus", "bus"]]] },
  { id: "full-bus", queries: [["luxury coach bus", ["coach", "bus"]], ["tourist bus", ["bus", "coach"]], ["luxury bus India", ["bus", "coach"]]] },
];

// Tags that mean the photo is about something else (toys, old or sports cars,
// people, other kinds of vehicle).
const VEHICLE_TAGS = ["car", "vehicle", "automobile", "auto", "bus", "van", "suv", "coach", "minibus", "transportation"];
const REJECT_TAGS = ["men", "women", "rider", "bike", "motorcycle", "sports", "house", "bridge", "helicopter", "bird", "animal", "scorpion", "toy", "model car", "miniature", "accident", "wreck", "crash", "ai generated", "drawing", "illustration", "classic", "vintage", "antique", "oldtimer", "old timer", "sports car", "racing", "muscle", "retro", "rickshaw", "camper", "child", "children", "people", "person", "girl", "boy", "man", "woman", "wallpaper"];

const key = loadKey();
if (!key) {
  console.error("No Pixabay key found (PIXABAY_API_KEY in the environment or .env.local).");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query) {
  const url =
    "https://pixabay.com/api/?" +
    new URLSearchParams({
      key,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      per_page: "20",
    });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for "${query}"`);
  return (await res.json()).hits ?? [];
}

function isVehicle(hit, need) {
  const tags = hit.tags.toLowerCase().split(/,\s*/);
  if (tags.some((t) => REJECT_TAGS.some((r) => t === r || t.split(/\s+/).includes(r)))) return false;
  if (!tags.some((t) => VEHICLE_TAGS.includes(t))) return false;
  return tags.some((t) => need.some((n) => t === n || t.includes(n)));
}

mkdirSync(outDir, { recursive: true });
const used = new Set();
for (const { id, queries } of VEHICLES) {
  const file = path.join(outDir, `${id}.jpg`);
  if (existsSync(file)) continue;
  let photo;
  let usedQuery;
  for (const [q, need] of queries) {
    const hits = (await search(q)).filter((h) => isVehicle(h, need) && !used.has(h.id));
    await sleep(700);
    if (hits.length) {
      photo = hits[0];
      usedQuery = q;
      break;
    }
  }
  if (!photo) {
    console.log(`  ${id}: no photo found`);
    continue;
  }
  used.add(photo.id);
  const img = await fetch(photo.largeImageURL);
  writeFileSync(file, Buffer.from(await img.arrayBuffer()));
  console.log(`  ${id}: #${photo.id} via "${usedQuery}" (${photo.tags.slice(0, 80)})`);
}
