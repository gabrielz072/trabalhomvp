const bcrypt = require('bcryptjs');
const db = require('../config/database');

function executar(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

function executarUm(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
}

function executarInsert(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

async function criarUsuario(nome, email, senha) {
  const hashedPassword = await bcrypt.hash(senha, 10);
  const id = await executarInsert(
    'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)',
    [nome, email, hashedPassword, 'usuario']
  );
  return { id, nome, email };
}

async function buscarPorEmail(email) {
  return await executarUm('SELECT * FROM usuarios WHERE email = ?', [email]);
}

async function buscarPorId(id) {
  return await executarUm('SELECT id, nome, email, tipo_usuario FROM usuarios WHERE id = ?', [id]);
}

async function listarTodos() {
  return await executar('SELECT id, nome, email, tipo_usuario FROM usuarios');
}

async function deletarUsuario(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else resolve(this.changes > 0);
    });
  });
}

async function verificarSenha(senhaFornecida, senhaHash) {
  return await bcrypt.compare(senhaFornecida, senhaHash);
}

module.exports = {
  criarUsuario,
  buscarPorEmail,
  buscarPorId,
  listarTodos,
  deletarUsuario,
  verificarSenha
};
