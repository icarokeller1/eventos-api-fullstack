const sequelize = require('../config/database');
const Evento = require('./Evento');
const Ingresso = require('./Ingresso');
const Usuario = require('./Usuario');
const Compra = require('./Compra');

const syncDatabase = async () => {
  await sequelize.sync();
};

module.exports = {
  Evento,
  Ingresso,
  Usuario,
  Compra,
  sequelize,
  syncDatabase,
};
