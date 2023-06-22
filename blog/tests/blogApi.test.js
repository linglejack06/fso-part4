/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const app = require('../app');
const {
  initialBlogs, blogsInDb, initializeDb, closeDb,
} = require('./testHelper');

const api = supertest(app);

beforeEach(async () => {
  await initializeDb();
});
describe('GET route', () => {
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
describe('POST route', () => {
  test('database adds blog', async () => {
    const newBlog = {
      author: 'Jack Lingle',
      title: 'How earth became hungry',
      url: 'www.ling.com/hungry-earth',
      likes: 34,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);
    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(initialBlogs.length + 1);
    const titles = blogs.map((blog) => blog.title);
    expect(titles).toContain('How earth became hungry');
  });
  test('like property defaults to zero', async () => {
    const newBlog = {
      author: 'Jack Lingle',
      title: 'How earth became hungry',
      url: 'www.ling.com/hungry-earth',
    };
    await api.post('/api/blogs').send(newBlog);
    const blogs = await blogsInDb();
    expect(blogs[blogs.length - 1].likes).toBe(0);
  });
  test('url property missing causes 400 error', async () => {
    const newBlog = {
      title: 'hi',
      author: 'jack',
      likes: 4,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
  test('title property missing causes 400 error', async () => {
    const newBlog = {
      author: 'jack',
      url: 'www.ling.com',
      likes: 400005,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});

afterAll(async () => {
  await closeDb();
});
