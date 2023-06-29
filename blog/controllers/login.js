/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const pwCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);
  if (pwCorrect && user) {
    const token = jwt.sign({ username, id: user._id }, process.env.SECRET);
    return res.json({
      token, username, name: user.name,
    });
  }
  return res.status(401).json({ error: 'Invalid username or password' });
});
module.exports = loginRouter;
