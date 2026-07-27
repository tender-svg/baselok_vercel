# Fix logo-img height back to 35 in all HTML files
$files = Get-ChildItem -Filter "*.html" -File
$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Match the logo img tag with id="logo-img" and update height back to 35
    $original = $content
    $updated = $content -replace '(<img\s[^>]*id="logo-img"[^>]*height=")[^"]*(")', '${1}35${2}'
    $updated = $updated -replace '(<img\s[^>]*id="logo-img"[^>]*width=")[^"]*(")', '${1}130${2}'
    
    if ($updated -ne $original) {
        Set-Content $file.FullName $updated -NoNewline
        Write-Output "Updated: $($file.Name)"
        $count++
    }
}

Write-Output "`nDone! Updated $count files."
