/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});
blogRouter.post('/', async (req, res, next) => {
  try {
    const decodedUser = jwt.verify(req.token, process.env.SECRET);
    if (!decodedUser.id) {
      return res.status(401).json({ error: 'invalid token' });
    }
    const user = await User.findById(decodedUser.id);
    let author;
    if (req.body.author) {
      author = req.body.author;
    } else {
      author = user.name;
    }
    const blog = new Blog({
      author,
      title: req.body.title,
      url: req.body.url,
      likes: req.body.likes,
      user: user.id,
    });
    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();
    return res.status(201).json(savedBlog);
  } catch (error) {
    return next(error);
  }
});
blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
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
});

module.exports = blogRouter;
