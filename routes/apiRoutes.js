const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function remove(array, key, value) {
    const index = array.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;
};

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        const noteLog = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        res.json(noteLog)
    });

    // Create new notes.
    app.post('/api/notes', (req, res) => {
        const noteLog = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        const newNote = req.body;
        newNote.id = uuidv4();
        noteLog.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(noteLog));
        res.json(noteLog);
    });

    // Deletes selected note.
    app.delete('/api/notes/:id', (req, res) => {
        const noteLog = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        const delNote = req.params.id;
        const newLog = remove(noteLog, "id", delNote);
        fs.writeFileSync('db/db.json', JSON.stringify(newLog));
        res.json(newLog);
    });
};