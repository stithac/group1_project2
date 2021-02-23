
  module.exports = (sequelize, DataTypes) => {
    const GeneralDonation = sequelize.define('GeneralDonation', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      street: DataTypes.INTEGER,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      phone: DataTypes.STRING,
    });


    GeneralDonation.associate = (models) => {
        // Associating general donation with credit card
        // When a general donation is deleted, also delete any associated credit card
        GeneralDonation.hasOne(models.CreditCard, {
          onDelete: 'cascade',
        });
      };

    GeneralDonation.associate = (models) => {
      // Associating general donation with donation
      // When a general donation is deleted, also delete any associated donations
      GeneralDonation.hasMany(models.Donation, {
        onDelete: 'cascade',
      });
    };

    return GeneralDonation;
  }