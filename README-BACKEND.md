# Circuito Verde - Backend & Autenticação

Sistema completo de autenticação e gerenciamento de usuários para o Circuito Terê Verde, desenvolvido com Node.js, Express e MySQL.

## 🚀 Features

- ✅ Cadastro de usuários (Sign Up)
- ✅ Login com autenticação JWT
- ✅ Diferenciação entre usuário normal e administrador
- ✅ Painel administrativo com gerenciamento de usuários
- ✅ Proteção de rotas com middleware de autenticação
- ✅ Validação de dados no backend
- ✅ Hash de senhas com bcrypt
- ✅ CORS configurado

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MySQL (v5.7 ou superior)
- npm ou yarn

## 🔧 Instalação

### 1. Clonar/Download do Projeto

O projeto já está estruturado em:
```
trabalhomvp/
├── backend/        (Novo - Node.js API)
└── home/           (Existente - Front-end)
```

### 2. Instalar MySQL e Criar Banco de Dados

#### No Windows:
1. Instale MySQL de: https://dev.mysql.com/downloads/mysql/
2. Durante a instalação, configure:
   - Username: `root`
   - Password: (deixar em branco ou definir uma)
3. Abra MySQL Command Line Client e execute:

```sql
-- Arquivo: backend/database.sql
CREATE DATABASE IF NOT EXISTS circuito_verde;
USE circuito_verde;

-- Copie e execute todo o conteúdo do arquivo database.sql
```

Ou execute diretamente:
```bash
mysql -u root -p < backend/database.sql
```

### 3. Configurar Backend

#### 3.1 Abrir Terminal na Pasta Backend
```bash
cd backend
```

#### 3.2 Instalar Dependências
```bash
npm install
```

#### 3.3 Configurar Variáveis de Ambiente

Edite o arquivo `.env` na pasta `backend/`:

```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=           # Deixe em branco se não configurou senha, ou coloque a senha
DB_NAME=circuito_verde
DB_PORT=3306

# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Chave JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_2024
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Iniciar Backend

```bash
# Terminal na pasta backend/
npm start
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
📊 Ambiente: development
💾 Banco de dados: circuito_verde
```

## 👤 Usuário Padrão

Após executar o script SQL, um usuário admin padrão é criado:

- **Email**: `admin@circuitoverde.com`
- **Senha**: `admin123`

## 🌐 Endpoints da API

### Autenticação (Público)

#### Cadastro
```
POST /api/auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "confirmarSenha": "senha123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "senha123"
}

Resposta:
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "tipo_usuario": "usuario"
  }
}
```

### Protegido (Requer Token)

#### Verificar Usuário
```
GET /api/auth/verify
Headers: Authorization: Bearer <token>
```

#### Logout
```
POST /api/auth/logout
Headers: Authorization: Bearer <token>
```

### Administrador (Requer Token + Role Admin)

#### Listar Todos os Usuários
```
GET /api/auth/admin/users
Headers: Authorization: Bearer <token>
```

#### Deletar Usuário
```
DELETE /api/auth/admin/users/:id
Headers: Authorization: Bearer <token>
```

#### Atualizar Status do Usuário
```
PATCH /api/auth/admin/users/:id/status
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "ativo": true/false
}
```

## 🎨 Front-end Integration

### Páginas Criadas/Atualizadas

1. **Login** - `home/user e adm/telalogin/login.html`
   - Integração com API de login
   - Salvamento de token no localStorage

2. **Cadastro** - `home/user e adm/telalogin/cadastro.html`
   - Novo arquivo criado
   - Validação de entrada
   - Redirecionamento após sucesso

3. **Admin Dashboard** - `home/user e adm/adm/adm.html`
   - Verificação de autenticação
   - Listagem de usuários
   - Deletar usuários
   - Informações do admin

4. **Auth Utils** - `home/auth-utils.js`
   - Classe `Auth` com métodos helper
   - Gerenciamento de token
   - Proteção de páginas

### Como Usar Auth Utils no Frontend

```html
<!-- Importar no HTML -->
<script src="../../auth-utils.js"></script>

