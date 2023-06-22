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

const initializeDb = async () => {
  await Blog.deleteMany({});
  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promises = blogs.map((blog) => blog.save());
  await Promise.all(promises);
};
const closeDb = async () => {
  await mongoose.connection.close();
};

module.exports = {
  initialBlogs, blogsInDb, initializeDb, closeDb,
};
