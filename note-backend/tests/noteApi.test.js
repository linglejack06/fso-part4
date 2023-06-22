const mongoose = require('mongoose');
const supertest = require('supertest');
const { initialNotes, nonExistingId, notesInDb } = require('./testHelper');
const app = require('../app');
const Note = require('../models/note');

const api = supertest(app);
beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

test('notes returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
test('all notes are returned', async () => {
  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(initialNotes.length);
});
test('notes contain correct values', async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map(r => r.content);
  expect(contents).toContain('Browser can execute only JavaScript');
});
test('a valid note can be added to database', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const notesAtEnd = await notesInDb();
  expect(notesAtEnd).toHaveLength(initialNotes.length + 1);
  const contents = notesAtEnd.map(n => n.content);
  expect(contents).toContain('async/await simplifies making async calls');
});
test('Invalid note is not saved to database', async () => {
  const newNote = {
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400);
  const notesAtEnd = await notesInDb();
  expect(notesAtEnd).toHaveLength(initialNotes.length);
});
test('Note in database can be found', async () => {
  const notesAtStart = await notesInDb();
  const noteToView = notesAtStart[0];
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(resultNote.body).toEqual(noteToView);
});
test('Note can be deleted', async () => {
  const notesAtStart = await notesInDb();
  const noteToDelete = notesAtStart[0];
  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204);
  const notesAtEnd = await notesInDb();
  expect(notesAtEnd).toHaveLength(initialNotes.length - 1);
  const contents = notesAtEnd.map(n => n.content);
  expect(contents).not.toContain(noteToDelete.content);
})
afterAll(async () => {
  await mongoose.connection.close();
});
