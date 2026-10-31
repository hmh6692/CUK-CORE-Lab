const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { parseHTML } = require("linkedom");

const root = path.resolve(__dirname, "..");

function createRuntime(page = "index.html", overrides = {}) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  const { document, window } = parseHTML(html);
  if (document.body.hasAttribute("data-main-layout")) {
    // Both languages share the main template; only their content is localized.
    const main = parseHTML(fs.readFileSync(path.join(root, "index.html"), "utf8"));
    document.body.innerHTML = main.document.body.innerHTML;
    document.body.removeAttribute("data-main-layout");
  }
  // Use the same renderers for the browser, offline tests, and search-visible HTML.
  const context = vm.createContext({
    document, window, console, URL, URLSearchParams, AbortController,
    setTimeout, clearTimeout, fetch, CORE_STATIC_RENDER: true, ...overrides,
  });
  vm.runInContext(fs.readFileSync(path.join(root, "script.js"), "utf8"), context, { filename: "script.js" });
  return { document, window, api: context, evaluate: (code) => vm.runInContext(code, context) };
}

module.exports = { createRuntime, root };
