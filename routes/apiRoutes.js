const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Finds the object within the array that matches the body id of the fetch and removes it then returns the array without that object.
function remove(array, key, value) {
    const index = array.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;
};

module.exports = (app) => {
    // Accesses the data in the api.
    app.get('/api/notes', (req, res) => {
        const noteLog = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        res.json(noteLog)
    });

    // Posts new data to the api.
    app.post('/api/notes', (req, res) => {
        const noteLog = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        const newNote = req.body;
        newNote.id = uuidv4();
        noteLog.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(noteLog));
        res.json(noteLog);
    });

    // Deletes selected note in the api.
    app.delete('/api/notes/:id', (req, res) => {
        const noteLog = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        const delNote = req.params.id;
        const newLog = remove(noteLog, "id", delNote);
        fs.writeFileSync('db/db.json', JSON.stringify(newLog));
        res.json(newLog);
    });
};