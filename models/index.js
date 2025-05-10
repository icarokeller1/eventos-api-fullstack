const sequelize = require('../config/database');
const Evento = require('./Evento');
const Ingresso = require('./Ingresso');
const Usuario = require('./Usuario');

const syncDatabase = async () => {
  await sequelize.sync();
};

module.exports = {
  Evento,
  Ingresso,
  Usuario,
  sequelize,
  syncDatabase,
};
