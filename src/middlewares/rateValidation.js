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

module.exports = rateValidation;