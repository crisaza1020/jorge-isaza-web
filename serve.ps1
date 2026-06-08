$root = Split-Path $MyInvocation.MyCommand.Path
$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Servidor corriendo en http://localhost:$port" -ForegroundColor Green
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow

$mime = @{
  '.html'=  'text/html; charset=utf-8'
  '.css'=   'text/css'
  '.js'=    'application/javascript'
  '.jsx'=   'application/javascript'
  '.svg'=   'image/svg+xml'
  '.png'=   'image/png'
  '.jpg'=   'image/jpeg'
  '.jpeg'=  'image/jpeg'
  '.webp'=  'image/webp'
  '.ico'=   'image/x-icon'
  '.toml'=  'text/plain'
  '.json'=  'application/json'
  '.woff2'= 'font/woff2'
  '.woff'=  'font/woff'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  $path = $req.Url.LocalPath -replace '/', '\'
  if ($path -eq '\') { $path = '\index.html' }
  $file = Join-Path $root $path.TrimStart('\')
  if (Test-Path $file -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $ct = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $res.ContentType = $ct
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
  }
  $res.OutputStream.Close()
}
