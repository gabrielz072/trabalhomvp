const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ erro: 'Token necessário' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET || 'chave_secreta_2024');
    req.usuario = usuario;
    next();
  } catch (err) {
    return res.status(403).json({ erro: 'Token inválido' });
  }
}

function verificarAdmin(req, res, next) {
  if (req.usuario?.tipo_usuario !== 'admin') {
    return res.status(403).json({ erro: 'Acesso apenas para admin' });
  }
  next();
}

module.exports = { verificarToken, verificarAdmin };
