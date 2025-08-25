$outputPath = "D:\Sites\darkei eliahou\frontend\public\fonts\playfair-display-var.woff2"
$fontUrl = "https://cdn.jsdelivr.net/gh/googlefonts/PlayfairDisplay/fonts/variable/PlayfairDisplay[wght].woff2"

try {
    Invoke-WebRequest -Uri $fontUrl -OutFile $outputPath
    Write-Host "Downloaded Playfair Display variable font successfully to $outputPath"
} catch {
    Write-Host "Error downloading font: $_"
}
