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

module.exports = infoValidation;