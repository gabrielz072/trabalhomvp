const db = require('../config/database');

// LISTAR
function listarTrilhas(req, res) {

  db.all(
    `SELECT * FROM trilhas ORDER BY nome`,
    [],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          erro: 'Erro ao buscar trilhas'
        });

      }

      res.json({
        trilhas: rows
      });

    }
  );

}

// CADASTRAR
function criarTrilha(req, res) {

  const {
    nome,
    categoria,
    dificuldade,
    km,
    localizacao,
    descricao,
    mapa,
    imagem
  } = req.body;

  db.run(
    `
    INSERT INTO trilhas (
      nome,
      categoria,
      dificuldade,
      km,
      localizacao,
      descricao,
      mapa,
      imagem
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      categoria,
      dificuldade,
      km,
      localizacao,
      descricao,
      mapa,
      imagem
    ],

    function (err) {

      if (err) {

        return res.status(500).json({
          erro: 'Erro ao criar trilha'
        });

      }

      res.json({
        id: this.lastID
      });

    }
  );

}

module.exports = {
  listarTrilhas,
  criarTrilha
};