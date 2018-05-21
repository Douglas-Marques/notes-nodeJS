const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOption =  {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOption = {
    describe: 'Content of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
          .command('add', 'Add a new note', {
            title: titleOption,
            body: bodyOption
          })
          .command('list', 'List all notes')
          .command('read', 'Read a note', {
            title: titleOption
          })
          .command('remove', 'Remove a note', {
            title: titleOption
          })
          .help()
          .argv;

const command = argv._[0];

if(command === 'add') {
  const added = notes.addNote(argv.title, argv.body);
  notes.logNote(added, 'added');
} else if(command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note, ''));
} else if(command === 'read') {
  const readed = notes.readNote(argv.title);
  notes.logNote(readed, 'readed');
} else if(command === 'remove') {
  const removed = notes.removeNote(argv.title);
  const message = removed ? 'Note was removed' : 'Note was not removed';
  console.log(message);
} else {
  console.log('Command not recognized');
}
