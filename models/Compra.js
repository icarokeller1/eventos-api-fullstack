// models/Compra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ingresso  = require('./Ingresso');
const Usuario   = require('./Usuario');

const Compra = sequelize.define('Compra', {
  quantidade: { type: DataTypes.INTEGER, allowNull: false }
});

Compra.belongsTo(Ingresso, { as: 'ingresso' });
Compra.belongsTo(Usuario,  { as: 'usuario'  });

module.exports = Compra;
