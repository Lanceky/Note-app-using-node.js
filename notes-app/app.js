const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addNote = (title, content) => {
  const note = { title, content };
  const notes = JSON.parse(fs.readFileSync('notes.json', 'utf8') || '[]');
  notes.push(note);
  fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
  console.log('Note added successfully!');
};

const viewNotes = () => {
  const notes = JSON.parse(fs.readFileSync('notes.json', 'utf8') || '[]');
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note.title}`);
  });
};

rl.question('Enter a command (add/view): ', (command) => {
  if (command === 'add') {
    rl.question('Enter title: ', (title) => {
      rl.question('Enter content: ', (content) => {
        addNote(title, content);
        rl.close();
      });
    });
  } else if (command === 'view') {
    viewNotes();
    rl.close();
  } else {
    console.log('Invalid command');
    rl.close();
  }
});

