const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});
  return res.json(notes);
});
notesRouter.get('/:id', (req, res, next) => {
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
notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});
notesRouter.post('/', (req, res, next) => {
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
    .then((savedNote) => res.status(201).json(savedNote))
    .catch((error) => next(error));
});
notesRouter.put('/:id', (req, res, next) => {
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

module.exports = notesRouter;