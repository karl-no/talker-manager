const express = require('express');
const bodyParser = require('body-parser');
const fsUtils = require('./utils/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const data = await fsUtils.getAllTalkers();
  return res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fsUtils.getTalkerById(Number(id));
  if (talker) {
    return res.status(HTTP_OK_STATUS).json(talker);
  }
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', async (req, res) => {
  const login = req.body;
  const { token } = await fsUtils.postTalker(login);
  return res.status(200).send({ token });
});
