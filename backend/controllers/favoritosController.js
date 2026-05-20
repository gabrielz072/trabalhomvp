const db = require('../config/database');

// =========================
// LISTAR FAVORITOS
// =========================

function listarFavoritos(req, res) {

  const usuarioId =
    req.usuario.id;

  db.all(
    `
    SELECT * FROM favoritos
    WHERE usuario_id = ?
    ORDER BY id DESC
    `,
    [usuarioId],

    (err, rows) => {

      if (err) {

        return res.status(500).json({
          erro: err.message
        });

      }

      res.json({
        favoritos: rows
      });

    }
  );

}

// =========================
// ADICIONAR FAVORITO
// =========================

function adicionarFavorito(req, res) {

  const usuarioId =
    req.usuario.id;

  const {
    nome,
    imagem,
    descricao,
    localizacao
  } = req.body;

  db.run(
    `
    INSERT INTO favoritos (
      usuario_id,
      nome,
      imagem,
      descricao,
      localizacao
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      usuarioId,
      nome,
      imagem,
      descricao,
      localizacao
    ],

    function(err) {

      if (err) {

        return res.status(500).json({
          erro: err.message
        });

      }

      res.status(201).json({

        mensagem:
          'Favorito adicionado',

        favoritoId:
          this.lastID

      });

    }
  );

}

// =========================
// REMOVER FAVORITO
// =========================

function removerFavorito(req, res) {

  const usuarioId =
    req.usuario.id;

  const favoritoId =
    req.params.id;

  db.run(
    `
    DELETE FROM favoritos
    WHERE id = ?
    AND usuario_id = ?
    `,
    [
      favoritoId,
      usuarioId
    ],

    function(err) {

      if (err) {

        return res.status(500).json({
          erro: err.message
        });

      }

      res.json({
        mensagem:
          'Favorito removido'
      });

    }
  );

}

module.exports = {

  listarFavoritos,

  adicionarFavorito,

  removerFavorito

};