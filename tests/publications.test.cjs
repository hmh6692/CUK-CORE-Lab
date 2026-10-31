const test = require("node:test");
const assert = require("node:assert/strict");
const { createRuntime } = require("../scripts/runtime.cjs");

const settings = (extra = {}) => ({
  recentLimit: 5, archiveLimit: 100, pubmedQueries: [], orcidProfiles: [],
  crossrefQueries: [], crossrefDois: [], fallbackPublications: [], ...extra,
});
const record = (extra = {}) => ({
  title: "Saved article", doi: "10.1234/saved", provider: "PubMed", authors: ["Park SK"],
  pubdate: "2026 Aug 25", sortDate: "2026/08/25 00:00", ...extra,
});
const response = (data) => ({ ok: true, json: async () => data });
const fail = async () => { throw new Error("Simulated outage"); };

test("dates sort consistently across ISO, PubMed and partial formats", () => {
  const { api } = createRuntime();
  for (const value of ["2026/08/25 00:00", "2026-08-25", "2026-8-25", "2026 Aug 25"]) {
    assert.equal(api.sortDateValue(value), Date.UTC(2026, 7, 25));
    assert.equal(api.publicationDateInfo(value).precision, 3);
  }
  assert.equal(api.publicationDateInfo("2026-8").precision, 2);
  assert.equal(api.publicationDateInfo("2026").precision, 1);
  assert.equal(api.sortDateValue("2026-02-31"), 0);
  assert.equal(api.sortDateValue("In press"), 0);
});

test("Crossref month-only dates do not replace exact PubMed dates", () => {
  const { api } = createRuntime();
  const result = api.mergePublications([
    record(), record({ title: "Earlier article", doi: "10.1234/earlier", sortDate: "2026/08/04 00:00" }),
    record({ provider: "Crossref", sortDate: "2026-8", pubdate: "2026-8" }),
  ]);
  assert.equal(result.length, 2);
  assert.equal(result[0].title, "Saved article");
  assert.equal(result[0].sortDate, "2026/08/25 00:00");
});

test("precise provider dates enrich year-only saved records", () => {
  const { api } = createRuntime();
  const result = api.mergePublications([record({ provider: "Google Scholar", sortDate: "2026", pubdate: "2026" }), record()]);
  assert.equal(result[0].pubdate, "2026 Aug 25");
  assert.ok(result[0].providers.includes("Google Scholar"));
  assert.ok(result[0].providers.includes("PubMed"));
});

test("Korean titles are not collapsed into empty or identical English-only keys", () => {
  const { api } = createRuntime();
  assert.notEqual(api.normalizePublicationTitle("약학 연구"), api.normalizePublicationTitle("의료 연구"));
  assert.equal(api.mergePublications([record({ title: "약학 연구", doi: "" }), record({ title: "의료 연구", doi: "" })]).length, 2);
});

test("publication links reject executable schemes and escape attributes", () => {
  const { api, document } = createRuntime();
  const list = document.querySelector("[data-publication-list]");
  for (const render of [api.renderPublicationCard, api.renderPublicationArchiveItem]) {
    list.innerHTML = render(record({ title: '<img src=x onerror="bad()">', url: 'https://example.org/" data-audit="unsafe', doi: "" }));
    assert.equal(list.querySelectorAll("[data-audit], img, script").length, 0);
    assert.ok(list.querySelector("h3").textContent.includes("<img"));
    list.innerHTML = render(record({ url: "javascript:alert(1)", doi: "" }));
    assert.equal(list.querySelectorAll("a").length, 0);
  }
  assert.equal(api.safeExternalUrl("data:text/html,bad"), "");
  assert.equal(api.safeExternalUrl("https://user:password@example.org"), "");
  assert.ok(api.publicationLinks(record({ url: "javascript:bad()" })).publicationUrl.startsWith("https://doi.org/"));
});

test("an all-provider outage preserves records and the prior successful check", async () => {
  const { api } = createRuntime("index.html", { fetch: fail });
  const config = settings({ pubmedQueries: [{ term: "Park[Author]" }] });
  const previous = { settingsKey: api.publicationSettingsKey(config), records: [record()], updatedAt: "2026-08-25T00:00:00Z" };
  const result = await api.collectPublications(config, previous);
  assert.equal(result.records.length, 1);
  assert.equal(result.updatedAt, previous.updatedAt);
  assert.equal(result.mode, "saved");
  assert.equal(result.sourceResults[0].status, "error");
});

