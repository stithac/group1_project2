
  module.exports = (sequelize, DataTypes) => {
    const Pets = sequelize.define('Pets', {
      dogName: DataTypes.STRING,
      picURL: DataTypes.STRING,
      breed: DataTypes.STRING,
      petAge: DataTypes.INTEGER,
      funFact: DataTypes.STRING,
      reason: DataTypes.STRING,
      dogBio: DataTypes.STRING,
      requestAmount: DataTypes.INTEGER,
      raisedAmount: DataTypes.INTEGER,
    });

    return Pets;
  }
