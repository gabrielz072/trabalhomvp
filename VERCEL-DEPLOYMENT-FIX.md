# Solução para Erro 404 no Vercel

## Problema
O site estava retornando erro 404 (NOT_FOUND) ao acessar em `trabalhomvp-ruby.vercel.app` porque:
1. Não havia arquivo `vercel.json` para configurar as rotas
2. O Express não estava servindo os arquivos estáticos do frontend
3. Não havia uma rota raiz (/) para servir o index.html

## Solução Implementada

### Arquivos Criados/Modificados:

1. **`/api/index.js`** (NOVO)
   - Handler principal para o Vercel
   - Configura o Express para servir arquivos estáticos de `home/home/`
   - Define as rotas de API `/api/auth/*`
   - Redireciona requisições 404 para index.html (suporte a SPA)

2. **`/vercel.json`** (NOVO)
   - Configuração do Vercel
   - Define buildCommand para instalar dependências
   - Redireciona todas as rotas para o handler `/api`

3. **`/api/package.json`** (NOVO)
   - Dependencies necessárias para o handler rodar no Vercel

4. **`/.vercelignore`** (NOVO)
   - Arquivos a serem ignorados no deploy

5. **`/package.json`** (NOVO)
   - Configuração geral do projeto na raiz

6. **`/backend/server.js`** (MODIFICADO)
   - Adicionado suporte a arquivos estáticos (para uso local)
   - Adicionadas middlewares de static files

## Como Fazer Deploy Novamente

1. Faça commit de todas as mudanças:
```bash
git add .
git commit -m "Solução para erro 404 no Vercel - Configuração de arquivos estáticos e rotas"
```

2. Faça push para a branch main:
```bash
git push origin main
```

3. O Vercel fará redeploy automaticamente

## Estrutura Esperada no Vercel

```
trabalhomvp-ruby.vercel.app/
├── /                    → Serve home/home/index.html
├── /style.css           → Serve home/home/style.css
├── /carrimg/img1.jpg    → Serve home/home/carrimg/img1.jpg
├── /api/auth/login      → API de login
├── /api/auth/registro   → API de registro
└── ...
```

## Próximos Passos (Não é Urgente)

1. **Banco de Dados**: SQLite não persiste no Vercel. Migrar para PostgreSQL/MySQL é recomendado.
2. **Variáveis de Ambiente**: Adicionar JWT_SECRET no Vercel Dashboard (Settings → Environment Variables)
3. **CORS**: Revisar se os domínios de acesso à API estão corretos

## Teste Rápido

Após fazer deploy, acesse:
- `https://trabalhomvp-ruby.vercel.app/` → Deve mostrar a página inicial
- `https://trabalhomvp-ruby.vercel.app/style.css` → Deve carregar o CSS
- `https://trabalhomvp-ruby.vercel.app/api/auth/login` → Deve responder com erro 400 (é esperado, pois não enviei dados)
