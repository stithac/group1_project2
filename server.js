// Dependencies
const path = require('path');
const express = require('express');
const session = require("express-session");
require('dotenv').config();
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require('express-handlebars');

var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
      subtract: function (num1, num2) { return num1 - num2; },
      divide: function (num1, num2){ return (num1 / num2) * 100},
      date: function(UTCDate){ return UTCDate.split('T')[0]},
      eq: function(var1, var2){if(var1 === var2){return 1}},
      time: function(timeVar){
        var hours = timeVar.split(':')[0];
        var am_pm;
        if (hours < 12){
          am_pm = "AM";
        } else {
          am_pm = "PM"
        }
        hours = ((hours + 11) % 12 + 1);
        var mins = timeVar.split(':')[1];

        return hours +":" + mins +" " + am_pm
      }
  }
});

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// We need to use sessions to keep track of our user's login status
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
  );
  app.use(passport.initialize());
  app.use(passport.session());

// Routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);
const db = require('./models');

// Starts the server to begin listening
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
