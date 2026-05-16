# ✅ CHECKLIST DE INSTALAÇÃO

## 📋 Antes de Começar - Verificações

- [ ] Node.js instalado? (Verificar: `node --version`)
- [ ] MySQL instalado? (Verificar: `mysql --version`)
- [ ] MySQL rodando? (Windows: Services → MySQL)
- [ ] Acesso do MySQL? (Teste: `mysql -u root`)

---

## 🔧 Instalação Backend (15 minutos)

- [ ] Abrir terminal/PowerShell
- [ ] `cd backend`
- [ ] `npm install` (esperar terminar)
- [ ] Editar `.env` com credenciais MySQL
- [ ] `mysql -u root < database.sql` (ou via MySQL Workbench)
- [ ] `npm start` (servidor deve iniciar)

---

## 🧪 Testar Banco de Dados

- [ ] Abrir MySQL Workbench ou Command Line
- [ ] Conectar como `root`
- [ ] Verificar: `USE circuito_verde;`
- [ ] Verificar: `SHOW TABLES;`
- [ ] Verificar: `SELECT * FROM usuarios;` (deve ter admin)

---

## 🌐 Testar Backend

- [ ] Abrir navegador
- [ ] Acessar: `http://localhost:3000/api/health`
- [ ] Deve retornar: `{"status":"OK","message":"Backend is running"}`

---

## 📝 Testar Frontend - Registro

- [ ] Abrir: `home/user e adm/telalogin/cadastro.html`
- [ ] Preencher formulário
- [ ] Clicar em "Cadastrar"
- [ ] Deve redirecionar para login após sucesso

---

## 🔐 Testar Frontend - Login Admin

- [ ] Abrir: `home/user e adm/telalogin/login.html`
- [ ] Email: `admin@studiuzen.com`
- [ ] Senha: `admin123`
- [ ] Clicar em "Entrar"
- [ ] Deve redirecionar para painel admin

---

## 👥 Testar Painel Admin

- [ ] Ir para menu lateral
- [ ] Clicar em "👥 Clientes"
- [ ] Deve carregar lista de usuários
- [ ] Testar deletar usuário (confirmar popup)
- [ ] Verificar se aparece mensagem de sucesso

---

## 👤 Testar Acesso Usuário Normal

- [ ] Cadastrar novo usuário
- [ ] Fazer login com esse usuário
- [ ] Deve redirecionar para `sons-login/som.html`
- [ ] Nome deve aparecer no header

---

## 🚪 Testar Logout

- [ ] Clicar no nome de usuário (menu superior)
- [ ] Clicar em "Sair"
- [ ] Deve redirecionar para login
- [ ] Tentar acessar página protegida
- [ ] Deve redirecionar para login novamente

---

## 🔒 Testar Proteção de Rotas

- [ ] Sem fazer login, tentar acessar: `home/user e adm/sons-login/som.html`
- [ ] Deve redirecionar para login

---

## 🎉 Parabéns!

Se passou por todos os testes, seu sistema está 100% funcional!

### Próximas tarefas (opcional):
- [ ] Mudar senha do admin
- [ ] Customizar cores/estilos
- [ ] Adicionar mais conteúdo
- [ ] Fazer deploy em servidor

---

## 🆘 Precisa de Ajuda?

1. Verifique `COMECE-AQUI.md`
2. Leia `README-BACKEND.md`
3. Consulte `GUIA-RAPIDO.md`
4. Abra `F12` (console do navegador) para erros
5. Verifique terminal do Node para erros do servidor

---

**Boa sorte com seu projeto de faculdade! 🚀**
