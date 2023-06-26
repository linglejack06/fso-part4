/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');

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
const initialUsers = [
  {
    username: 'jling',
    passwordHash: 'fake',
    name: 'Jack Lingle',
    blogs: [],
  },
  {
    username: 'jaycas',
    passwordHash: 'fake2',
    name: 'Jayden Cassady',
    blogs: [],
  },
];
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
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
  await User.deleteMany({});
  await User.insertMany(initialUsers);
};
const closeDb = async () => {
  await mongoose.connection.close();
};

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb, nonExistingId, initializeDb, closeDb,
};
