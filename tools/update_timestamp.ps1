$currentDate = Get-Date -Format "yyyy-MM-dd"
$sitemapPath = Join-Path $PSScriptRoot "..\sitemap.xml"
$humansPath = Join-Path $PSScriptRoot "..\humans.txt"

# Update sitemap.xml
if (Test-Path $sitemapPath) {
    echo "Updating sitemap.xml..."
    (Get-Content $sitemapPath) -replace "<lastmod>.*?</lastmod>", "<lastmod>$currentDate</lastmod>" | Set-Content $sitemapPath
    echo "sitemap.xml updated to $currentDate"
} else {
    echo "sitemap.xml not found at $sitemapPath"
}

# Update humans.txt
if (Test-Path $humansPath) {
    echo "Updating humans.txt..."
    (Get-Content $humansPath) -replace "Last update: .*", "Last update: $(Get-Date -Format 'yyyy/MM/dd')" | Set-Content $humansPath
    echo "humans.txt updated"
} else {
    echo "humans.txt not found at $humansPath"
}
