import sharp from "sharp";

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#080808"/>
  <text x="80" y="280" font-family="Georgia, serif" font-size="72" fill="#EDE8DF">Mariam Elkholy</text>
  <text x="80" y="360" font-family="Arial, sans-serif" font-size="28" fill="#C5F24D">UI/UX Designer — Alexandria</text>
  <rect x="80" y="420" width="120" height="4" fill="#C5F24D"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("og.png created");
