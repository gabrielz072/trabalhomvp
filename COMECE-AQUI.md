# 🚀 COMEÇAR AGORA - 5 MINUTOS

## 1️⃣ Abra o Terminal na Pasta Backend

```bash
cd backend
```

## 2️⃣ Instale as Dependências

```bash
npm install
```

## 3️⃣ Crie o Banco de Dados

### Opção A - Linha de Comando (Mais Rápido)
```bash
mysql -u root < database.sql
```

### Opção B - MySQL Workbench (Se preferir GUI)
1. Abra MySQL Workbench
2. Clique em "File" → "Open SQL Script"
3. Selecione: `backend/database.sql`
4. Pressione `Ctrl+Enter` para executar

## 4️⃣ Inicie o Backend

```bash
npm start
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
```

## 5️⃣ Acesse o Sistema

Abra no navegador:
```
home/user e adm/telalogin/login.html
```

## 🔑 Login Admin

- **Email:** `admin@studiuzen.com`
- **Senha:** `admin123`

---

## ❓ Erros Comuns

### "mysql: not found"
- Instale MySQL ou adicione ao PATH

### "ECONNREFUSED"
- MySQL não está rodando
- Windows: Services → MySQL → Start

### "npm: not found"
- Instale Node.js: https://nodejs.org/

### "Cannot find module"
```bash
npm install
```

---

## ✅ Pronto!

Seu sistema está funcionando:
- ✅ Backend Node.js rodando
- ✅ Banco de dados MySQL
- ✅ Autenticação JWT
- ✅ Frontend integrado

**Para testes rápidos:** Consulte `backend/API-TESTS.http`

**Para documentação completa:** Consulte `README-BACKEND.md`
