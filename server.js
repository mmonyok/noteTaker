const express = require('express');
const app = express();
const PORT = process.env.PORT || 7777;

// Sets up the Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Will allow our server to access these routes.
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Starts the server to begin listening.
app.listen(PORT, () => console.log('App is listening on PORT.'));