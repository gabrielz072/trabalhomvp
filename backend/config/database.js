const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database(path.join(__dirname, '../studio_zen.db'));

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
    INSERT OR IGNORE INTO usuarios (id, nome, email, senha, tipo_usuario) 
    VALUES (1, 'Administrador', 'admin@studiuzen.com', '${adminHash}', 'admin')
  `);
});

module.exports = db;
