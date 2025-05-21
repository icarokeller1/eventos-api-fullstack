const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');
const Ingresso      = require('./Ingresso');

const Compra = sequelize.define('Compra', {
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'Compras'
});

Compra.belongsTo(Ingresso, {
  as: 'ingresso',
  foreignKey: { name: 'ingressoId', allowNull: false }
});

module.exports = Compra;
