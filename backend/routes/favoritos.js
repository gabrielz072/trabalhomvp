const express = require('express');

const router = express.Router();

const favoritosController =
  require('../controllers/favoritosController');

const {
  verificarToken
} = require('../middleware/auth');

// =========================
// LISTAR FAVORITOS
// =========================

router.get(
  '/',
  verificarToken,
  favoritosController.listarFavoritos
);

// =========================
// ADICIONAR FAVORITO
// =========================

router.post(
  '/',
  verificarToken,
  favoritosController.adicionarFavorito
);

// =========================
// REMOVER FAVORITO
// =========================

router.delete(
  '/:id',
  verificarToken,
  favoritosController.removerFavorito
);

module.exports = router;