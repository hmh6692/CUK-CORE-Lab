const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");
const { parseHTML } = require("linkedom");
const { build } = require("../scripts/build.cjs");
const { createRuntime, root } = require("../scripts/runtime.cjs");

async function loadContent() {
  const entries = await Promise.all(["site", "research", "people", "publications", "korean"].map(async (name) =>
    [name, JSON.parse(await fs.readFile(path.join(root, `data/${name}.json`), "utf8"))]));
  return Object.fromEntries(entries);
}

test("offline build retains complete source data and pre-renders public content", async () => {
  const { output, cache } = await build({ offline: true });
  const site = JSON.parse(await fs.readFile(path.join(root, "data/site.json"), "utf8"));
  const people = JSON.parse(await fs.readFile(path.join(root, "data/people.json"), "utf8"));
  const settings = JSON.parse(await fs.readFile(path.join(root, "data/publications.json"), "utf8"));
  const memberCount = people.members.filter((member) => member.name).length;
  const recentCount = Math.min(settings.recentLimit, cache.records.length);
  let mainSections;
  let mainPapers;
  for (const page of ["index.html", "social-pharmacy/index.html"]) {
    const html = await fs.readFile(path.join(output, page), "utf8");
    const { document } = parseHTML(html);
    assert.ok(document.title.length > 0);
    assert.equal(document.querySelectorAll('link[rel="alternate"][hreflang]').length, 0);
    const pagePath = page === "index.html" ? "" : "social-pharmacy/";
    assert.equal(document.querySelector('link[rel="canonical"]').getAttribute("href"), `https://cukcorelab.catholic.ac.kr/${pagePath}`);
    assert.equal(document.querySelector('meta[name="robots"]').getAttribute("content"), pagePath ? "noindex, follow" : "index, follow");
    const content = JSON.parse(document.querySelector("[data-site-content]").textContent);
    assert.equal(content.people.members.length, people.members.length);
    assert.equal(content.publicationCache.records.length, cache.records.length);
    assert.equal(document.querySelectorAll(".member-card").length, memberCount);
    assert.equal(document.querySelectorAll(".member-card img, .member-card .initials").length, 0);
    assert.equal(document.querySelectorAll(".publication-card").length, recentCount);
    assert.equal(document.querySelectorAll(".research-card").length, content.research.cards.length);
    const languageLink = document.querySelector(".site-nav [data-language-switch]");
    assert.equal(document.querySelectorAll("[data-language-switch]").length, 1);
    assert.equal(languageLink.getAttribute("href"), pagePath ? "../" : "social-pharmacy/");
    assert.equal(languageLink.getAttribute("lang"), pagePath ? "en" : "ko");
    assert.equal(languageLink.textContent, pagePath ? "English" : "한국어");
    assert.equal(document.querySelectorAll(".mini-cv > div").length, (people.principalInvestigator.education || []).length);
    if (people.principalInvestigator.experience?.length) {
      assert.equal(document.querySelector(".experience-disclosure").hasAttribute("open"), false);
    }
    assert.ok(document.querySelector(".pi-card").textContent.includes(people.principalInvestigator.name));
    assert.ok(document.querySelector('script[type="application/ld+json"]'));
    for (const element of document.querySelectorAll("[src], link[href]")) {
      const reference = element.getAttribute("src") || element.getAttribute("href");
      if (!reference || /^(?:https?:|\/\/|#)/.test(reference)) continue;
      const target = path.resolve(path.dirname(path.join(output, page)), reference.split("?")[0]);
      assert.ok(target.startsWith(output + path.sep));
      await fs.access(target);
    }
    if (page === "index.html") {
      mainSections = [...document.querySelectorAll("main > section")].map((node) => [node.id, node.className]);
      mainPapers = [...document.querySelectorAll(".publication-card h3")].map((node) => node.textContent);
      assert.ok(document.querySelector('meta[name="google-site-verification"]'));
      assert.equal(document.querySelectorAll('.site-nav a[href="social-pharmacy/"]').length, 1);
      assert.equal(document.querySelectorAll('script[src*="netlify-identity"]').length, 0);
      assert.equal(document.title, site.meta.title);
      assert.equal(document.querySelector("[data-about-local]").textContent, site.about.localContext);
      assert.ok(document.querySelector('a[href="social-pharmacy/"]'));
    } else {
      assert.deepEqual([...document.querySelectorAll("main > section")].map((node) => [node.id, node.className]), mainSections);
      assert.deepEqual([...document.querySelectorAll(".publication-card h3")].map((node) => node.textContent), mainPapers);
      assert.equal(document.querySelector("[data-publication-all-label]").textContent, "전체 논문");
      assert.equal(document.querySelector("[data-language-switch]").getAttribute("href"), "../");
      assert.ok(document.getElementById("overview"));
      assert.ok(document.getElementById("professor"));
      assert.equal(document.body.hasAttribute("data-main-layout"), false);
    }
  }
  const { document: sitemap } = parseHTML(await fs.readFile(path.join(output, "sitemap.xml"), "utf8"));
  assert.deepEqual([...sitemap.querySelectorAll("loc")].map((node) => node.textContent), ["https://cukcorelab.catholic.ac.kr/"]);
  const robots = await fs.readFile(path.join(output, "robots.txt"), "utf8");
  assert.ok(!/Disallow:\s*\/social-pharmacy/.test(robots));
  for (const file of ["admin/index.html", "admin/bootstrap.js", "admin/config.yml", "data/korean.json", "data/publications-cache.json"]) await fs.access(path.join(output, file));
  for (const file of ["package.json", "scripts/build.cjs", "README.md", "server.log"]) await assert.rejects(fs.access(path.join(output, file)));

  for (const page of ["_site/index.html", "_site/social-pharmacy/index.html"]) {
    const fallback = createRuntime(page, {
      fetch: async () => { throw new Error("Local data request unavailable"); },
      window: { location: { hash: "", search: "" } },
    });
    await fallback.api.init();
    assert.equal(fallback.document.querySelectorAll(".member-card").length, memberCount);
    assert.equal(fallback.document.querySelectorAll(".publication-card").length, recentCount);
    assert.ok(fallback.document.querySelector("[data-publication-summary]").textContent.includes(String(cache.records.length)));
  }
});

test("Korean typography reserves serif for major headings and unifies body rhythm", async () => {
  const css = await fs.readFile(path.join(root, "styles.css"), "utf8");
  const { document } = parseHTML(`<html><head><style>${css}</style></head><body></body></html>`);
  const rules = [...document.querySelector("style").sheet.cssRules].filter((rule) => rule.selectorText);
  const selectors = (rule) => rule.selectorText.split(",").map((selector) => selector.trim());
  const styleFor = (selector) => {
    const rule = rules.find((item) => selectors(item).includes(selector));
    assert.ok(rule, `Missing typography rule: ${selector}`);
    return rule.style;
  };

  for (const selector of [".korean-page h3", ".korean-page h4", ".korean-page .hero-local", ".korean-page .profile-local strong", ".korean-page .publication-year"]) {
    assert.equal(styleFor(selector).getPropertyValue("font-family"), "var(--font-kr-sans)");
  }
  for (const selector of [".korean-page", ".korean-page .intro-copy", ".korean-page .research-card p", ".korean-page .team-notes p", ".korean-page .recruitment-questions li"]) {
    assert.equal(styleFor(selector).getPropertyValue("font-size"), "1rem");
    assert.equal(styleFor(selector).getPropertyValue("line-height"), "1.75");
  }
  const serifHeadings = [".korean-page .section-grid h2", ".korean-page .section-heading h2", ".korean-page .contact-inner h2"];
  for (const selector of serifHeadings) {
    assert.equal(styleFor(selector).getPropertyValue("font-family"), "var(--font-kr-serif)");
  }
  for (const rule of rules) {
    if (!rule.style.getPropertyValue("font-family").includes("serif")) continue;
    for (const selector of selectors(rule).filter((item) => item.includes(".korean-page"))) {
      assert.ok(serifHeadings.includes(selector), `Unexpected Korean serif style: ${selector}`);
    }
  }
});

test("school admin URLs preserve auth callbacks and do not redirect Netlify", async () => {
  const script = await fs.readFile(path.join(root, "admin/bootstrap.js"), "utf8");
  for (const hostname of ["cukcorelab.catholic.ac.kr", "hmh6692.github.io", "cuk-core-lab.netlify.app", "localhost"]) {
    let redirected;
    const location = { hostname, search: "?test=1", hash: "#invite_token=test-only", replace: (url) => { redirected = url; } };
    vm.runInNewContext(script, { window: { location } });
    if (["cukcorelab.catholic.ac.kr", "hmh6692.github.io"].includes(hostname)) {
      assert.equal(redirected, "https://cuk-core-lab.netlify.app/admin/?test=1#invite_token=test-only");
    } else assert.equal(redirected, undefined);
  }
});

test("CMS profile changes update Korean content and structured data", async () => {
  const content = await loadContent();
  const { site, people } = content;
  people.principalInvestigator.localBio = "Updated biography";
  people.principalInvestigator.title = "Updated academic title";
  people.principalInvestigator.photo = "assets/uploads/new-photo.jpg";
  site.contact.email = "updated@example.org";
  const { api, document } = createRuntime("social-pharmacy/index.html");
  api.renderPageContent(content);
  assert.ok(document.querySelector(".pi-card").textContent.includes("Updated biography"));
  assert.equal(document.querySelector(".pi-card .person-photo").getAttribute("src"), "../assets/uploads/new-photo.jpg");
  assert.equal(document.querySelector(".contact-link").getAttribute("href"), "mailto:updated@example.org");
  const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(schema["@graph"].find((item) => item["@type"] === "Person").jobTitle, "Updated academic title");
});

test("Korean PI uses the shared portrait fallback without adding student photos", async () => {
  const content = await loadContent();
  const { api, document } = createRuntime("social-pharmacy/index.html");
  content.people.principalInvestigator.photo = "";
  api.renderPageContent(content);
  assert.equal(document.querySelectorAll(".pi-card .person-photo-frame").length, 0);
  assert.equal(document.querySelectorAll(".pi-card .initials").length, 1);
  content.people.principalInvestigator.photo = "PI_profile.jpg";
  api.renderPageContent(content);
  assert.equal(document.querySelectorAll(".pi-card .person-photo-frame").length, 1);
  assert.equal(document.querySelectorAll(".member-card img, .member-card .initials").length, 0);
  assert.equal(document.querySelectorAll("[data-language-switch]").length, 1);
  assert.equal(document.querySelector("[data-language-switch]").textContent, "English");
  assert.equal(document.querySelector("[data-language-switch]").getAttribute("href"), "../");
});

test("Korean research follows shared ordering and keeps untranslated new topics", async () => {
  const content = await loadContent();
  content.research.cards.reverse();
  content.research.cards.push({ icon: "microscope", title: "New topic", description: "New description" });
  const { api, document } = createRuntime("social-pharmacy/index.html");
  api.renderPageContent(content);
  const headings = [...document.querySelectorAll(".research-card h3")].map((node) => node.textContent);
  assert.equal(headings.length, content.research.cards.length);
  assert.equal(headings[0], content.korean.research.cards.find((card) => card.sourceTitle === content.research.cards[0].title).title);
  assert.equal(headings.at(-1), "New topic");
  const note = content.korean.people.teamNotes.find((item) => item.sourceTitle === "Prospective Members");
  assert.ok(document.querySelector("[data-team-notes]").textContent.includes(note.title));
});

test("Korean archive uses the shared records, search and year filters", async () => {
  const content = await loadContent();
  const { api, document, window } = createRuntime("social-pharmacy/index.html");
  api.renderPageContent(content);
  api.renderPublications([
    { title: "First research", sortDate: "2026-01-01" },
    { title: "Second research", sortDate: "2025-01-01" },
  ]);
  api.setupPublicationViews();
  document.querySelector('[data-publication-view="all"]').click();
  assert.equal(document.querySelectorAll(".publication-row").length, 2);
  const search = document.querySelector("[data-publication-search]");
  search.value = "First";
  search.dispatchEvent(new window.Event("input"));
  assert.equal(document.querySelectorAll(".publication-row").length, 1);
  assert.ok(document.querySelector("[data-publication-summary]").textContent.includes("검색 결과 1편"));
  assert.equal(document.querySelector('[data-publication-year] option[value="all"]').textContent, "전체 연도");
  search.value = "";
  search.dispatchEvent(new window.Event("input"));
  const year = document.querySelector("[data-publication-year]");
  Object.defineProperty(year, "value", { value: "2025", configurable: true });
  year.dispatchEvent(new window.Event("change"));
  assert.equal(document.querySelectorAll(".publication-row").length, 1);
  assert.ok(document.querySelector(".publication-row").textContent.includes("Second research"));
});
