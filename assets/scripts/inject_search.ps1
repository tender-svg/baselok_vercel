# Inject search.js into all HTML files that have the searchbox
$files = Get-ChildItem -Path "." -Filter "*.html"
$updatedCount = 0

foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw -Encoding UTF8
    
    # Only process files that have the search form and DON'T already have search.js
    if ($c -match 'id="searchbox"' -and $c -notmatch 'search\.js') {
        # Inject before closing </body> tag
        $changed = $c -replace '</body>', '<script src="js/search.js"></script></body>'
        
        Set-Content -Path $f.FullName -Value $changed -Encoding UTF8 -NoNewline
        $updatedCount++
        Write-Host "Injected search.js into: $($f.Name)"
    }
}

Write-Host "Done. Injected into $updatedCount file(s)."
