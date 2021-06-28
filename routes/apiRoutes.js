// Why doesn't this work on line 3 and same file location for line 32? => => const noteLog = JSON.parse(fs.readFileSync('..db/db.json'));

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const noteLog = JSON.parse(fs.readFileSync('db/db.json'));

/* const noteLog = JSON.parse(fs.readFile('db/db.json', 'utf8', (err, notes) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
})); */

function remove(array, key, value) {
    const index = array.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;
};

module.exports = (app) => {
    // Create new notes.
    app.get('/api/notes', (req, res) => res.json(noteLog));

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = uuidv4();
        noteLog.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(noteLog));
        res.json(noteLog);
    });

    app.delete('/api/notes', (req, res) => {
        const delNote = req.body.id;
        const newLog = remove(noteLog, "id", delNote);
        fs.writeFileSync('db/db.json', JSON.stringify(newLog));
        res.json(newLog);
    });
};