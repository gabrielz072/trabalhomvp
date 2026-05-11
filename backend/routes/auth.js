const express = require('express');
const authController = require('../controllers/authController');
const { verificarToken, verificarAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/registro', authController.registro);
router.post('/login', authController.login);
router.get('/usuarios', verificarToken, verificarAdmin, authController.listarUsuarios);
router.delete('/usuarios/:id', verificarToken, verificarAdmin, authController.deletarUsuario);

module.exports = router;
