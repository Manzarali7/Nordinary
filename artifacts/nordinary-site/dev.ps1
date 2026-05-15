# Run from repo root or here — always uses this folder as cwd.
Set-Location $PSScriptRoot
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Write-Host "pnpm not found. Install pnpm or run: npm run dev" -ForegroundColor Red
  exit 1
}
pnpm dev
