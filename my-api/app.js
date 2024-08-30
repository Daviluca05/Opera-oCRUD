require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Conectando ao MongoDB usando a URL do arquivo .env
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Importando as rotas e usando-as na aplicação
const entityRoutes = require('./routes/entityRoutes');
app.use('/api', entityRoutes);

// Rota simples para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Configurando a porta da aplicação
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
