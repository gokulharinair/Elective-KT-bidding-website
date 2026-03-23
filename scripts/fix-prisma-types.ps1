$target = 'C:\Users\gokul\Documents\MIS - KT Website\node_modules\@prisma\client\.prisma'
$source = 'C:\Users\gokul\Documents\MIS - KT Website\node_modules\.prisma'
if (Test-Path $target) {
  Remove-Item $target -Recurse -Force
  Write-Host 'Removed existing .prisma'
}
cmd /c mklink /J "$target" "$source"
$exists = Test-Path "$target\client\index.d.ts"
Write-Host "Types linked: $exists"
