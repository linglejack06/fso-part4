/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.NOTE_URL;

mongoose.connect(url)
  .then(() => console.log('connected to mongoDB'))
  .catch((error) => console.error(error.message));
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});
noteSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
