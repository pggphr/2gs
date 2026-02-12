param(
  [string]$BaseUrl = "https://pgrce.github.io/g2solutions"
)

$ErrorActionPreference = "Stop"

$entries = @(
  @{ Loc = "/en/"; File = "en/index.html"; Changefreq = "weekly" },
  @{ Loc = "/hr/"; File = "hr/index.html"; Changefreq = "weekly" },
  @{ Loc = "/en/it-support/"; File = "en/it-support/index.html"; Changefreq = "monthly" },
  @{ Loc = "/en/financial-consulting/"; File = "en/financial-consulting/index.html"; Changefreq = "monthly" },
  @{ Loc = "/en/training/"; File = "en/training/index.html"; Changefreq = "monthly" },
  @{ Loc = "/en/about/"; File = "en/about/index.html"; Changefreq = "monthly" },
  @{ Loc = "/hr/it-support/"; File = "hr/it-support/index.html"; Changefreq = "monthly" },
  @{ Loc = "/hr/financial-consulting/"; File = "hr/financial-consulting/index.html"; Changefreq = "monthly" },
  @{ Loc = "/hr/training/"; File = "hr/training/index.html"; Changefreq = "monthly" },
  @{ Loc = "/hr/o-nama/"; File = "hr/o-nama/index.html"; Changefreq = "monthly" }
)

$nl = [Environment]::NewLine
$xml = New-Object System.Text.StringBuilder
[void]$xml.Append("<?xml version=""1.0"" encoding=""UTF-8""?>$nl")
[void]$xml.Append("<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">$nl")

foreach ($entry in $entries) {
  if (-not (Test-Path $entry.File)) {
    throw "Missing source file for sitemap entry: $($entry.File)"
  }

  $lastMod = (Get-Item $entry.File).LastWriteTimeUtc.ToString("yyyy-MM-dd")
  $loc = ($BaseUrl.TrimEnd("/")) + $entry.Loc
  [void]$xml.Append("  <url><loc>$loc</loc><lastmod>$lastMod</lastmod><changefreq>$($entry.Changefreq)</changefreq></url>$nl")
}

[void]$xml.Append("</urlset>$nl")
$xml.ToString() | Set-Content -Path "sitemap.xml" -Encoding UTF8 -NoNewline
