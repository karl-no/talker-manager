const emailValidation = async (req, res, next) => {
  const { body } = req;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  
  if (!body.email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  
  // const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]/;
  const emailCheck = emailRegex.test(body.email);
  if (!emailCheck) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = {
  emailValidation,
};
