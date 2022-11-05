const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]/;
  const emailCheck = emailRegex.test(email);
  if (!emailCheck) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
};

const passwordValidation = async (req, res, next) => {
  const { password } = req.body;
  
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const authenticationValidation = async (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const obligatedDataValidation = async (req, res, next) => {
  const { body: { name, age, talk } } = req;
  if (name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (talk === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

// Valida se o nome tem mais de 3 characteres e se o palestrante tem idade maior que 18 anos
const infoValidation = async (req, res, next) => {
  const { body: { name, age } } = req;
  if (name.length <= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const watchedAtValidation = async (req, res, next) => {
  const { body } = req;
  const { talk } = body;
  const { watchedAt } = talk;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (watchedAt === undefined) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = async (req, res, next) => {
  const { body } = req;
  const { talk } = body;
  const { rate } = talk;
  const rates = [1, 2, 3, 4, 5];

  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  
  if (!rates.includes(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  authenticationValidation,
  obligatedDataValidation,
  infoValidation,
  watchedAtValidation,
  rateValidation,
};