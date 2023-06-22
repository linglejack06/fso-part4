/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./utils/middleware');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogs');

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
app.use('/api/blogs', blogRouter);
app.use(errorHandler);
module.exports = app;
