const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');
const Ingresso      = require('./Ingresso');
const Usuario       = require('./Usuario');

const Compra = sequelize.define('Compra', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Compras'
});

Compra.belongsTo(Ingresso, {
  as: 'ingresso',
  foreignKey: { name: 'ingressoId', allowNull: false }
});

Compra.belongsTo(Usuario, {
  as: 'usuario',
  foreignKey: { name: 'usuarioId', allowNull: false }
});

module.exports = Compra;