<script>
  // Verificar se está autenticado
  if (Auth.isAutenticado()) {
    console.log("Usuário autenticado");
  }

  // Obter dados do usuário
  const usuario = Auth.getUsuario();
  console.log(usuario.nome);

  // Fazer requisição autenticada
  Auth.fetch('http://localhost:3000/api/auth/verify')
    .then(res => res.json())
    .then(data => console.log(data));

  // Proteger página (redirecionar se não autenticado)
  Auth.proteger();

  // Proteger página (admin only)
  Auth.proteger(true);

  // Fazer logout
  Auth.logout();
</script>
```

## 📱 Fluxo de Uso

### 1. Novo Usuário
```
Página Home → Link "Cadastro" → Preencher formulário →
Enviar para API /register → Sucesso → Redirecionar para Login
```

### 2. Login Usuário
```
Página Login → Preencher email/senha →
API /login → Token salvo em localStorage →
Redirecionar para página de Usuário (sons-login)
```

### 3. Login Admin
```
Mesma sequência, mas redireciona para painel admin →
API /admin/users → Listar usuários →
Gerenciar usuários
```

## 🔐 Segurança

- Senhas são hasheadas com bcrypt (10 rounds)
- JWT tokens com expiração de 7 dias
- CORS configurado
- Validação de entrada no backend
- Proteção de rotas com middleware

## 🐛 Troubleshooting

### Erro: "Cannot find module 'express'"
```bash
npm install
```

### Erro: "Connection refused - 3306"
- Verificar se MySQL está rodando
- Windows: Services → MySQL80 → Start (ou a versão instalada)
- Linux: `sudo systemctl start mysql`
- Mac: `brew services start mysql-server`

### Erro: "CORS error"
- Verificar se o CORS_ORIGIN no .env corresponde ao seu endereço frontend
- Por padrão está em `http://localhost:3000`

### Erro: "Database does not exist"
- Executar o script database.sql
- Ou criar manualmente: `CREATE DATABASE circuito_verde;`

### Login diz "Token inválido"
- Verificar se a chave JWT_SECRET no .env é a mesma
- Tokens expiram em 7 dias (configurado em JWT_EXPIRE)

## 📚 Estrutura do Projeto Backend

```
backend/
├── config/
│   └── database.js         (Configuração MySQL)
├── controllers/
│   └── authController.js   (Lógica de autenticação)
├── middleware/
│   └── auth.js            (Verificação de token)
├── models/
│   └── User.js            (Operações do banco)
├── routes/
│   └── auth.js            (Rotas da API)
├── .env                   (Variáveis de ambiente)
├── .gitignore            (Arquivos ignorados)
├── database.sql          (Script de criação)
├── package.json          (Dependências)
└── server.js             (Servidor principal)
```

## 🚀 Próximas Melhorias

- [ ] Recuperação de senha
- [ ] Autenticação com Google/GitHub
- [ ] Rate limiting
- [ ] Logs de acesso
- [ ] Dashboard de analytics
- [ ] Sistema de permissões avançado
- [ ] API para gerenciamento de conteúdo

## 📝 Notas

- A senha padrão do admin é `admin123` (MUDE após primeira utilização!)
- Para desenvolvimento, o CORS está liberado (mudar em produção)
- Recomenda-se usar HTTPS em produção
- Implementar .gitignore para não commitar .env

## ❓ Suporte

Para dúvidas sobre a integração, verifique:
1. Se o backend está rodando (`npm start`)
2. Se MySQL está conectado
3. Se as chaves de ambiente estão corretas
4. Console do navegador (F12) para erros JavaScript
5. Terminal do Node para erros do backend

---

**Desenvolvido para Circuito Terê Verde - Projeto de Faculdade** 🧘‍♀️
