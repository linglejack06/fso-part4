const notesRouter = require('express').Router();
const note = require('../models/note');
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});
  return res.json(notes);
});
notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  }
  catch (error) {
    next(error);
  }
});
notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await note.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
notesRouter.post('/', async (req, res, next) => {
  const { body } = req;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch(error) {
    next(error);
  }
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