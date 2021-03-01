// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

  module.exports = (sequelize, DataTypes) => {
    const GeneralDonation = sequelize.define('GeneralDonation', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      phone: DataTypes.STRING,
      cardNumber: DataTypes.STRING,
      securityCode: DataTypes.STRING,
      nameOnCard: DataTypes.STRING,
      expirationDate: DataTypes.DATE,
      cardType: DataTypes.STRING,
      donationAmount: DataTypes.INTEGER,
    });

      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      GeneralDonation.addHook("beforeCreate", user => {
        user.cardNumber = bcrypt.hashSync(
          user.cardNumber,
          bcrypt.genSaltSync(10),
          null
        );
        user.securityCode = bcrypt.hashSync(
          user.securityCode,
          bcrypt.genSaltSync(10),
          null
        );
      });

    return GeneralDonation;
  }