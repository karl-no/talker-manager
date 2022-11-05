const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const TALKER_PATH = '../talker.json';

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

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

const postTalker = async (login) => {
  const loginTalker = {
    token: generateToken(),
    ...login,
  };
  return loginTalker;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  postTalker,
};