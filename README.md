# CUK-CORE Lab Website

This is a static lab website with a browser-based editor at
`https://cuk-core-lab.netlify.app/admin/`. The school-domain `/admin/` redirects there.

For GitHub Pages hosting, see `GITHUB_PAGES.md`.
For browser-based admin editing setup, see `ADMIN_AUTH_SETUP.md`.

## Local Preview

```powershell
npm ci --ignore-scripts
npm test
npm run build:offline
python -m http.server 8080 --bind 127.0.0.1 --directory _site
```

Then open:

```text
http://127.0.0.1:8080/
```

## Content Files

Editable site content is stored in:

- `data/site.json`
- `data/research.json`
- `data/people.json`
- `data/publications.json`
- `data/korean.json`

Both languages share the main page layout: About, Research, Publications,
People and Contact. The build inserts the body of `index.html` into the Korean
page template, then uses the same renderers and publication cache for both.
Always preview `_site/` after building, not the source Korean template.

People, profile photos, student details, academic experience and publication
records come from the same source files. The Korean biography is edited under
People; translated section text is edited under Korean Page. Research topics
and team notes are matched by their English title, so reordering does not attach
the wrong translation. A new or renamed item uses English until translated.
The main page has no additional Korean navigation tab. The Korean page retains
an English return link and remains excluded from search indexing.

The Prospective Members note includes research questions and inquiry links.
Edit it under People > People Section Notes > Prospective Members Details;
edit its Korean text under Korean Page > People > Team Notes. The email button
uses the PI's Email profile link, so no additional email address needs updating.
These optional details do not change the appearance of other team notes.
Local examples in `previews/` are not included in the public build.

## Build and Publications

Node.js 22 or later is required only at build time. The published site remains
static HTML/CSS/JavaScript; there is no PHP or application server.

- `npm run build` fetches the configured public APIs and creates `_site/` for both hosts.
- `npm run build:offline` uses committed publication data without network access.
- `npm run snapshot` refreshes `data/publications-cache.json`, the committed recovery copy.
- `npm run optimize:images` regenerates web-sized images without changing the originals.

The build pre-renders CMS data and the five most recent publications into HTML.
The complete list, search and year filters continue to work in the browser.
Stored records remain visible during a refresh or API outage. Source errors,
empty ORCID works, and the last successful check are reported separately.

GitHub Pages rebuilds daily at 21:17 UTC (06:17 KST), after main-branch changes,
and on manual workflow dispatch. Scheduled runs can be delayed; GitHub can
disable schedules after 60 days without repository activity. Check Actions
periodically. The browser also attempts a refresh when the saved check is over
24 hours old, and the refresh button can check the live sources at any time.

Netlify rebuilds on repository changes. Both builds retain previously deployed
publication records if an upstream API fails. An ORCID iD with no public works
does not supply publication records; manage visibility in ORCID separately.

To roll back a release, revert its Git commit and let the same deploy workflows
run again. Source photos and the original logo are retained in the repository.

Images uploaded through the admin UI are stored in:

- `assets/uploads/`

## Admin Setup

The admin screen uses Decap CMS. The active configuration is ready for Netlify Identity and Git Gateway.

1. Push this folder to a GitHub repository.
2. Deploy the repository on Netlify.
3. In Netlify, enable Identity.
4. Set registration to Invite only.
5. Enable Git Gateway.
6. Invite the site editor by email.
7. Open `/admin/` on the deployed Netlify site and log in.

After the editor saves changes, Decap CMS commits the updated JSON/images to GitHub.
GitHub Pages and Netlify run the same build. Public content and search metadata
are regenerated from the saved data; no hand-editing of deployed HTML is needed.
