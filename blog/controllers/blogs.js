/* eslint-disable no-underscore-dangle */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const removeBlogFromUser = async (id) => {
  const blog = await Blog.findById(id);
  const user = await User.findById(blog.user);
  const index = user.blogs.indexOf(blog._id);
  user.blogs = user.blogs.slice(0, index) + user.blogs.slice(index, -1);
  await user.save();
};
blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});
blogRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body);
  try {
    const savedBlog = await blog.save();
    const user = await User.findById(req.body.user);
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});
blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await removeBlogFromUser(req.params.id);
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
});

module.exports = blogRouter;
