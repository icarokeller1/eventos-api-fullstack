const { Compra, Ingresso, Evento } = require('../models');

const listarCompras = async (_req, res) => {
  try {
    const compras = await Compra.findAll({
      attributes: ['id', 'email', 'quantidade', 'createdAt'],
      include: [
        {
          model: Ingresso,
          as: 'ingresso',
          attributes: ['tipo'],
          include: [
            { model: Evento, as: 'evento', attributes: ['nome'] }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(compras);
  } catch (err) {
    console.error('Erro listarCompras:', err);
    res.status(500).json({ error: 'Erro ao listar compras.' });
  }
};

const comprarIngresso = async (req, res) => {
  try {
    const { ingressoId, quantidade, email } = req.body;

    if (!ingressoId || !quantidade)
      return res.status(400).json({ error: 'Dados incompletos.' });

    const ingresso = await Ingresso.findByPk(ingressoId);
    if (!ingresso)      return res.status(404).json({ error: 'Ingresso não encontrado.' });
    if (ingresso.quantidade < quantidade)
      return res.status(400).json({ error: 'Ingressos insuficientes.' });

    ingresso.quantidade -= quantidade;
    await ingresso.save();

    const novaCompra = await Compra.create({ email, ingressoId, quantidade });

    const compraDetalhada = await Compra.findByPk(novaCompra.id, {
      include: [
        { model: Ingresso, as: 'ingresso', include: [{ model: Evento, as: 'evento' }] }
      ]
    });

    res.status(201).json(compraDetalhada);
  } catch (err) {
    console.error('Compra erro:', err);
    res.status(500).json({ error: 'Erro interno ao processar compra.' });
  }
};

module.exports = { listarCompras, comprarIngresso };
