require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Inicializar banco de dados primeiro
try {
  require('../backend/config/database');
} catch (error) {
  console.error('Erro ao inicializar banco de dados:', error);
}

// Importar controllers e middleware
const authController = require('../backend/controllers/authController');
const { verificarToken, verificarAdmin } = require('../backend/middleware/auth');

// Servir arquivos estáticos da pasta frontend (home/home/)
app.use(express.static(path.join(__dirname, '../home/home')));

// Servir outros arquivos da pasta home (não-home)
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

// Exportar a aplicação para o Vercel
module.exports = app;
