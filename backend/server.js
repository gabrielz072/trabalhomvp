require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   ARQUIVOS ESTÁTICOS
========================= */

// Página principal
app.use(express.static(path.join(__dirname, '../home/home')));

// Outras páginas
app.use(express.static(path.join(__dirname, '../home')));

/* =========================
   ROTAS DA API
========================= */

app.use('/api/auth', authRoutes);

/* =========================
   ROTA PRINCIPAL
========================= */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../home/home/index.html'));
});

/* =========================
   FALLBACK
========================= */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../home/home/index.html'));
});

/* =========================
   DATABASE
========================= */

require('./config/database');

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`💾 Banco de dados SQLite conectado`);
});