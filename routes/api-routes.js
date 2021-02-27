// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies
const db = require('../models');
// Requiring our models and passport as we've configured it
const passport = require("../config/passport");

// Routes
module.exports = function (app) {
  // Get all pets
  app.get('/api/pets', (req, res) => {
    // Finding all Pets, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous and results are available to us inside the .then
    db.Pets.findAll({}).then((results) => res.json(results));
    console.log(results);
  });

  app.get('/api/accounts', (req, res) => {
    // finding all accounts
    db.Registration.findAll({}).then((results) => res.json(results));
    console.log(results);
  });

  app.get('/api/donations', (req, res) => {
    // finding all donations
    db.Donations.findAll({}).then((results) => res.json(results));
    console.log(results);
  });

  app.get('/api/volunteers', (req, res) => {
    // finding all volunteers
    db.Volunteers.findAll({}).then((results) => res.json(results));
    console.log(results);
  });

  app.get('/api/envVars', (req, res) => {
    console.log("in route api/envVars");
    var envVars = {
      cloudName: process.env.CLOUD_NAME,
      uploadPreset: process.env.UPLOAD_PRESET,
    }
    res.json(envVars);
  });

  app.post("/api/donatePet", (req, res) => {
    console.log("inside api/donatePet");
    console.log("regId = " + req.body.registrationId);
    db.Donation.create({
        RegistrationId: parseInt(req.body.registrationId),
        donationAmount: parseInt(req.body.donationAmount),
        PetId: parseInt(req.body.petId),
      })
      .then((data) => {
        console.log("inside donatePet promise");
        //      res.redirect(307, "/api/members");
        res.status(200).json(data);
      })
      .catch(err => {
        console.log("inside donatePet catch");
        console.log(err);
        res.status(401).json(err);
      })
  })
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    console.log("api/login");
    console.log(req.user);
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize Registration Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.Registration.create({
        email: req.body.email,
        password: req.body.password,
      })
      .then(() => {
        console.log("inside signup promise");
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log("inside signup catch");
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.post("/api/register", (req, res) => {

    console.log("inside api/register");
    console.log(req.body);
    db.Registration.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        securityQuestion: req.body.question,
        securityAnswer: req.body.answer,
        help_volunteer: req.body.help_volunteer
      }, {
        where: {
          email: req.body.email
        }
      }).then((dbUser) => {
        console.log(dbUser);
        res.status(200).json(dbUser);
      })
      .catch(err => {
        console.log("inside get failure");
        console.log(err);
        res.status(401).json(err);
      })
  });

  app.post("/api/generalDonation", (req, res) => {

    console.log("inside api/generalDonation");
    console.log(req.body);
    db.GeneralDonation.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email,
        cardNumber: req.body.cardNumber,
        securityCode: req.body.securityCode,
        cardType: req.body.cardType,
        nameOnCard: req.body.nameOnCard,
        expirationDate: req.body.expirationDate,
        donationAmount: parseInt(req.body.donationAmount),
      }).then((dbUser) => {
        console.log(dbUser);
        res.status(200).json(dbUser);
      })
      .catch(err => {
        console.log("inside get failure");
        console.log(err);
        res.status(401).json(err);
      })
  });

  app.post("/api/saveDonation", (req, res) => {

    console.log("inside api/saveDonation");
    console.log(req.body);
    db.Donation.create({
        donationAmount: parseInt(req.body.donationAmount),
        RegistrationId: 1
      }).then((dbUser) => {
        console.log(dbUser);
        res.status(200).json(dbUser);
      })
      .catch(err => {
        console.log("inside post failure");
        console.log(err);
        res.status(401).json(err);
      })
  });

  app.post("/api/updateRaisedAmount", (req, res) => {

    console.log("inside api/updateRaisedAmount");
    console.log(req.body);
    db.Pets.update({
        raisedAmount: parseInt(req.body.raisedAmount),
      }, {
        where: {
          id: parseInt(req.body.petId)
        }
      }).then((dbUser) => {
        console.log(dbUser);
        res.status(200).json(dbUser);
      })
      .catch(err => {
        console.log("inside post failure");
        console.log(err);
        res.status(401).json(err);
      })
  });

  app.post("/api/registerPet", (req, res) => {

    console.log("inside api/registerPet");
    console.log(req.body);
    console.log(parseInt(req.body.registrationId));
    console.log("pet weight = " + req.body.petWeight);
    db.Pets.create({
        petName: req.body.petName,
        picURL: req.body.picURL,
        breed_type: req.body.breed_type,
        petAge: parseInt(req.body.petAge),
        petWeight: parseInt(req.body.petWeight),
        petBio: req.body.petBio,
        helpReason: req.body.helpReason,
        requestAmount: parseInt(req.body.amountRequested),
        services_monetary: req.body.services_monetary,
        RegistrationId: parseInt(req.body.registrationId)
      }).then((dbUser) => {
        console.log(dbUser);
        res.status(200).json(dbUser);
      })
      .catch(err => {
        console.log("inside get failure");
        console.log(err);
        res.status(401).json(err);
      })
  });

  app.post("/api/registerService", (req, res) => {

    console.log("inside api/registerService");
    console.log(req.body);
    console.log(parseInt(req.body.registrationId));
    db.Services.create({
        serviceName: req.body.serviceName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        recurring: req.body.recurring,
        frequency: req.body.frequency,
        timeOfDay: req.body.timeOfDay,
        recurringNumber: parseInt(req.body.recurringNumber),
        sunday: req.body.sunday,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday,
        notes: req.body.notes,
        RegistrationId: parseInt(req.body.registrationId)
      }).then((dbUser) => {
        console.log(dbUser);
        res.status(200).json(dbUser);
      })
      .catch(err => {
        console.log("inside get failure");
        console.log(err);
        res.status(401).json(err);
      })
  });

  app.get("/api/getPetInfo", (req, res) => {

    console.log("inside api/getPetInfo");
    db.Pets.findOne({
        where: {
          id: 1
        }
      }).then((dbUser) => {
        console.log(dbUser);
        res.status(200).json(dbUser);
      })
      .catch(err => {
        console.log("inside get failure");
        console.log(err);
        res.status(401).json(err);
      })
  });

  app.get("/api/userExists", (req, res) => {
    console.log("inside userExists");
    db.Registration.findAll()
      .then((dbUser) => {
        res.status(200).json(dbUser);
      })
      .catch(err => {
        res.status(401).json(err);
      })
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      console.log(req.user.id);
      console.log(req.user.email);
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};