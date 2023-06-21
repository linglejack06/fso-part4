// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const { MONGODB_URI, PORT } = process.env;

module.exports = {
  MONGODB_URI, PORT,
};
