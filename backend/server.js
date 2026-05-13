require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authController = require('./controllers/authController');
const { verificarToken, verificarAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta frontend (prioridade: home/home/)
app.use(express.static(path.join(__dirname, '../home/home')));

// Servir outros arquivos da pasta home
app.use(express.static(path.join(__dirname, '../home')));

// Rotas de API
app.post('/api/auth/registro', authController.registro);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/usuarios', verificarToken, verificarAdmin, authController.listarUsuarios);
app.delete('/api/auth/usuarios/:id', verificarToken, verificarAdmin, authController.deletarUsuario);

// Rota raiz - servir o index.html do frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../home/home/index.html'));
});

// Para SPA - redirecionar rotas não encontradas para index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../home/home/index.html'));
});

require('./config/database');

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`💾 Banco de dados SQLite: studio_zen.db`);
});
