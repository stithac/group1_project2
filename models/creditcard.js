
  module.exports = (sequelize, DataTypes) => {
    const CreditCard = sequelize.define('CreditCard', {
      cardNumber: DataTypes.STRING,
      securityCode: DataTypes.INTEGER,
      nameOnCard: DataTypes.STRING,
      expirationDate: DataTypes.DATE,
      cardType: DataTypes.STRING,
    });

    CreditCard.associate = (models) => {
        // We're saying that a CreditCard should belong to an Registration
        // A CreditCard can't be created without an Registration due to the foreign key constraint
        CreditCard.belongsTo(models.Registration, {
          foreignKey: {
            allowNull: false,
          },
        });
        // We're saying that a CreditCard should belong to a General Donation
        // A CreditCard can't be created without an General Donation due to the foreign key constraint
        CreditCard.belongsTo(models.GeneralDonation, {
            foreignKey: {
              allowNull: false,
            },
          });
      };

    return CreditCard;
  }