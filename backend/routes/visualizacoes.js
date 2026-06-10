const express = require('express');

const router = express.Router();

const visualizacoesController =
  require('../controllers/visualizacoesController');

const {
  verificarToken,
  verificarAdmin,
  verificarTokenOpcional
} = require('../middleware/auth');

router.post(
  '/',
  verificarTokenOpcional,
  visualizacoesController.registrarVisualizacao
);

router.get(
  '/',
  verificarToken,
  verificarAdmin,
  visualizacoesController.listarVisualizacoes
);

router.delete(
  '/',
  verificarToken,
  verificarAdmin,
  visualizacoesController.limparVisualizacoes
);

module.exports = router;
