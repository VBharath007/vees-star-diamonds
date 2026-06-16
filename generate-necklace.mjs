// Leonardo.ai → generate 12 necklace images → save to public/necklace/
// Usage:  node generate-necklace.mjs <YOUR_API_KEY>

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const API_KEY = process.argv[2];
if (!API_KEY) {
  console.error("Usage: node generate-necklace.mjs <LEONARDO_API_KEY>");
  process.exit(1);
}

const BASE = "https://cloud.leonardo.ai/api/rest/v1";

// 12 combos: 4 cuts × 3 metals
const COMBOS = [
  { n: "1",  label: "Round · Platinum",        prompt: "luxury solitaire diamond pendant necklace, round brilliant cut diamond, platinum white gold chain and setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "2",  label: "Round · Gold",             prompt: "luxury solitaire diamond pendant necklace, round brilliant cut diamond, 18k yellow gold chain and prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "3",  label: "Round · Rose Gold",        prompt: "luxury solitaire diamond pendant necklace, round brilliant cut diamond, 18k rose gold chain and prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "4",  label: "Princess · Platinum",      prompt: "luxury solitaire diamond pendant necklace, princess square cut diamond, platinum white gold chain and bezel setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "5",  label: "Princess · Gold",          prompt: "luxury solitaire diamond pendant necklace, princess square cut diamond, 18k yellow gold chain and bezel setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "6",  label: "Princess · Rose Gold",     prompt: "luxury solitaire diamond pendant necklace, princess square cut diamond, 18k rose gold chain and bezel setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "7",  label: "Emerald · Platinum",       prompt: "luxury solitaire diamond pendant necklace, emerald step cut rectangular diamond, platinum white gold chain and four prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "8",  label: "Emerald · Gold",           prompt: "luxury solitaire diamond pendant necklace, emerald step cut rectangular diamond, 18k yellow gold chain and four prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "9",  label: "Emerald · Rose Gold",      prompt: "luxury solitaire diamond pendant necklace, emerald step cut rectangular diamond, 18k rose gold chain and four prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "10", label: "Pear · Platinum",          prompt: "luxury solitaire diamond pendant necklace, pear teardrop cut diamond, platinum white gold chain and prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "11", label: "Pear · Gold",              prompt: "luxury solitaire diamond pendant necklace, pear teardrop cut diamond, 18k yellow gold chain and prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
  { n: "12", label: "Pear · Rose Gold",         prompt: "luxury solitaire diamond pendant necklace, pear teardrop cut diamond, 18k rose gold chain and prong setting, product photography on pure black background, soft studio lighting, macro detail, photorealistic, 8k, no text, no watermark" },
];

async function api(endpoint, method = "GET", body = null) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method,
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${method} ${endpoint} → ${res.status}: ${txt}`);
  }
  return res.json();
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (e) => { fs.unlink(dest, () => {}); reject(e); });
  });
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generateOne(combo) {
  console.log(`\n▶ [${combo.n}/12] ${combo.label}`);

  const genRes = await api("/generations", "POST", {
    prompt: combo.prompt,
    modelId: "aa77f04e-3eec-4034-9c07-d0f619684628", // Leonardo Diffusion XL
    width: 512,
    height: 768,
    num_images: 1,
    guidance_scale: 7,
    num_inference_steps: 30,
    photoReal: true,
    photoRealVersion: "v2",
  });

  const genId = genRes?.sdGenerationJob?.generationId;
  if (!genId) throw new Error("No generationId: " + JSON.stringify(genRes));
  console.log(`  id: ${genId} — waiting...`);

  // Poll until COMPLETE (max ~2 min)
  let result;
  for (let i = 0; i < 30; i++) {
    await sleep(4000);
    result = await api(`/generations/${genId}`);
    const status = result?.generations_by_pk?.status;
    process.stdout.write(`  status: ${status}   \r`);
    if (status === "COMPLETE") break;
  }

  const imgUrl = result?.generations_by_pk?.generated_images?.[0]?.url;
  if (!imgUrl) throw new Error("No image URL: " + JSON.stringify(result));

  const outDir = path.join("public", "necklace");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${combo.n}.png`);
  await download(imgUrl, outPath);
  console.log(`  ✓ saved → public/necklace/${combo.n}.png`);
}

(async () => {
  console.log("Leonardo.ai — generating 12 necklace images...\n");
  let ok = 0;
  for (const combo of COMBOS) {
    try {
      await generateOne(combo);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${combo.label}: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/12 images saved to public/necklace/`);
})();
