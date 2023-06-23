/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Blog = require('../models/blog');

const initialBlogs = [
  {
    author: 'Jack Lingle',
    title: 'How the world turned evil',
    url: 'www.ling.com/evil-world',
    likes: 9002,
  },
  {
    author: 'Jack Lingle',
    title: 'How the world turned helpful',
    url: 'www.ling.com/helpful-world',
    likes: 249000,
  },
  {
    author: 'Jack Lingle',
    title: 'How the world turned peaceful',
    url: 'www.ling.com/peaceful-world',
    likes: 23,
  },
];
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const nonExistingId = async () => {
  const blog = new Blog({
    title: 'how earth changed',
    author: 'black',
    url: 'www.bing.com',
    likes: 4,
  });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};
const initializeDb = async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
};
const closeDb = async () => {
  await mongoose.connection.close();
};

module.exports = {
  initialBlogs, blogsInDb, nonExistingId, initializeDb, closeDb,
};
