
  module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
      donationAmount: DataTypes.INTEGER,
    });


    Donation.associate = (models) => {
        // We're saying that a Donation should belong to an Registration
        // A Donation can't be created without a Registration due to the foreign key constraint
        Donation.belongsTo(models.Registration, {
          foreignKey: {
            allowNull: false,
          },
        });
      };



    return Donation;
  }