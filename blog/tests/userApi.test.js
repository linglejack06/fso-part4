/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const app = require('../app');
const {
  initialUsers, usersInDb, initializeDb, closeDb,
} = require('./testHelper');

const api = supertest(app);
beforeEach(async () => {
  await initializeDb();
}, 15000);

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
  test('password with less than 3 characters fails', async () => {
    const shortPw = {
      username: 'jackl',
      password: 'j',
    };
    const response = await api
      .post('/api/users')
      .send(shortPw)
      .expect(400);
    expect(response.body).toEqual({ error: 'username and password must be atleast 3 characters long' });
    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length);
  });
  test('username with less than 3 characters fails', async () => {
    const shortUser = {
      username: 'j',
      password: 'helloooo',
    };
    const response = await api
      .post('/api/users')
      .send(shortUser)
      .expect(400);

    expect(response.body).toEqual({ error: 'username and password must be atleast 3 characters long' });
    const users = await usersInDb();
    expect(users).toHaveLength(initialUsers.length);
  });
});
describe('GET routes', () => {
  test('List of users is returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('Correct number of users is returned', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(initialUsers.length);
  });
});

afterAll(async () => {
  await closeDb();
});
