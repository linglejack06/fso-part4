/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Blog = require('../models/blog');
const {
  initialBlogs, blogsInDb, initializeDb, closeDb, usersInDb,
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
    const users = await usersInDb();
    const token = jwt.sign(
      { username: users[0].username, id: users[0].id },
      process.env.SECRET,
    );
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
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
    const users = await usersInDb();
    const token = jwt.sign(
      { username: users[0].username, id: users[0].id },
      process.env.SECRET,
    );
    await api.post('/api/blogs').send(newBlog).set({ Authorization: `Bearer ${token}` });
    const blogs = await blogsInDb();
    expect(blogs[blogs.length - 1].likes).toBe(0);
  });
  test('url property missing causes 400 error', async () => {
    const newBlog = {
      title: 'hi',
      author: 'jack',
      likes: 4,
    };
    const users = await usersInDb();
    const token = jwt.sign(
      { username: users[0].username, id: users[0].id },
      process.env.SECRET,
    );
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400);
  });
  test('title property missing causes 400 error', async () => {
    const newBlog = {
      author: 'jack',
      url: 'www.ling.com',
      likes: 400005,
    };
    const users = await usersInDb();
    const token = jwt.sign(
      { username: users[0].username, id: users[0].id },
      process.env.SECRET,
    );
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400);
  });
});
describe('DELETE route', () => {
  test('existing blog is deleted', async () => {
    const initialBlogsInDb = await blogsInDb();
    const initialBlog = initialBlogsInDb[0];
    const users = await usersInDb();
    await Blog.findByIdAndUpdate(initialBlog.id, { user: users[0].id });
    const token = jwt.sign(
      { username: users[0].username, id: users[0].id },
      process.env.SECRET,
    );
    await api
      .delete(`/api/blogs/${initialBlogsInDb[0].id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204);
    const finalBlogsInDb = await blogsInDb();
    const titles = finalBlogsInDb.map((blog) => blog.title);
    expect(titles).not.toContain(initialBlogsInDb[0].title);
  });
  test('unauthorized user cannot delete blog', async () => {
    const initialBlogsInDb = await blogsInDb();
    const initialBlog = initialBlogsInDb[0];
    const users = await usersInDb();
    await Blog.findByIdAndUpdate(initialBlog.id, { user: users[0].id });
    const token = jwt.sign(
      { username: users[1].username, id: users[1].id },
      process.env.SECRET,
    );
    await api
      .delete(`/api/blogs/${initialBlogsInDb[0].id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(401);
  });
});
describe('PUT route', () => {
  test('number of likes is updated', async () => {
    const originalBlogs = await blogsInDb();
    await api
      .put(`/api/blogs/${originalBlogs[0].id}`)
      .send({
        likes: 3,
      })
      .expect(200);
    const updatedBlogs = await blogsInDb();
    expect(updatedBlogs[0].likes).toBe(3);
    expect(updatedBlogs[0]).toEqual({
      ...originalBlogs[0],
      likes: 3,
    });
  });
});
afterAll(async () => {
  await closeDb();
});
