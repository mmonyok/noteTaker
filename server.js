const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Allows the server to access the public folder.
app.use(express.static('public'));

// Will allow our server to access these routes.
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

// Starts the server to begin listening.
app.listen(PORT, () => console.log('App is listening on PORT.'));