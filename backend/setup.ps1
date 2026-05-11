# Script de Setup Automático para Windows PowerShell
# Salvar como: setup.ps1
# Executar: PowerShell -ExecutionPolicy Bypass -File setup.ps1

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║    Studio Zen - Backend Setup Automático               ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Node.js
Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js não encontrado. Instale de: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# 2. Instalar dependências
Write-Host ""
Write-Host "📚 Instalando dependências npm..." -ForegroundColor Yellow
cd backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências instaladas com sucesso" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

# 3. Verificar .env
Write-Host ""
Write-Host "⚙️  Verificando arquivo .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ Arquivo .env encontrado" -ForegroundColor Green
    Write-Host "⚠️  Edite .env se necessário com suas credenciais MySQL" -ForegroundColor Yellow
} else {
    Write-Host "❌ Arquivo .env não encontrado" -ForegroundColor Red
}

# 4. Verificar MySQL
Write-Host ""
Write-Host "🗄️  Verificando MySQL..." -ForegroundColor Yellow
if (Get-Command mysql -ErrorAction SilentlyContinue) {
    $mysqlVersion = mysql --version
    Write-Host "✅ MySQL detectado: $mysqlVersion" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "🔧 Deseja criar o banco de dados agora? (S/N)" -ForegroundColor Yellow
    $response = Read-Host
    
    if ($response -eq "S" -or $response -eq "s") {
        Write-Host "Criando banco de dados..." -ForegroundColor Yellow
        mysql -u root < database.sql
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Banco de dados criado com sucesso" -ForegroundColor Green
        } else {
            Write-Host "❌ Erro ao criar banco de dados" -ForegroundColor Red
            Write-Host "Dica: MySQL pode pedir senha. Edite .env com a senha correta" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "⚠️  MySQL não encontrado no PATH" -ForegroundColor Yellow
    Write-Host "📖 Para criar o banco de dados manualmente:" -ForegroundColor Cyan
    Write-Host "   1. Abra MySQL Workbench ou MySQL Command Line" -ForegroundColor Cyan
    Write-Host "   2. Abra o arquivo: backend/database.sql" -ForegroundColor Cyan
    Write-Host "   3. Execute (Ctrl+Enter)" -ForegroundColor Cyan
}

# 5. Pronto para iniciar
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║    ✅ Setup Concluído!                                 ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Para iniciar o servidor:" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "📝 Credenciais Admin Padrão:" -ForegroundColor Cyan
Write-Host "   Email: admin@studiuzen.com" -ForegroundColor White
Write-Host "   Senha: admin123" -ForegroundColor White
Write-Host ""
Write-Host "📖 Para mais informações, leia: README-BACKEND.md" -ForegroundColor Yellow
