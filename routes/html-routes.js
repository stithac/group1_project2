
// Dependencies
const path = require('path');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
    }
  );

  // signup route loads the signup.html
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // login route loads login.html
  app.get('/login', (req, res) => {
     // If the user already has an account send them to the userLanding page
     if (req.user) {
       res.sendFile(path.join(__dirname, "../public/userLanding.html"));
     }
     res.sendFile(path.join(__dirname, "../public/login.html"));
  });

   // Here we've add our isAuthenticated middleware to this route.
   // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/userLanding', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/userLanding.html'))
  );

  // route to display User Update Registration page
  // if user is not logged in and tries to access this route they will be redirected to the signup page
  app.get('/updateReg', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/updateReg.html'))
  );

  // registration route loads registration.html
  // if user is not logged in and tries to access this route they will be redirected to the signup page
  app.get('/registration', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/registration.html'))
  );

  // pet route loads main.html
  app.get('/pet', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/pet.html'))
  );

  // donations route loads donations.html. Displays all general donations
  // if a user is not logged in and tries to access this route they will be redirected to the signup page
  app.get('/donations', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/donations.html'))
  );

  // volunteer route loads all-volunteers.html
  app.get('/allvolunteers', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/allvolunteers.html'))
  );

  // aboutus route loads aboutus.html
  app.get('/aboutus', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/aboutus.html'))
  );

  // donatepet route loads donatepet.html
  // if a user is not logged in and tries to access this route they will be redirected to the signup page
  app.get('/donatepet', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/donatepet.html'))
  );

  // volunteerpet route loads volunteerpet.html
  app.get('/volunteerpet', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/volunteerpet.html'))
  );

  // generaldonation route loads generaldonation.html
  app.get('/generalDonation', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/generaldonation.html'))
  );

    // successfulpets route loads successpets.html
    app.get('/successfulpets', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/successfulpets.html'))
  );
};