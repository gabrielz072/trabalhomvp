require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes =
  require('./routes/auth');

const favoritosRoutes =
  require('./routes/favoritos');

const visualizacoesRoutes =
  require('./routes/visualizacoes');

const trilhasRoutes =
  require('./routes/trilhasRoutes');

const app = express();

const PORT =
  process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

/* =========================
   FRONTEND
========================= */

app.use(
  express.static(
    path.join(__dirname, '../frontend')
  )
);

/* =========================
   API
========================= */

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/favoritos',
  favoritosRoutes
);

app.use(
  '/api/visualizacoes',
  visualizacoesRoutes
);

app.use(
  '/api/trilhas',
  trilhasRoutes
);

/* =========================
   HOME
========================= */

app.get('/', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      '../frontend/home/index.html'
    )
  );

});

/* =========================
   DATABASE
========================= */

require('./config/database');

/* =========================
   SERVER
========================= */

app.listen(PORT, () => {

  console.log(
    `🚀 Servidor rodando em http://localhost:${PORT}`
  );

});