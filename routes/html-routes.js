// Dependencies
const path = require('path');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/index.html'))
  );

  // login route loads login.html
  app.get('/login', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/login.html'))
  );

  // registration route loads registration.html
  app.get('/registration', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/registration.html'))
  );

  // pet route loads main.html
  app.get('/pet', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/pet.html'))
  );

  // donations route loads donations.html. Displays all general donations
  app.get('/donations', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/donations.html'))
  );

  // volunteer route loads all-volunteers.html
  app.get('/allvolunteers', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/allvolunteers.html'))
  );

  // aboutus route loads aboutus.html
  app.get('/aboutus', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/aboutus.html'))
  );

  // users route loads users.html. Displays all registered users
  app.get('/allusers', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/allusers.html'))
  );

  // userprofile route loads userprofile.html
  app.get('/userprofile', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/userprofile.html'))
  );

  // donatepet route loads donatepet.html
  app.get('/donatepet', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/donatepet.html'))
  );

  // volunteerpet route loads volunteerpet.html
  app.get('/volunteerpet', (req, res) =>
    res.sendFile(path.join(__dirname, '../views/volunteerpet.html'))
  );

/*__________________________________________________________________________________________________*/

  // Passport routes:

//   // Requiring our custom middleware for checking if a user is logged in
// const isAuthenticated = require("../config/middleware/isAuthenticated");

// module.exports = function(app) {
//   app.get("/", (req, res) => {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.sendFile(path.join(__dirname, "../public/signup.html"));
//   });

//   app.get("/login", (req, res) => {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.sendFile(path.join(__dirname, "../public/login.html"));
//   });

//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/members", isAuthenticated, (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/members.html"));
//   });
};