// routes/eventoRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/eventoController');
const autenticar = require('../middleware/authMiddleware');

// Configuração do multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', controller.listarEventos);
router.get('/:id', controller.buscarEvento);
router.post('/', autenticar, upload.single('imagem'), controller.criarEvento);
router.put('/:id', autenticar, upload.single('imagem'), controller.atualizarEvento);
router.delete('/:id', autenticar, controller.deletarEvento);

module.exports = router;
