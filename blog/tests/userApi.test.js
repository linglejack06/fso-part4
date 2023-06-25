const supertest = require('supertest');
const app = require('../app');
const { initialUsers, usersInDb, initializeDb, closeDb } = require('./testHelper');

const api = supertest(app);

beforeEach(async () => {
  await initializeDb();
});

describe('POST routes', () => {
  test('User is added to database', async () => {
    const newUser = {
      username: 'kling',
      password: 'password',
      name: 'Kevin',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const users = await usersInDb();
    const usernames = users.map((user) => user.username);
    expect(usernames).toContain('kling');
  });
});

afterAll(async () => {
  await closeDb();
});
