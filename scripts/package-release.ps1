$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

Write-Host "Building extension..."
npm run build | Out-Host

$manifestPath = Join-Path $root "manifest.json"
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$version = $manifest.version

$stagingDir = Join-Path $root ".release"
$releaseDir = Join-Path $root "release"
$zipName = "hypixel-daily-skip-v$version.zip"
$zipPath = Join-Path $releaseDir $zipName
$rootZipPath = Join-Path $root "upload.zip"

if (Test-Path $stagingDir) { Remove-Item $stagingDir -Recurse -Force }
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
if (Test-Path $rootZipPath) { Remove-Item $rootZipPath -Force }

New-Item -ItemType Directory -Path $stagingDir | Out-Null
New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null

$includeItems = @(
  "manifest.json",
  "popup.html",
  "options.html",
  "dist",
  "_locales",
  "assets"
)

foreach ($item in $includeItems) {
  $source = Join-Path $root $item
  if (Test-Path $source) {
    Copy-Item -Path $source -Destination $stagingDir -Recurse -Force
  }
}

Compress-Archive -Path (Join-Path $stagingDir "*") -DestinationPath $zipPath -CompressionLevel Optimal
Copy-Item -Path $zipPath -Destination $rootZipPath -Force

Write-Host "Release zip created: $zipPath"
Write-Host "Upload zip created: $rootZipPath"
