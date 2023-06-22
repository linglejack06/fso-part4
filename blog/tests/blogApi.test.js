/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const {
  initialBlogs, blogsInDb, initializeDb, closeDb,
} = require('./testHelper');

const api = supertest(app);

beforeEach(async () => {
  await initializeDb();
});
describe('GET routes', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('blogs have correct length', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });
  test('blog has correct keys', async () => {
    const blogs = await blogsInDb();
    expect(blogs[0].id).toBeDefined();
    expect(blogs[0]._id).not.toBeDefined();
    expect(blogs[0].__v).not.toBeDefined();
  });
});

afterAll(async () => {
  await closeDb();
});
