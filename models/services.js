
  module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define('Services', {
      serviceName: DataTypes.STRING,
      frequency: DataTypes.STRING,
      // dayOfWeek: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      recurring: DataTypes.BOOLEAN,
      frequency: DataTypes.STRING,
      timeOfDay: DataTypes.TIME,
      recurringNumber: DataTypes.INTEGER,
      sunday: DataTypes.BOOLEAN,
      monday: DataTypes.BOOLEAN,
      tuesday: DataTypes.BOOLEAN,
      wednesday: DataTypes.BOOLEAN,
      thursday: DataTypes.BOOLEAN,
      friday: DataTypes.BOOLEAN,
      saturday: DataTypes.BOOLEAN,
      notes: DataTypes.STRING
    });

    Services.associate = (models) => {
        // We're saying that a Service should belong to an Registration
        // A Service can't be created without an Registration due to the foreign key constraint
        Services.belongsTo(models.Registration, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

      Services.associate = (models) => {
        // Associating services with pets
        // When a service is deleted, also delete any associated pets
        Services.belongsToMany(models.Pets,
             {through: 'ServicesPets' }
        );
      };

    return Services;
  }