const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) return res.status(400).json({ error: 'Email já cadastrado.' });

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada });

  res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta.' });

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
};

module.exports = { registrar, login };
