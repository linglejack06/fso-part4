const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'username and password must be atleast 3 characters long' });
  }

  return next(error);
};

module.exports = errorHandler;
