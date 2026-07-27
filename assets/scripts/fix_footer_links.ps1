$files = Get-ChildItem -Path "." -Filter "*.html"
$updatedCount = 0

foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw -Encoding UTF8
    $changed = $c

    # Pattern 1: <a href="#">Downloads</a>  (product-detail-* pages)
    $changed = $changed -replace '<a href="#">Downloads</a>', '<a href="resources.html#pane-downloads">Downloads</a>'
    $changed = $changed -replace '<a href="#">Videos</a>', '<a href="resources.html#pane-videos">Videos</a>'
    $changed = $changed -replace '<a href="#">All Resources</a>', '<a href="resources.html">All Resources</a>'

    # Pattern 2: <a href="resources.html">Downloads</a>  (solution-reference style)
    $changed = $changed -replace '<a href="resources\.html">Downloads</a>', '<a href="resources.html#pane-downloads">Downloads</a>'
    $changed = $changed -replace '<a href="resources\.html">Videos</a>', '<a href="resources.html#pane-videos">Videos</a>'

    if ($c -ne $changed) {
        Set-Content -Path $f.FullName -Value $changed -Encoding UTF8 -NoNewline
        $updatedCount++
        Write-Host "Updated: $($f.Name)"
    }
}

Write-Host "Done. $updatedCount file(s) updated."
