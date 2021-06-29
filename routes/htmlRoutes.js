const path = require('path');

module.exports = (app) => {
    // This route takes you to the notes page.
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));

    // This route takes you to the home page.
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

    // This route takes you to the home page if selected query does not match anything.
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
};