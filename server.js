const app = require('./app');
const PORT = process.env.PORT || 3000;
const { syncDatabase } = require('./models');
require('dotenv').config();

syncDatabase().then(() => {
    console.log("Banco de dados sincronizado.");
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});