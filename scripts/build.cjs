const fs = require("node:fs/promises");
const path = require("node:path");
const { createRuntime, root } = require("./runtime.cjs");

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(path.join(root, file), "utf8")); }
  catch (error) { if (fallback !== undefined && error.code === "ENOENT") return fallback; throw error; }
}

function embedContent(document, content) {
  const snapshot = document.createElement("script");
  snapshot.type = "application/json";
  snapshot.setAttribute("data-site-content", "");
  snapshot.textContent = JSON.stringify(content).replace(/</g, "\\u003c");
  document.head.append(snapshot);
}

async function build({ offline = false, snapshotOnly = false } = {}) {
  const content = {};
  for (const name of ["site", "research", "people", "publications", "korean"]) {
    content[name] = await readJson(`data/${name}.json`);
  }
  const main = createRuntime();
  let previous = await readJson("data/publications-cache.json", {});
  if (!offline && !snapshotOnly) {
    // Retain the last deployed records during an upstream outage, including scheduled builds.
    try {
      const deployed = await main.api.requestJson("https://cukcorelab.catholic.ac.kr/data/publications-cache.json", {}, 5000);
      if (deployed.settingsKey === main.api.publicationSettingsKey(content.publications) &&
          Date.parse(deployed.updatedAt || "") > (Date.parse(previous.updatedAt || "") || 0)) previous = deployed;
    } catch { /* The committed snapshot is available on first deployment and offline. */ }
  }
  const cache = offline ? main.api.savedPublicationSnapshot(content.publications, previous)
    : await main.api.collectPublications(content.publications, previous);
  console.log(`Publications: ${cache.records.length}; last successful check: ${cache.updatedAt || "unknown"}`);
  for (const source of cache.sourceResults) console.log(`  ${source.name}: ${source.status} (${source.count})`);
  if (snapshotOnly) {
    await fs.writeFile(path.join(root, "data/publications-cache.json"), `${JSON.stringify(cache, null, 2)}\n`);
    return;
  }

  const output = path.join(root, "_site");
  await fs.mkdir(output, { recursive: true });
  for (const item of ["assets", "data", "admin", "social-pharmacy", "styles.css", "script.js", "logo.png", "PI_profile.jpg", "robots.txt", "sitemap.xml", "CNAME", ".nojekyll"]) {
    await fs.cp(path.join(root, item), path.join(output, item), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(output, "data/publications-cache.json"), `${JSON.stringify(cache, null, 2)}\n`);
  main.api.renderSite(content.site);
  main.api.renderResearch(content.research);
  main.api.renderPeople(content.people);
  main.api.renderStructuredData(content.site, content.people);
  main.api.renderPublicationSettings(content.publications);
  main.api.renderPublications(cache.records, cache.mode, cache);
  main.document.querySelector("[data-year]").textContent = new Date().getFullYear();
  embedContent(main.document, { ...content, publicationCache: cache });
  await fs.writeFile(path.join(output, "index.html"), main.document.toString());

  const korean = createRuntime("social-pharmacy/index.html");
  korean.api.renderKoreanPage(content.site, content.people, content.korean);
  korean.document.querySelector("[data-year]").textContent = new Date().getFullYear();
  embedContent(korean.document, { site: content.site, people: content.people, korean: content.korean });
  await fs.writeFile(path.join(output, "social-pharmacy/index.html"), korean.document.toString());
  console.log("Static site built in _site/ (main page, Korean page, and admin).");
  return { output, cache };
}

if (require.main === module) {
  build({ offline: process.argv.includes("--offline"), snapshotOnly: process.argv.includes("--snapshot-only") })
    .catch((error) => { console.error(error); process.exitCode = 1; });
}

module.exports = { build };
