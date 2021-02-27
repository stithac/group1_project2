// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

  module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define('Registration', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email:  {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      phone: DataTypes.STRING,
      // volunteer: DataTypes.BOOLEAN,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      securityQuestion: DataTypes.STRING,
      securityAnswer: DataTypes.STRING,
      help_volunteer: DataTypes.STRING
    });


    Registration.associate = (models) => {
        // Associating registration with credit card
        // When a registration is deleted, also delete any associated credit card
        Registration.hasOne(models.CreditCard, {
          onDelete: 'cascade',
        });
      };

    Registration.associate = (models) => {
      // Associating registration with donation
      // When a registration is deleted, also delete any associated donations
      Registration.hasMany(models.Donation, {
        onDelete: 'cascade',
      });
      // Associating registration with pets
      // When a registration is deleted, also delete any associated pets
      Registration.hasMany(models.Pets, {
        onDelete: 'cascade',
      });
      // Associating Registration with Services
      // When a Registration is deleted, also delete any associated Services
      Registration.hasMany(models.Services, {
        onDelete: 'cascade',
      });
    };


      // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Registration.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Registration.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
//    Registration.associate = (models) => {
        // Associating registration with pets
        // When a registration is deleted, also delete any associated pets
//        Registration.hasMany(models.Pets, {
//          onDelete: 'cascade',
//        });
//      };

//      Registration.associate = (models) => {
        // Associating Registration with Services
        // When a Registration is deleted, also delete any associated Services
//        Registration.hasMany(models.Services, {
//          onDelete: 'cascade',
//        });
//      };

    return Registration;
  }