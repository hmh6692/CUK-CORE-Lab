# Google Search Setup

Public site URL:

```text
https://cukcorelab.catholic.ac.kr/
```

Sitemap URL:

```text
https://cukcorelab.catholic.ac.kr/sitemap.xml
```

## Search Console Steps

1. Open Google Search Console:
   `https://search.google.com/search-console`
2. Add a new property.
3. Choose `URL prefix`.
4. Enter:
   `https://cukcorelab.catholic.ac.kr/`
5. Verify ownership.
   - The easiest option for this site is usually `HTML tag`.
   - If Google gives you a `google-site-verification` meta tag, add it to `index.html`.
   - If Google gives you an HTML verification file, place it in the project root and deploy.
6. After verification, open `Sitemaps`.
7. Submit:
   `sitemap.xml`
8. Use URL Inspection for:
   `https://cukcorelab.catholic.ac.kr/`
9. Click `Request indexing`.

## Helpful Follow-up

Ask official university/profile pages to link to the lab website. Good places include the PI faculty page, college/lab directory, ORCID profile, Google Scholar profile, and department announcements. These links help Google discover and trust the site.

Google indexing is not immediate. It may take several days or longer for a new site to appear in search results.
