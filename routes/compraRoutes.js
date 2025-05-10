// routes/compraRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/compraController');

router.post('/', controller.comprarIngresso);

module.exports = router;
