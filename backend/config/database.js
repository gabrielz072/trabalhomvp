const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database(path.join(__dirname, '../circuito_verde.db'));

const adminHash = bcrypt.hashSync('admin123', 10);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      tipo_usuario TEXT DEFAULT 'usuario'
    )
  `);

db.run(`
  CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    nome TEXT NOT NULL,
    imagem TEXT,
    descricao TEXT,
    localizacao TEXT,
    FOREIGN KEY(usuario_id)
    REFERENCES usuarios(id)
  )
`);

  db.run(`
    CREATE TABLE IF NOT EXISTS visualizacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pagina TEXT NOT NULL,
      usuario_id INTEGER,
      usuario_nome TEXT,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO usuarios (id, nome, email, senha, tipo_usuario) 
    VALUES (1, 'Administrador', 'admin@circuitoverde.com', '${adminHash}', 'admin')
  `);

  // Garante que o email do admin seja atualizado caso o registro já exista.
  db.run(
    `UPDATE usuarios SET email = ? WHERE id = 1`,
    ['admin@circuitoverde.com']
  );
});

module.exports = db;
