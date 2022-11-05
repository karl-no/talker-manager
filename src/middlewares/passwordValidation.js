const passwordValidation = async (req, res, next) => {
  const { body } = req;
  
  if (!body.password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  
  if (body.password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  passwordValidation,
};
