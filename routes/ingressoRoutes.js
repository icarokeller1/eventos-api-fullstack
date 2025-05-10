// routes/ingressoRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ingressoController');

router.get('/', controller.listarIngressos);
router.get('/:id', controller.buscarIngresso);
router.post('/', controller.criarIngresso);
router.put('/:id', controller.atualizarIngresso);
router.delete('/:id', controller.deletarIngresso);

module.exports = router;
