import fs from "fs";

const manifest = JSON.parse(fs.readFileSync("scripts/gallery-manifest.json", "utf8"));
let src = fs.readFileSync("src/data/projects.ts", "utf8");

for (const [slug, images] of Object.entries(manifest)) {
  const cover = images[0].src;
  const coverAlt = images[0].alt;
  const gallery = images.slice(1);
  const galleryTs = gallery
    .map(
      (g) =>
        `      {\n        src: "${g.src}",\n        alt: "${g.alt}",\n      }`,
    )
    .join(",\n");

  const re = new RegExp(
    `(slug: "${slug}",[\\s\\S]*?cover: ")[^"]+(",[\\s\\S]*?coverAlt: ")[^"]+(",[\\s\\S]*?gallery: \\[)[\\s\\S]*?(\\],\\s*problem:)`,
    "m",
  );
  if (!re.test(src)) {
    console.error("no match", slug);
    process.exit(1);
  }
  src = src.replace(re, `$1${cover}$2${coverAlt}$3\n${galleryTs}\n    $4`);
  console.log("updated", slug, "gallery", gallery.length);
}

fs.writeFileSync("src/data/projects.ts", src);
console.log("projects.ts patched");