test("loading uses saved records immediately and does not mislabel an outage", async () => {
  const { api, document } = createRuntime("index.html", { fetch: fail });
  const config = settings({ pubmedQueries: [{ term: "Park[Author]" }], fallbackPublications: [record()] });
  api.renderPublicationSettings(config);
  const task = api.loadPublications(config);
  assert.equal(document.querySelectorAll(".publication-card").length, 1);
  assert.equal(document.querySelector("[data-refresh-publications]").disabled, true);
  await task;
  assert.match(document.querySelector("[data-publication-status]").textContent, /Saved publication records.*unavailable/);
  assert.equal(document.querySelector("[data-refresh-publications]").disabled, false);
});

test("an empty ORCID result is not treated as a successful data update", async () => {
  const { api } = createRuntime("index.html", { fetch: async () => response({ group: [] }) });
  const result = await api.collectPublications(settings({ orcidProfiles: [{ orcid: "0000-0003-4421-4513" }], fallbackPublications: [record()] }));
  assert.equal(result.mode, "saved");
  assert.equal(result.updatedAt, null);
  assert.equal(result.sourceResults[0].status, "empty");
});

test("one failed DOI does not discard a successful DOI lookup", async () => {
  const { api } = createRuntime("index.html", { fetch: async (url) => {
    if (url.includes("missing")) throw new Error("Missing DOI");
    return response({ message: { DOI: "10.1234/good", title: ["Good article"], published: { "date-parts": [[2026, 10, 1]] } } });
  } });
  const result = await api.collectPublications(settings({ crossrefDois: ["10.1234/good", "10.1234/missing"] }));
  assert.equal(result.records.length, 1);
  assert.equal(result.mode, "partial");
  assert.equal(result.sourceResults[0].status, "partial");
});

test("ORCID sorts and deduplicates before applying maxWorks", async () => {
  const work = (title, year, code) => ({ "put-code": code, title: { title: { value: title } }, "publication-date": { year: { value: year } } });
  const { api } = createRuntime("index.html", { fetch: async () => response({ group: [
    { "work-summary": [work("Old", "2020", 1)] },
    { "work-summary": [work("New", "2026", 2), work("New", "2026", 3)] },
  ] }) });
  const result = await api.fetchOrcidPublications(settings({ orcidProfiles: [{ orcid: "test", maxWorks: 1 }] }));
  assert.equal(result.length, 1);
  assert.equal(result[0].title, "New");
});

test("requests abort rather than waiting indefinitely", async () => {
  let aborted = false;
  const { api } = createRuntime("index.html", { fetch: (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => { aborted = true; reject(new Error("Aborted")); });
  }) });
  await assert.rejects(api.requestJson("https://example.org", {}, 10), /Aborted/);
  assert.equal(aborted, true);
});

test("a recent cached list avoids automatic external API requests", async () => {
  let calls = 0;
  const { api, document } = createRuntime("index.html", { fetch: async () => { calls++; throw new Error("Unexpected request"); } });
  const config = settings({ pubmedQueries: [{ term: "Park[Author]" }] });
  const cache = { records: [record()], updatedAt: new Date().toISOString(), settingsKey: api.publicationSettingsKey(config) };
  api.renderPublicationSettings(config);
  await api.loadPublications(config, { refresh: false, cache });
  assert.equal(calls, 0);
  assert.equal(document.querySelectorAll(".publication-card").length, 1);
});

test("a cache from different researcher queries is not reused", () => {
  const { api } = createRuntime();
  assert.equal(api.savedPublicationSnapshot(settings(), { settingsKey: "different", records: [record()] }).records.length, 0);
});

test("publication tabs support arrow keys and panel associations", () => {
  const { api, document, window } = createRuntime();
  api.renderPublications([record()]);
  api.setupPublicationViews();
  const recent = document.querySelector('[data-publication-view="recent"]');
  const all = document.querySelector('[data-publication-view="all"]');
  const event = new window.Event("keydown", { bubbles: true, cancelable: true });
  event.key = "ArrowRight";
  recent.dispatchEvent(event);
  assert.equal(all.getAttribute("aria-selected"), "true");
  assert.equal(document.querySelector("[data-publication-list]").getAttribute("aria-labelledby"), all.id);
  assert.equal(document.querySelector("[data-publication-filters]").hidden, false);
});

test("mobile menu closes on Escape and reports its state", () => {
  const { api, document, window } = createRuntime();
  api.setupNavigation();
  const toggle = document.querySelector("[data-nav-toggle]");
  toggle.click();
  assert.equal(toggle.getAttribute("aria-expanded"), "true");
  assert.equal(toggle.getAttribute("aria-label"), "Close navigation");
  const event = new window.Event("keydown", { bubbles: true });
  event.key = "Escape";
  document.dispatchEvent(event);
  assert.equal(toggle.getAttribute("aria-expanded"), "false");
});
