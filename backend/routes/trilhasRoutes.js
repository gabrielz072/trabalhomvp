const express = require('express');

const router = express.Router();

const trilhasController =
require('../controllers/trilhasController');

router.get(
  '/',
  trilhasController.listarTrilhas
);

router.post(
  '/',
  trilhasController.criarTrilha
);

module.exports = router;