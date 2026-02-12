# G2 Solutions website

Structured website for G2 Solutions with service-focused pages:
- IT Support
- Financial Consulting
- Training & Development

This is a new version of the website. The existing site remains unchanged.

## Quality checks

- Regenerate sitemap with file-based `lastmod` dates:
  - `powershell -ExecutionPolicy Bypass -File scripts/update-sitemap.ps1`
  - Optional base URL override (Azure SWA/custom domain):
    - `powershell -ExecutionPolicy Bypass -File scripts/update-sitemap.ps1 -BaseUrl "https://your-domain"`
- CI workflow (`.github/workflows/site-quality.yml`) runs:
  - HTML validation
  - Link checking
  - Lighthouse CI assertions
