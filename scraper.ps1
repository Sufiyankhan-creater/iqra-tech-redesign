$urls = @{
    "huruf-e-jar" = "https://wordtowordqurantranslation.com/huruf-e-jar/"
    "attached-pronouns" = "https://wordtowordqurantranslation.com/attached-pronouns/"
    "detached-pronouns" = "https://wordtowordqurantranslation.com/detached-pronouns/"
    "past-tense" = "https://wordtowordqurantranslation.com/past-tense/"
    "universal-tense" = "https://wordtowordqurantranslation.com/universal-tense/"
}

$allData = @{}

foreach ($key in $urls.Keys) {
    $url = $urls[$key]
    Write-Host "Fetching $key..."
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        $html = $response.Content

        # Extract table rows using regex
        $rows = [regex]::Matches($html, '(?s)<tr.*?>(.*?)</tr>')
        $extractedItems = @()

        foreach ($rowMatch in $rows) {
            $rowHtml = $rowMatch.Groups[1].Value
            $cols = [regex]::Matches($rowHtml, '(?s)<td.*?>(.*?)</td>')
            
            if ($cols.Count -ge 3) {
                # Clean HTML tags and entities
                $arabic = $cols[0].Groups[1].Value -replace '<[^>]+>', '' -replace '&\w+;', ''
                $urdu = $cols[1].Groups[1].Value -replace '<[^>]+>', '' -replace '&\w+;', ''
                $english = $cols[2].Groups[1].Value -replace '<[^>]+>', '' -replace '&\w+;', ''
                
                $arabic = $arabic.Trim()
                $urdu = $urdu.Trim()
                $english = $english.Trim()

                if ($arabic -ne "") {
                    $item = @{
                        "arabic" = $arabic
                        "urdu" = $urdu
                        "english" = $english
                    }
                    $extractedItems += $item
                }
            }
        }

        # Filter out header row if present
        if ($extractedItems.Count -gt 0 -and $extractedItems[0].arabic -match '(?i)arabic') {
            $extractedItems = $extractedItems[1..($extractedItems.Count - 1)]
        }

        $allData[$key] = $extractedItems
        Write-Host "Extracted $($extractedItems.Count) items for $key"
    } catch {
        Write-Host "Failed to fetch ${key}: $_"
    }
}

$allData | ConvertTo-Json -Depth 5 > scraped_grammar.json
Write-Host "Done saving scraped_grammar.json"
