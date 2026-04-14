$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

Write-Host "Building extension..."
npm run build | Out-Host

$targetDir = Join-Path $root "load-unpacked"
if (Test-Path $targetDir) { Remove-Item $targetDir -Recurse -Force }
New-Item -ItemType Directory -Path $targetDir | Out-Null

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
    Copy-Item -Path $source -Destination $targetDir -Recurse -Force
  }
}

Write-Host "Local unpacked folder ready: $targetDir"
