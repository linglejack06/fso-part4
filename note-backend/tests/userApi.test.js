const bcrypt = require('bcrypt');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const { usersInDb } = require('./testHelper');

const api = supertest(app);
describe('POST route', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('hello', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('user is created with valid username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'jling',
      name: 'boo blue',
      password: 'bloob'
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const usersAfter = await usersInDb();
    expect(usersAfter).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
  test('user is not created when username already taken', async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: 'root',
      password: 'new',
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).tocontain('expected `username` to be unique');
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  })
});