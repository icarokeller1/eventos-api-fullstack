// controllers/ingressoController.js
const { Ingresso, Evento } = require('../models');

const criarIngresso = async (req, res) => {
  try {
    const { tipo, preco, quantidade, eventoId } = req.body;
    const evento = await Evento.findByPk(eventoId);
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

    const ingresso = await Ingresso.create({ tipo, preco, quantidade, eventoId });
    res.status(201).json(ingresso);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ingresso' });
  }
};

const listarIngressos = async (req, res) => {
  const ingressos = await Ingresso.findAll({ include: 'evento' });
  res.json(ingressos);
};

const buscarIngresso = async (req, res) => {
  const ingresso = await Ingresso.findByPk(req.params.id, { include: 'evento' });
  if (ingresso) return res.json(ingresso);
  res.status(404).json({ error: 'Ingresso não encontrado' });
};

const atualizarIngresso = async (req, res) => {
  const ingresso = await Ingresso.findByPk(req.params.id);
  if (!ingresso) return res.status(404).json({ error: 'Ingresso não encontrado' });

  const { tipo, preco, quantidade } = req.body;
  await ingresso.update({ tipo, preco, quantidade });
  res.json(ingresso);
};

const deletarIngresso = async (req, res) => {
  const ingresso = await Ingresso.findByPk(req.params.id);
  if (!ingresso) return res.status(404).json({ error: 'Ingresso não encontrado' });

  await ingresso.destroy();
  res.status(204).send();
};

module.exports = {
  criarIngresso,
  listarIngressos,
  buscarIngresso,
  atualizarIngresso,
  deletarIngresso,
};
