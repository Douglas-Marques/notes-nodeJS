const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };
  const duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const readNote = title => {
  const notes = fetchNotes();
  const findNote = notes.filter((note) => note.title === title);
  return findNote[0];
};

const removeNote = title => {
  const notes = fetchNotes();
  const filterNote = notes.filter((note) => note.title !== title);
  saveNotes(filterNote);

  return notes.length !== filterNote.length;
};

const logNote = (note, msg) => {
  debugger;
  if(note) {
    console.log(`Note ${msg}`);
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log(`Note could not be ${msg}`);
  }
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNote
};
