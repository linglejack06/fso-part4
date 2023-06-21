const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  author: String,
  title: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model('Blog', blogSchema);
