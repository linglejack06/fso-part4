const Blog = require('../models/blog');
const app = require('../app');
const supertest = require('supertest');
const { initialBlogs, blogsInDb, initializeDb, closeDb } = require('./testHelper');

const api = supertest(app);

beforeEach(async () => {
  await initializeDb();
});

afterAll(async () => {
  await closeDb();
});