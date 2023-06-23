const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});
blogRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body);
  try {
    const response = await blog.save();
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});
blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
blogRouter.put('/:id', async (req, res, next) => {
  const { body } = req;
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
})

module.exports = blogRouter;
