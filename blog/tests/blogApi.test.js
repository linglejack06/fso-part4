/* eslint-disable import/no-extraneous-dependencies */
const Blog = require('../models/blog');
const app = require('../app');
const supertest = require('supertest');
const { initialBlogs, blogsInDb, initializeDb, closeDb } = require('./testHelper');

const api = supertest(app);

beforeEach(async () => {
  await initializeDb();
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
afterAll(async () => {
  await closeDb();
});
