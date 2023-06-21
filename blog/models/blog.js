const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  author: String,
  title: String,
  url: String,
  likes: String,
});

module.exports = mongoose.model('Blog', blogSchema);
