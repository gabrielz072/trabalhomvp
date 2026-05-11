require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authController = require('./controllers/authController');
const { verificarToken, verificarAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/auth/registro', authController.registro);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/usuarios', verificarToken, verificarAdmin, authController.listarUsuarios);
app.delete('/api/auth/usuarios/:id', verificarToken, verificarAdmin, authController.deletarUsuario);

require('./config/database');

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`💾 Banco de dados SQLite: studio_zen.db`);
});
