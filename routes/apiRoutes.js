// Why doesn't this work on line 3 and same file location for line 32? => => const noteLog = JSON.parse(fs.readFileSync('..db/db.json'));

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const noteLog = JSON.parse(fs.readFileSync('db/db.json'));
let noteArray = [];

/* const noteLog = fs.readFile('../db/db.json', 'utf8', (err, notes) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
        const notes = JSON.parse(fs.readFileSync('../db/db.json'));
    } catch (err) {
        console.log(err);
        return;
    }
    console.log('File data:', notes);
}); */

module.exports = (app) => {
    // Create new notes.
    app.get('/api/notes', (req, res) => res.json(noteLog));

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = uuidv4();
        console.log("What is newNote?");
        console.log(typeof noteLog);
        console.log(noteLog);
        noteArray.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(noteArray));
        res.json(noteArray);
    });
};