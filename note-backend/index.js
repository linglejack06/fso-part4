/* eslint-disable consistent-return */
// required first to ensure all modules have access to dotenv
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');

const app = express();
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};
app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/notes', (req, res) => {
  Note.find({}).then((storedNotes) => {
    res.json(storedNotes);
  });
});
app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(400).end();
      }
    })
    .catch((error) => next(error));
});
app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});
app.post('/api/notes', (req, res, next) => {
  const { body } = req;
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save()
    .then((savedNote) => res.json(savedNote))
    .catch((error) => next(error));
});
app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body;
  Note.findByIdAndRemove(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
// should be loaded as middleware right before error handler as second to last
app.use(unknownEndPoint);
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'incorrectly formatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  // passed forward to default express error handler
  next(error);
};
// must be used as last middleware
app.use(errorHandler);
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
