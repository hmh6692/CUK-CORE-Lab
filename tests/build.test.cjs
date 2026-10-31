const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");
const { parseHTML } = require("linkedom");
const { build } = require("../scripts/build.cjs");
const { createRuntime, root } = require("../scripts/runtime.cjs");

test("offline build retains complete source data and pre-renders public content", async () => {
  const { output, cache } = await build({ offline: true });
  const people = JSON.parse(await fs.readFile(path.join(root, "data/people.json"), "utf8"));
  const settings = JSON.parse(await fs.readFile(path.join(root, "data/publications.json"), "utf8"));
  const memberCount = people.members.filter((member) => member.name).length;
  const recentCount = Math.min(settings.recentLimit, cache.records.length);
  for (const page of ["index.html", "social-pharmacy/index.html"]) {
    const html = await fs.readFile(path.join(output, page), "utf8");
    const { document } = parseHTML(html);
    assert.ok(document.title.length > 0);
    const content = JSON.parse(document.querySelector("[data-site-content]").textContent);
    assert.equal(content.people.members.length, people.members.length);
    assert.ok(document.querySelector('script[type="application/ld+json"]'));
    for (const element of document.querySelectorAll("[src], link[href]")) {
      const reference = element.getAttribute("src") || element.getAttribute("href");
      if (!reference || /^(?:https?:|\/\/|#)/.test(reference)) continue;
      const target = path.resolve(path.dirname(path.join(output, page)), reference.split("?")[0]);
      assert.ok(target.startsWith(output + path.sep));
      await fs.access(target);
    }
    if (page === "index.html") {
      assert.equal(document.querySelectorAll(".member-card").length, memberCount);
      assert.equal(document.querySelectorAll(".member-card img, .member-card .initials").length, 0);
      assert.equal(document.querySelectorAll(".publication-card").length, recentCount);
      assert.ok(document.querySelector(".pi-card").textContent.includes(people.principalInvestigator.name));
      assert.ok(document.querySelector('meta[name="google-site-verification"]'));
      assert.equal(document.querySelectorAll('.site-nav a[href="social-pharmacy/"]').length, 0);
      assert.equal(document.querySelectorAll('script[src*="netlify-identity"]').length, 0);
    }
  }
  for (const file of ["admin/index.html", "admin/bootstrap.js", "admin/config.yml", "data/korean.json", "data/publications-cache.json"]) await fs.access(path.join(output, file));
  for (const file of ["package.json", "scripts/build.cjs", "README.md", "server.log"]) await assert.rejects(fs.access(path.join(output, file)));

  const fallback = createRuntime("_site/index.html", {
    fetch: async () => { throw new Error("Local data request unavailable"); },
    window: { location: { hash: "", search: "" } },
  });
  await fallback.api.init();
  assert.equal(fallback.document.querySelectorAll(".member-card").length, memberCount);
  assert.equal(fallback.document.querySelectorAll(".publication-card").length, recentCount);
  assert.ok(fallback.document.querySelector("[data-publication-summary]").textContent.includes(`${cache.records.length} total`));
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
  const site = JSON.parse(await fs.readFile(path.join(root, "data/site.json"), "utf8"));
  const people = JSON.parse(await fs.readFile(path.join(root, "data/people.json"), "utf8"));
  const korean = JSON.parse(await fs.readFile(path.join(root, "data/korean.json"), "utf8"));
  people.principalInvestigator.localBio = "Updated biography";
  people.principalInvestigator.title = "Updated academic title";
  people.principalInvestigator.photo = "assets/uploads/new-photo.jpg";
  site.contact.email = "updated@example.org";
  const { api, document } = createRuntime("social-pharmacy/index.html");
  api.renderKoreanPage(site, people, korean);
  assert.equal(document.querySelector("[data-local-bio]").textContent, "Updated biography");
  assert.equal(document.querySelector(".local-profile-photo").getAttribute("src"), "../assets/uploads/new-photo.jpg");
  assert.equal(document.querySelector(".contact-link").getAttribute("href"), "mailto:updated@example.org");
  const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(schema["@graph"].find((item) => item["@type"] === "Person").jobTitle, "Updated academic title");
});
