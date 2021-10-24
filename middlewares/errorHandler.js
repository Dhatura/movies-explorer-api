const SERVER_ERROR = require('../errors/errorStatus');

const errorHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({ message: statusCode === SERVER_ERROR ? 'На сервере произошла ошибка' : message });
  next();
};

module.exports = errorHandler;
