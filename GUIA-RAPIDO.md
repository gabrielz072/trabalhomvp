# 🚀 GUIA RÁPIDO DE INSTALAÇÃO

## 1️⃣ Preparar MySQL

```bash
# Se não tem MySQL instalado:
# Windows: https://dev.mysql.com/downloads/mysql/

# Criar banco de dados (no MySQL Command Line):
mysql -u root -p

# No prompt MySQL:
mysql> CREATE DATABASE studio_zen;
mysql> exit
```

## 2️⃣ Instalar Node.js

Se não tiver: https://nodejs.org/ (recomendado LTS)

## 3️⃣ Setup Backend

```bash
# Abrir terminal/PowerShell na pasta backend:
cd backend

# Instalar dependências:
npm install

# Editar .env com suas credenciais MySQL (se necessário)
# Padrão: root sem senha

# Criar tabelas (executar script SQL):
mysql -u root < database.sql

# OU via MySQL Workbench:
# 1. Abrir database.sql
# 2. Executar (Ctrl+Enter)
```

## 4️⃣ Rodar Backend

```bash
npm start

# Você verá:
# 🚀 Servidor rodando em http://localhost:3000
# 📊 Ambiente: development
# 💾 Banco de dados: studio_zen
```

## 5️⃣ Testar Login

**Credenciais Admin Padrão:**
- Email: `admin@studiuzen.com`
- Senha: `admin123`

Abra em seu navegador:
```
http://localhost:3000/api/health
```

Você deve ver: `{"status":"OK","message":"Backend is running"}`

## 6️⃣ Usar no Frontend

1. Abrir `home/user e adm/telalogin/login.html` no navegador
2. Testar login com credenciais acima
3. Ou criar novo usuário em `cadastro.html`

## ⚠️ Erros Comuns

### "Connection refused"
- MySQL não está rodando
- Windows: Services → MySQL → Start
- Verificar `DB_HOST` e `DB_PORT` no `.env`

### "Database does not exist"
- Executar: `mysql -u root < backend/database.sql`

### CORS error
- Ter certeza que backend está em `http://localhost:3000`
- Verificar `CORS_ORIGIN` no `.env`

---

✅ Pronto! Seu sistema de autenticação está funcionando!
