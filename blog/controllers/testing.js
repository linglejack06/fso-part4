const testingRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

testingRouter.post('/reset', async (req, res, next) => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = testingRouter;
