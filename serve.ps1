$port = 8080
$address = [System.Net.IPAddress]::Any
$listener = New-Object System.Net.Sockets.TcpListener($address, $port)
$listener.Start()

Write-Host "Robust Server started on Port $port (All Interfaces)"
Write-Host "This version ignores Host header issues for Tunneling."
Write-Host "Press Ctrl+C to stop."

try {
    while ($true) {
        if ($listener.Pending()) {
            $client = $listener.AcceptTcpClient()
            $stream = $client.GetStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $writer = New-Object System.IO.StreamWriter($stream)
            $writer.AutoFlush = $true

            $requestLine = $reader.ReadLine()
            if ($requestLine) {
                $parts = $requestLine.Split(' ')
                $path = $parts[1]
                if ($path -eq "/") { $path = "/index.html" }
                $filePath = Join-Path (Get-Location) $path.TrimStart('/')

                if (Test-Path $filePath -PathType Leaf) {
                    $content = [System.IO.File]::ReadAllBytes($filePath)
                    $extension = [System.IO.Path]::GetExtension($filePath)
                    $contentType = switch ($extension) {
                        ".html" { "text/html" }
                        ".css" { "text/css" }
                        ".js" { "application/javascript" }
                        ".json" { "application/json" }
                        ".png" { "image/png" }
                        ".jpg" { "image/jpeg" }
                        default { "application/octet-stream" }
                    }

                    $writer.WriteLine("HTTP/1.1 200 OK")
                    $writer.WriteLine("Content-Type: $contentType")
                    $writer.WriteLine("Content-Length: $($content.Length)")
                    $writer.WriteLine("Access-Control-Allow-Origin: *")
                    $writer.WriteLine("Cache-Control: no-cache, no-store, must-revalidate")
                    $writer.WriteLine("")
                    $writer.Flush()
                    $stream.Write($content, 0, $content.Length)
                }
                else {
                    $writer.WriteLine("HTTP/1.1 404 Not Found")
                    $writer.WriteLine("")
                }
            }
            $client.Close()
        }
        Start-Sleep -Milliseconds 50
    }
}
finally {
    $listener.Stop()
}
