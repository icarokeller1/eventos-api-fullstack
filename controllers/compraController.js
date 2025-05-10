// controllers/compraController.js
const { Ingresso } = require('../models');

const comprarIngresso = async (req, res) => {
  const { ingressoId, quantidade } = req.body;

  if (!ingressoId || !quantidade) {
    return res.status(400).json({ error: 'Dados incompletos.' });
  }

  const ingresso = await Ingresso.findByPk(ingressoId);

  if (!ingresso) {
    return res.status(404).json({ error: 'Ingresso não encontrado.' });
  }

  if (ingresso.quantidade < quantidade) {
    return res.status(400).json({ error: 'Ingressos insuficientes.' });
  }

  ingresso.quantidade -= quantidade;
  await ingresso.save();

  res.status(200).json({
    message: `Compra realizada com sucesso.`,
    ingressoAtualizado: ingresso,
  });
};

module.exports = {
  comprarIngresso,
};
