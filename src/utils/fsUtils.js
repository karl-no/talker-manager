const fs = require('fs').promises;
const path = require('path');

const TALKER_PATH = '../talker.json';

const getAllFiles = async () => {
  const talkers = await fs.readFile(
    path.resolve(__dirname, TALKER_PATH),
  );

  const result = JSON.parse(talkers);
  
  return result;
};

module.exports = {
  getAllFiles,
};