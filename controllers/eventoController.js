const { Evento } = require('../models');

const criarEvento = async (req, res) => {
  try {
    const { nome, data, local, descricao } = req.body;
    const imagem = req.file ? req.file.filename : null;

    const evento = await Evento.create({ nome, data, local, descricao, imagem });
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
};

const listarEventos = async (req, res) => {
  const eventos = await Evento.findAll();
  res.json(eventos);
};

const buscarEvento = async (req, res) => {
  const evento = await Evento.findByPk(req.params.id);
  if (evento) return res.json(evento);
  res.status(404).json({ error: 'Evento não encontrado' });
};

const atualizarEvento = async (req, res) => {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

  const { nome, data, local, descricao } = req.body;
  const imagem = req.file ? req.file.filename : evento.imagem;

  await evento.update({ nome, data, local, descricao, imagem });
  res.json(evento);
};

const deletarEvento = async (req, res) => {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

  await evento.destroy();
  res.status(204).send();
};

module.exports = {
  criarEvento,
  listarEventos,
  buscarEvento,
  atualizarEvento,
  deletarEvento,
};
