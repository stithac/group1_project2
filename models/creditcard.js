// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

  module.exports = (sequelize, DataTypes) => {
    const CreditCard = sequelize.define('CreditCard', {
      cardNumber: DataTypes.STRING,
      securityCode: DataTypes.STRING,
      nameOnCard: DataTypes.STRING,
      expirationDate: DataTypes.DATE,
      cardType: DataTypes.STRING,
      billingAddress: DataTypes.STRING
    });

    CreditCard.associate = (models) => {
        // We're saying that a CreditCard should belong to an Registration
        // A CreditCard can't be created without an Registration due to the foreign key constraint
        CreditCard.belongsTo(models.Registration, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      CreditCard.addHook("beforeCreate", user => {
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

    return CreditCard;
  }