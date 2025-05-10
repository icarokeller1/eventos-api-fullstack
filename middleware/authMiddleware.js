// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido.' });

    req.usuarioId = decoded.id;
    next();
  });
};

module.exports = autenticar;
