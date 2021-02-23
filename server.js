console.log("Project 2 is here!!!")

// Dependencies
const express = require('express');
require('dotenv').config();

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes')(app);
const db = require('./models');

// Starts the server to begin listening
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
