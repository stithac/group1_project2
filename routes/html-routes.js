
// Dependencies
const path = require('path');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get('/', (req, res) => {
     // If the user already has an account send them to the members page
    //  if (req.user) {
    //    res.redirect("/members");
    //  }
    //  console.log("doesn't have account");
    //  console.log("redirect to signup.html");
    //  res.sendFile(path.join(__dirname, "../public/signup.html"));

  //  res.sendFile(path.join(__dirname, '../public/index.html'))
//      if (req.user) {
//        res.redirect("/userLanding");
//      }
//      console.log("doesn't have account");
//      console.log("redirect to signup.html");
// //     res.sendFile(path.join(__dirname, "../public/signup.html"));

    res.sendFile(path.join(__dirname, '../public/index.html'))
    }
  );

  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // login route loads login.html
  app.get('/login', (req, res) => {
     // If the user already has an account send them to the members page
     if (req.user) {
       console.log("found account and redirect to members");
       res.sendFile(path.join(__dirname, "../public/userLanding.html"));
     }
     res.sendFile(path.join(__dirname, "../public/passportlogin.html"));
  }
//    res.sendFile(path.join(__dirname, '../public/login.html'))
  );

   // Here we've add our isAuthenticated middleware to this route.
   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/members", isAuthenticated, (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/members.html"));
//   });

   // Here we've add our isAuthenticated middleware to this route.
   // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/userLanding', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/userLanding.html'))
  );

  // registration route loads registration.html
  app.get('/registration', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/registration.html'))
  );

  // pet route loads main.html
  app.get('/pet', isAuthenticated, (req, res) =>
    res.sendFile(path.join(__dirname, '../public/pet.html'))
  );

  // donations route loads donations.html. Displays all general donations
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

  // users route loads users.html. Displays all registered users
  app.get('/allusers', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/allusers.html'))
  );

  // userprofile route loads userprofile.html
  app.get('/userprofile', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/userprofile.html'))
  );

  // donatepet route loads donatepet.html
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