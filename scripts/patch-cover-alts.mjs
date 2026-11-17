import fs from "fs";

const report = JSON.parse(fs.readFileSync("scripts/cover-report.json", "utf8"));
let src = fs.readFileSync("src/data/projects.ts", "utf8");

for (const [slug, info] of Object.entries(report)) {
  const re = new RegExp(
    `(slug: "${slug}",[\\s\\S]*?coverAlt: ")[^"]+(")`,
  );
  if (!re.test(src)) {
    console.error("fail", slug);
    process.exit(1);
  }
  src = src.replace(re, `$1${info.alt}$2`);
  console.log("alt", slug);
}

fs.writeFileSync("src/data/projects.ts", src);
