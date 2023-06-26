/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

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
const userExtractor = async (req, res, next) => {
  const decodedUser = jwt.verify(req.token, process.env.SECRET);
  if (!decodedUser.id) {
    return res.stauts(401).json({ error: 'Invalid Token' });
  }
  const user = await User.findById(decodedUser.id);
  req.user = user;
  return next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
