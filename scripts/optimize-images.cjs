const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const root = path.resolve(__dirname, "..");
  const output = path.join(root, "assets/optimized");
  await fs.mkdir(output, { recursive: true });
  const jobs = [
    ["logo.png", "logo.webp", 348, "webp", { lossless: true }],
    ["PI_profile.jpg", "PI_profile.webp", 640, "webp", { quality: 85 }],
    ["assets/hero-heor-lab.png", "hero.webp", 1717, "webp", { quality: 82 }],
    ["assets/hero-heor-lab.png", "hero-mobile.webp", 960, "webp", { quality: 82 }],
    ["assets/hero-heor-lab.png", "hero-social.jpg", 1200, "jpeg", { quality: 82 }],
  ];
  for (const [input, name, width, format, options] of jobs) {
    await sharp(path.join(root, input)).rotate().resize({ width, withoutEnlargement: true })
      .toFormat(format, options).toFile(path.join(output, name));
  }
  for (const [name, size] of [["favicon.png", 64], ["apple-touch-icon.png", 180]]) {
    await sharp(path.join(root, "logo.png")).resize(size, size, {
      fit: "contain", background: "#ffffff",
    }).png({ compressionLevel: 9 }).toFile(path.join(output, name));
  }
  for (const name of await fs.readdir(output)) {
    console.log(`${name}: ${(await fs.stat(path.join(output, name))).size} bytes`);
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
