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

module.exports = obligatedDataValidation;