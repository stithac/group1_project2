
  module.exports = (sequelize, DataTypes) => {
    const AvailableServices = sequelize.define('AvailableServices', {
      cardNumber: DataTypes.STRING,
      securityCode: DataTypes.INTEGER,
      nameOnCard: DataTypes.STRING,
      expirationDate: DataTypes.DATE,
      cardType: DataTypes.STRING,
    });

    return AvailableServices;
  }