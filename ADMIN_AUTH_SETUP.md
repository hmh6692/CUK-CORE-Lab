# Admin Editing Setup

This site uses Decap CMS for browser-based editing at `/admin/`.

There are two realistic setup paths.

## Option A: Netlify Identity + Git Gateway

This is the easiest option for non-developer editors.

Use this when editors should log in by email and should not need GitHub repository access.

Important note: Netlify currently marks Git Gateway as deprecated, but it still functions for sites that have it enabled. It remains one of the simplest Decap CMS setups for non-technical editors.

### Steps

1. Push this project to GitHub.
2. In Netlify, create a new project from that GitHub repository.
3. Keep the default build settings from `netlify.toml`.
   - Build command: defined in `netlify.toml`
   - Publish directory: `_site`
4. After the first deploy, open the Netlify project dashboard.
5. Go to `Project configuration > Identity`.
6. Enable Identity.
7. Set registration to invite-only.
8. Go to `Project configuration > Identity > Services > Git Gateway`.
9. Enable Git Gateway.
10. Invite the editor by email from the Identity users screen.
11. Ask the editor to open:

```text
https://YOUR-NETLIFY-SITE.netlify.app/admin/
```

When the editor saves changes, Decap CMS commits updates to the connected GitHub repository.

If GitHub Pages is also enabled for the same repository, the GitHub Pages workflow will redeploy the public site after those commits.

## Option B: GitHub Pages + GitHub OAuth Provider

Use this when the public website must stay on GitHub Pages and the admin screen should also run there.

This is more technical because GitHub does not allow Decap CMS to perform OAuth entirely in the browser. You need an OAuth provider service.

### Required change

Replace the top backend block in `admin/config.yml`:

```yml
backend:
  name: git-gateway
  branch: main
```

with:

```yml
backend:
  name: github
  repo: OWNER/REPOSITORY
  branch: main
  base_url: https://YOUR-OAUTH-PROVIDER.example.com
```

`OWNER/REPOSITORY` is the GitHub repository, for example:

```text
your-github-name/cuk-core-lab
```

The OAuth provider must be configured with a GitHub OAuth app and must be allowed to write to the repository.

In this mode, editors usually need GitHub accounts with write access, unless the OAuth provider implements a more advanced permission model.

## Recommendation

For this lab website, use Option A first:

```text
GitHub repository -> Netlify admin editing -> GitHub Pages or Netlify public hosting
```

This gives the least friction for non-developer editors.
