// Dependencies
const path = require('path');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads main.html
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/index.html'))
  );

  // registration route loads registration.html
  app.get('/registration', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/registration.html'))
  );

  // volunteer route loads volunteer.html
  app.get('/volunteer', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/volunteer.html'))
  );

  // donations route loads donations.html
  app.get('/donations', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/donations.html'))
  );
};