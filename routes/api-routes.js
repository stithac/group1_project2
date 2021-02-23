// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies
const db = require('../models');

// Routes
module.exports = (app) => {
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
  })
};