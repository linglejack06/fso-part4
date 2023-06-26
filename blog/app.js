/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to database');
  })
  .catch((error) => {
    logger.error('error connecting to database: ', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use('/api/blogs', userExtractor, blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);
module.exports = app;
