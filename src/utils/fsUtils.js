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

const loginTalker = async (login) => {
  const loginUser = {
    token: generateToken(),
    ...login,
  };
  return loginUser;
};

const postTalker = async (talker) => {
  const speaker = await getAllTalkers();

  const newSpeaker = {
    id: speaker.length + 1,
    ...talker,
  };
  const arrayOfSpeakers = [...speaker, newSpeaker];

  await fs.writeFile(
    path.resolve(__dirname, TALKER_PATH),
    JSON.stringify(arrayOfSpeakers),
  );
  return newSpeaker;
};

const updateTalker = async (id, talker) => {
  const speaker = await getAllTalkers();
  const updateSpeaker = { id, ...talker };

  const speakerInfo = speaker.reduce((accumulator, current) => {
    if (current.id === id) {
      return [...accumulator, updateSpeaker];
    }
    return [...accumulator, current];
  }, []);

  await fs.writeFile(
    path.resolve(__dirname, TALKER_PATH),
    JSON.stringify(speakerInfo),
  );
  return updateSpeaker;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  loginTalker,
  postTalker,
  updateTalker,
};