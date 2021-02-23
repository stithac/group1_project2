
  module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define('Registration', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      street: DataTypes.INTEGER,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      phone: DataTypes.STRING,
      volunteer: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      securityQuestion: DataTypes.STRING,
      securityAnswer: DataTypes.STRING,
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