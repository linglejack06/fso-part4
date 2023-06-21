const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogRouter.get('/', (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((error) => {
      logger.error(error.message);
    });
});
blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      logger.error('Error saving blog: ', error.message);
    });
});

module.exports = blogRouter;
