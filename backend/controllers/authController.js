const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registro(req, res) {
  try {
    const { nome, email, senha, confirmarSenha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({ erro: 'Senhas não correspondem' });
    }

    const usuarioExiste = await User.buscarPorEmail(email);
    if (usuarioExiste) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    await User.criarUsuario(nome, email, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha obrigatórios' });
    }

    const usuario = await User.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const senhaValida = await User.verificarSenha(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nome: usuario.nome, tipo_usuario: usuario.tipo_usuario },
      process.env.JWT_SECRET || 'chave_secreta_2024',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario
      }
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await User.listarTodos();
    res.json({ usuarios });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;
    
    if (parseInt(id) === req.usuario.id) {
      return res.status(400).json({ erro: 'Não pode deletar sua própria conta' });
    }

    const deletado = await User.deletarUsuario(id);
    if (!deletado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ mensagem: 'Usuário deletado' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

module.exports = { registro, login, listarUsuarios, deletarUsuario };
