const express = require('express');
const bodyParser = require('body-parser');
const fsUtils = require('./utils/fsUtils');
const emailValidation = require('./middlewares/emailValidation');
const passwordValidation = require('./middlewares/passwordValidation');
const authenticationValidation = require('./middlewares/authenticationValidation');
const obligatedDataValidation = require('./middlewares/obligatedDataValidation');
const infoValidation = require('./middlewares/infoValidation');
const watchedAtValidation = require('./middlewares/watchedAtValidation');
const rateValidation = require('./middlewares/rateValidation');

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

app.post('/login', emailValidation, passwordValidation, async (req, res) => {
  const login = req.body;
  const { token } = await fsUtils.loginTalker(login);
  return res.status(200).send({ token });
});

app.post('/talker', authenticationValidation,
obligatedDataValidation,
infoValidation,
watchedAtValidation,
rateValidation, async (req, res) => {
  const talker = req.body;
  const post = await fsUtils.postTalker(talker);
  return res.status(201).send(post);
});

app.put('/talker/:id', authenticationValidation,
obligatedDataValidation,
infoValidation,
watchedAtValidation,
rateValidation, async (req, res) => {
  const { id } = req.params;
  const talker = req.body;
  const update = await fsUtils.updateTalker(Number(id), talker);
  return res.status(200).send(update);
});

app.delete('/talker/:id', authenticationValidation, async (req, res) => {
  const { id } = req.params;

  await fsUtils.deleteTalker(+id);
  return res.status(204).json();
});

app.get('/talker/search', authenticationValidation, async (req, res) => {
  const { q } = req.query;
  const speakers = await fsUtils.searchSpeaker(q);
  return res.status(200).json(speakers);
});
