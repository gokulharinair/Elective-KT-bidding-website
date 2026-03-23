$logDir = 'C:\Users\gokul\AppData\Local\Temp\nextlogs'
if (!(Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
Start-Process 'C:\Program Files\nodejs\node.exe' `
  -ArgumentList @('node_modules\next\dist\bin\next', 'dev') `
  -WorkingDirectory 'C:\Users\gokul\Documents\MIS - KT Website' `
  -WindowStyle Hidden `
  -RedirectStandardOutput "$logDir\out.log" `
  -RedirectStandardError "$logDir\err.log"
Write-Host 'Server starting...'
Start-Sleep -Seconds 8
Get-Content "$logDir\out.log" -Tail 8
