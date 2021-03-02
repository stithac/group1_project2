
  module.exports = (sequelize, DataTypes) => {
    const Pets = sequelize.define('Pets', {
      petName: DataTypes.STRING,
      picURL: DataTypes.STRING,
      breed_type: DataTypes.STRING,
      petAge: DataTypes.INTEGER,
      petBio: DataTypes.STRING,
      petWeight: DataTypes.INTEGER,
      helpReason: DataTypes.STRING,
      services_monetary: DataTypes.STRING,
      requestAmount: DataTypes.INTEGER,
      raisedAmount: {
        type: DataTypes.INTEGER,
        defaultValue: '0'
      },
      amountMet: DataTypes.BOOLEAN,
    });

    Pets.associate = (models) => {
      // We're saying that a Pet should belong to an Registration
      // A Pet can't be created without a Registration due to the foreign key constraint
      Pets.belongsTo(models.Registration, {
        foreignKey: {
          allowNull: false,
        },
      });
    };

    Pets.associate = (models) => {
      // Associating pets with services
      // When a pet is deleted, also delete any associated services
      Pets.belongsToMany(models.Services,
        { through: 'ServicesPets' }
      );
    };

    Pets.associate = (models) => {
      // Associating pets with donations
      // When a pet is deleted, also delete any associated donations
      Pets.hasMany(models.Donation, {
        onDelete: 'cascade',
      });
    };

    return Pets;
  }
