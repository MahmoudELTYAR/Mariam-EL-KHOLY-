import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = "d:/Mariam EL-Kholy";
const outRoot = "public/projects";
const TARGET_W = 1600;
const TARGET_H = 1000; // 16:10

/** Best source per project + crop strategy */
const picks = {
  dhara: {
    file: "Dhara/WhatsApp Image 2026-11-17 at 9.36.12 PM.jpeg",
    why: "Gallery hero with clear Fayrouz branding and strong photography — crop top hero band",
    crop: "top",
  },
  guiver: {
    file: "guiver/WhatsApp Image 2026-11-17 at 9.40.23 PM.jpeg",
    why: "Near-landscape cinematic hero (city + headline) — least crop distortion",
    crop: "center",
  },
  janalya: {
    file: "janalya/WhatsApp Image 2026-11-17 at 9.44.56 PM.jpeg",
    why: "Collection grid with product craft clearly visible — crop top storefront",
    crop: "top",
  },
  oroba: {
    file: "oroba/WhatsApp Image 2026-11-17 at 9.42.08 PM.jpeg",
    why: "Widest Orouba frame with contact/brand presence — crop top editorial block",
    crop: "top",
  },
  sdm: {
    file: "sdm/WhatsApp Image 2026-11-17 at 9.47.41 PM (2).jpeg",
    why: "Agency partners/hero area, wider than skinny scrolls — crop top",
    crop: "top",
  },
  snapsale: {
    file: "snapsale/WhatsApp Image 2026-11-17 at 9.51.25 PM (3).jpeg",
    why: "Already landscape dashboard slice with KPIs — sharp and representative",
    crop: "center",
  },
  uthaibat: {
    file: "uthaibat/WhatsApp Image 2026-11-17 at 9.38.56 PM (3).jpeg",
    why: "Near-square books library card — clean UI without extreme tall scroll",
    crop: "top",
  },
};

const alts = {
  dhara: "Dhara Hospitality — Fayrouz Sanctuary gallery hero",
  guiver: "Guiver — European private travel hero interface",
  janalya: "Janalya — handmade string art collection storefront",
  oroba: "Orouba — luxury developments brand interface",
  sdm: "Smart Digital Marketing — agency website hero",
  snapsale: "SnapSale — commerce operations dashboard overview",
  uthaibat: "Al-Uthaibat — heritage books library interface",
};

async function makeCover(slug, pick) {
  const input = path.join(root, pick.file);
  const dest = path.join(outRoot, slug);
  fs.mkdirSync(dest, { recursive: true });
  const meta = await sharp(input).metadata();
  const srcW = meta.width;
  const srcH = meta.height;
  const targetRatio = TARGET_W / TARGET_H;
  let cropW = srcW;
  let cropH = Math.round(srcW / targetRatio);
  if (cropH > srcH) {
    cropH = srcH;
    cropW = Math.round(srcH * targetRatio);
  }
  const left = Math.max(0, Math.round((srcW - cropW) / 2));
  const top =
    pick.crop === "center"
      ? Math.max(0, Math.round((srcH - cropH) / 2))
      : 0;

  const pipeline = sharp(input)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(TARGET_W, TARGET_H, { fit: "cover" });

  await pipeline.clone().webp({ quality: 82 }).toFile(path.join(dest, "cover.webp"));
  await pipeline.clone().avif({ quality: 55 }).toFile(path.join(dest, "cover.avif"));
  await pipeline.clone().jpeg({ quality: 85 }).toFile(path.join(dest, "cover.jpg"));
  await sharp(input)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(900, 562, { fit: "cover" })
    .webp({ quality: 75 })
    .toFile(path.join(dest, "cover-sm.webp"));

  console.log(
    `${slug}: ${srcW}x${srcH} → crop ${cropW}x${cropH}@${left},${top} → 1600x1000 | ${pick.why}`,
  );
  return { src: `/projects/${slug}/cover.webp`, alt: alts[slug], why: pick.why };
}

const report = {};
for (const [slug, pick] of Object.entries(picks)) {
  report[slug] = await makeCover(slug, pick);
}
fs.writeFileSync("scripts/cover-report.json", JSON.stringify(report, null, 2));
console.log("Done covers");
