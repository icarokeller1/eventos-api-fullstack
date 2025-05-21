// controllers/compraController.js
const { Compra, Ingresso, Usuario, Evento } = require('../models');

/**
 * GET /api/purchase
 * Lista todas as compras com ingresso, evento e usuário relacionados.
 */
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

/**
 * POST /api/purchase
 * Processa a compra de ingressos.
 */
const comprarIngresso = async (req, res) => {
  try {
    const { ingressoId, quantidade } = req.body;
    const usuarioId = req.user?.id || req.body.usuarioId; // ajuste conforme sua auth

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

    // Atualiza estoque
    ingresso.quantidade -= quantidade;
    await ingresso.save();

    // Registra compra
    const novaCompra = await Compra.create({ usuarioId, ingressoId, quantidade });

    // Retorna detalhes completos
    const compraDetalhada = await Compra.findByPk(novaCompra.id, {
      include: [
        {
          model: Ingresso,
          as: 'ingresso',
          include: [{ model: Evento, as: 'evento' }]
        },
        { model: Usuario, as: 'usuario' }
      ]
    });

    res.status(201).json(compraDetalhada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar compra.' });
  }
};

module.exports = { listarCompras, comprarIngresso };
