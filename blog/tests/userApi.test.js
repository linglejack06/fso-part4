const supertest = require('supertest');
const app = require('../app');
const {
  initialUsers, usersInDb, initializeDb, closeDb, 
} = require('./testHelper');

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
  test('Non-unique username returns with status code 400', async () => {
    const duplicateUser = {
      username: 'jling',
      password: 'fake',
    };
    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length);
  });
  test('missing username or password returns with status code 400', async () => {
    const dumbUser = {
      name: 'jack',
      username: 'jack',
    };
    await api
      .post('/api/users')
      .send(dumbUser)
      .expect(400);
    const userWithoutUsername = {
      name: 'jack',
      password: 'hi',
    };
    await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400);
    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length);
  });
});

afterAll(async () => {
  await closeDb();
});
