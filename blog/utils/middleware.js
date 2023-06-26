const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'username and password must be atleast 3 characters long' });
  } if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' });
  }
  return next(error);
};
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };
