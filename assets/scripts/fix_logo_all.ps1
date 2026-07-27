# Fix logo-img height to 50 in all HTML files
$files = Get-ChildItem -Filter "*.html" -File
$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Match the logo img tag with id="logo-img" and update height from any value to 50
    # Also ensure width=130 is kept
    $original = $content
    
    # Fix height="35" -> height="50" in the logo-img tag
    # Use a pattern that targets the src="images/Artboard-1.png" nearby
    $updated = $content -replace '(<img\s[^>]*id="logo-img"[^>]*height=")[^"]*(")', '${1}50${2}'
    
    # Also ensure width stays 130
    $updated = $updated -replace '(<img\s[^>]*id="logo-img"[^>]*width=")[^"]*(")', '${1}130${2}'
    
    if ($updated -ne $original) {
        Set-Content $file.FullName $updated -NoNewline
        Write-Output "Updated: $($file.Name)"
        $count++
    }
}

Write-Output "`nDone! Updated $count files."
