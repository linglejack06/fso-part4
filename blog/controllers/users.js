/* eslint-disable import/no-extraneous-dependencies */
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;
  const saltRounds = 15;
  if (!password || !username) {
    return res.status(400).json({ error: 'missing username or password' });
  }
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.json(users);
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
