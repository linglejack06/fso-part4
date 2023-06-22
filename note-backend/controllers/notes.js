const notesRouter = require('express').Router();
const note = require('../models/note');
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});
  return res.json(notes);
});
notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
notesRouter.delete('/:id', async (req, res) => {
  await note.findByIdAndRemove(req.params.id);
  res.status(204).end();
});
notesRouter.post('/', async (req, res) => {
  const { body } = req;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  const savedNote = await note.save();
  res.status(201).json(savedNote);
});
notesRouter.put('/:id', (req, res) => {
  const { content, important } = req.body;
  Note.findByIdAndRemove(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    });
});

module.exports = notesRouter;