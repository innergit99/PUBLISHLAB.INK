[System.Environment]::SetEnvironmentVariable("HOME", [System.Environment]::GetEnvironmentVariable("USERPROFILE"), "User")
[System.Environment]::SetEnvironmentVariable("HOME", [System.Environment]::GetEnvironmentVariable("USERPROFILE"), "Process")
Write-Host "HOME Environment variable set to: $([System.Environment]::GetEnvironmentVariable('HOME'))"
