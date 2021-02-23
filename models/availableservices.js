
  module.exports = (sequelize, DataTypes) => {
    const AvailableServices = sequelize.define('AvailableServices', {
        serviceItem: DataTypes.STRING,
    });

    return AvailableServices;
  }