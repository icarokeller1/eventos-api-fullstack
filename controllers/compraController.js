const { Compra, Ingresso, Usuario, Evento } = require('../models');

const listarCompras = async (_req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        {
          model: Ingresso,
          as: 'ingresso',
          attributes: ['tipo'],
          include: [
            { model: Evento, as: 'evento', attributes: ['nome'] }
          ]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(compras);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar compras.' });
  }
};

const comprarIngresso = async (req, res) => {
  try {
    const { ingressoId, quantidade } = req.body;
    const usuarioId = req.user?.id;

    if (!usuarioId)     return res.status(401).json({ error: 'Usuário não autenticado.' });
    if (!ingressoId || !quantidade)
      return res.status(400).json({ error: 'Dados incompletos.' });

    const ingresso = await Ingresso.findByPk(ingressoId);
    if (!ingresso)      return res.status(404).json({ error: 'Ingresso não encontrado.' });
    if (ingresso.quantidade < quantidade)
      return res.status(400).json({ error: 'Ingressos insuficientes.' });

    ingresso.quantidade -= quantidade;
    await ingresso.save();

    const novaCompra = await Compra.create({ usuarioId, ingressoId, quantidade });

    const compraDetalhada = await Compra.findByPk(novaCompra.id, {
      include: [
        { model: Ingresso, as: 'ingresso', include: [{ model: Evento, as: 'evento' }] },
        { model: Usuario,  as: 'usuario' }
      ]
    });

    res.status(201).json(compraDetalhada);
  } catch (err) {
    console.error('Compra erro:', err);
    res.status(500).json({ error: 'Erro interno ao processar compra.' });
  }
};

module.exports = { listarCompras, comprarIngresso };
