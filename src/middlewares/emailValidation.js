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

module.exports = emailValidation;