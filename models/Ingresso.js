// models/Ingresso.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Evento = require('./Evento');

const Ingresso = sequelize.define('Ingresso', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relacionamento: Muitos ingressos pertencem a um evento
Ingresso.belongsTo(Evento, {
  foreignKey: 'eventoId',
  as: 'evento',
});
Evento.hasMany(Ingresso, {
  foreignKey: 'eventoId',
  as: 'ingressos',
});

module.exports = Ingresso;
