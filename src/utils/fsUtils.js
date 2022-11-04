const fs = require('fs').promises;
const path = require('path');

const TALKER_PATH = '../talker.json';

const getAllTalkers = async () => {
  const talkers = await fs.readFile(
    path.resolve(__dirname, TALKER_PATH),
  );

  const result = JSON.parse(talkers);

  return result;
};

const getTalkerById = async (id) => {
  const talkers = await getAllTalkers();
  return talkers.find((person) => person.id === id);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};