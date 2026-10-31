const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createRuntime, root } = require("../scripts/runtime.cjs");

function loadContent() {
  return Object.fromEntries(["site", "research", "people", "publications", "korean"].map((name) =>
    [name, JSON.parse(fs.readFileSync(path.join(root, `data/${name}.json`), "utf8"))]));
}

test("both languages render the three recruitment questions and local actions", () => {
  const content = loadContent();
  for (const page of ["index.html", "social-pharmacy/index.html"]) {
    const { api, document } = createRuntime(page);
    api.renderPageContent(content);
    const note = (page.startsWith("social") ? content.korean.people : content.people).teamNotes
      .find((item) => item.recruitment);
    assert.equal(document.querySelectorAll(".prospective-note").length, 1);
    assert.deepEqual([...document.querySelectorAll(".recruitment-questions li span")].map((n) => n.textContent),
      note.recruitment.questions.map((q) => q.text));
    assert.equal(document.querySelector(".recruitment-email").getAttribute("href"), "mailto:sk.park@catholic.ac.kr");
    assert.equal(document.querySelector(".recruitment-research").getAttribute("href"), "#research");
    assert.ok(document.querySelector(".prospective-note").textContent.includes(note.recruitment.contactTitle));
    assert.ok(document.getElementById("prospective-members"));
    assert.ok(document.getElementById("research"));
    assert.equal(document.querySelectorAll(".prospective-note form, .prospective-note input").length, 0);
    assert.equal(document.querySelectorAll(".member-card img, .member-card .initials").length, 0);
  }
});

test("recruitment follows the PI email and omits unavailable or unsafe email links", () => {
  const content = loadContent();
  const { api, document } = createRuntime();
  const pi = content.people.principalInvestigator;
  pi.profileLinks = [{ label: "Email", url: "mailto:updated@example.org" }];
  api.renderPageContent(content);
  assert.equal(document.querySelector(".recruitment-email").getAttribute("href"), "mailto:updated@example.org");
  for (const url of ["", "javascript:alert(1)", "mailto:not-an-email"]) {
    pi.profileLinks = [{ label: "Email", url }];
    api.renderPageContent(content);
    assert.equal(document.querySelectorAll(".recruitment-email").length, 0);
    assert.ok(document.querySelector(".recruitment-research"));
  }
});

test("recruitment content is escaped and plain notes retain their original shape", () => {
  const content = loadContent();
  const { api, document } = createRuntime();
  const note = content.people.teamNotes.find((item) => item.recruitment);
  note.recruitment.questions[0].text = '<img src=x onerror="alert(1)">';
  note.recruitment.contactTitle = "<script>alert(1)</script>";
  api.renderPageContent(content);
  assert.equal(document.querySelectorAll(".prospective-note img, .prospective-note script").length, 0);
  assert.ok(document.querySelector(".prospective-note").textContent.includes("<img src=x"));
  delete note.recruitment;
  api.renderPageContent(content);
  assert.equal(document.querySelectorAll(".recruitment-questions, .recruitment-contact").length, 0);
  assert.equal(document.querySelector(".team-notes h3").textContent, note.title);
});

test("empty optional CMS details keep a plain note and blank labels stay accessible", () => {
  const content = loadContent();
  const { api, document } = createRuntime();
  const note = content.people.teamNotes.find((item) => item.recruitment);
  note.recruitment.emailLabel = "";
  note.recruitment.researchLabel = "";
  note.recruitment.questionsTitle = "";
  api.renderPageContent(content);
  assert.equal(document.querySelector(".recruitment-email span").textContent, "Email the PI");
  assert.equal(document.querySelector(".recruitment-research span").textContent, "Explore our research");
  assert.equal(document.querySelector(".recruitment-questions h4").textContent, "Questions we explore");
  note.recruitment = {};
  api.renderPageContent(content);
  assert.equal(document.querySelectorAll(".prospective-note, .recruitment-contact").length, 0);
  assert.ok(document.querySelector(".team-notes p").textContent);
});

test("partial Korean recruitment translations retain the shared research questions", () => {
  const content = loadContent();
  const english = content.people.teamNotes.find((item) => item.recruitment);
  const korean = content.korean.people.teamNotes.find((item) => item.recruitment);
  korean.recruitment = { contactTitle: "연구 문의" };
  const { api, document } = createRuntime("social-pharmacy/index.html");
  api.renderPageContent(content);
  assert.equal(document.querySelector(".recruitment-contact h4").textContent, "연구 문의");
  assert.deepEqual([...document.querySelectorAll(".recruitment-questions li span")].map((n) => n.textContent),
    english.recruitment.questions.map((q) => q.text));
});
