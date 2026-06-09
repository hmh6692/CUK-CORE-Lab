# GitHub Pages Hosting

This repository is ready for GitHub Pages hosting.

## Setup

1. Create a GitHub repository.
2. Upload or push this project to the repository.
3. Use `main` as the default branch.
4. In the repository, go to `Settings > Pages`.
5. Set `Build and deployment > Source` to `GitHub Actions`.
6. Open the `Actions` tab and confirm that `Deploy to GitHub Pages` completed successfully.

The workflow in `.github/workflows/pages.yml` publishes only the public website files. It does not publish the CV document, local logs, or other workspace-only files.

## Admin Editing

GitHub Pages can host the public website, but it does not provide a backend for Decap CMS authentication.

For browser-based editing, use one of these approaches:

1. Recommended: deploy the same GitHub repository to Netlify and use the Netlify `/admin/` URL for editing.
2. Advanced: keep the site on GitHub Pages and configure Decap CMS with a GitHub OAuth provider.

See `ADMIN_AUTH_SETUP.md` for details.
