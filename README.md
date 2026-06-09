# CUK-CORE Lab Website

This is a static lab website with a browser-based editor at `/admin/`.

For GitHub Pages hosting, see `GITHUB_PAGES.md`.

## Local Preview

```powershell
python -m http.server 8080 --bind 127.0.0.1
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

Images uploaded through the admin UI are stored in:

- `assets/uploads/`

## Admin Setup

The admin screen uses Decap CMS with Netlify Identity and Git Gateway.

1. Push this folder to a GitHub repository.
2. Deploy the repository on Netlify.
3. In Netlify, enable Identity.
4. Set registration to Invite only.
5. Enable Git Gateway.
6. Invite the site editor by email.
7. Open `/admin/` on the deployed site and log in.

After the editor saves changes, Decap CMS commits the updated JSON/images to GitHub, and Netlify redeploys the public website.
