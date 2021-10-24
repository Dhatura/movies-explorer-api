require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  JWT_SECRET,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const JWT_SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URL,
  JWT_SECRET_KEY,
};
