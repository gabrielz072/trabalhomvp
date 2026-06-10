const db = require('../config/database');

function registrarVisualizacao(req, res) {

  const { pagina } = req.body;

  if (!pagina || typeof pagina !== 'string' || !pagina.trim()) {
    return res.status(400).json({
      erro: 'Nome da página é obrigatório'
    });
  }

  const usuarioId = req.usuario?.id || null;
  const usuarioNome = req.usuario?.nome || 'Visitante';

  db.run(
    `
    INSERT INTO visualizacoes (pagina, usuario_id, usuario_nome)
    VALUES (?, ?, ?)
    `,
    [pagina.trim(), usuarioId, usuarioNome],

    function(err) {

      if (err) {
        return res.status(500).json({
          erro: err.message
        });
      }

      res.status(201).json({
        mensagem: 'Visualização registrada',
        id: this.lastID
      });

    }
  );

}

function listarVisualizacoes(req, res) {

  db.all(
    `
    SELECT
      pagina,
      COUNT(*) AS total
    FROM visualizacoes
    GROUP BY pagina
    ORDER BY total DESC
    `,
    [],

    (err, porPagina) => {

      if (err) {
        return res.status(500).json({
          erro: err.message
        });
      }

      db.all(
        `
        SELECT
          id,
          pagina,
          usuario_nome,
          criado_em
        FROM visualizacoes
        ORDER BY criado_em DESC
        LIMIT 50
        `,
        [],

        (errRecentes, recentes) => {

          if (errRecentes) {
            return res.status(500).json({
              erro: errRecentes.message
            });
          }

          db.get(
            `
            SELECT
              COUNT(*) AS total,
              COUNT(DISTINCT pagina) AS paginas_unicas,
              COUNT(DISTINCT usuario_id) AS usuarios_unicos
            FROM visualizacoes
            `,
            [],

            (errResumo, resumo) => {

              if (errResumo) {
                return res.status(500).json({
                  erro: errResumo.message
                });
              }

              res.json({
                resumo: {
                  total: resumo.total || 0,
                  paginas_unicas: resumo.paginas_unicas || 0,
                  usuarios_unicos: resumo.usuarios_unicos || 0
                },
                por_pagina: porPagina || [],
                recentes: recentes || []
              });

            }
          );

        }
      );

    }
  );

}

function limparVisualizacoes(req, res) {

  db.run(
    `DELETE FROM visualizacoes`,

    function(err) {

      if (err) {
        return res.status(500).json({
          erro: err.message
        });
      }

      res.json({
        mensagem: 'Visualizações removidas',
        removidos: this.changes
      });

    }
  );

}

module.exports = {
  registrarVisualizacao,
  listarVisualizacoes,
  limparVisualizacoes
};
