// routes/compraRoutes.js
const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/compraController');
const autenticar  = require('../middleware/authMiddleware');

router.get('/',  ctrl.listarCompras);      //  ← novo
router.post('/', ctrl.comprarIngresso);

module.exports = router;