const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bookings = sequelize.define('Bookings', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    airline: {
      type: DataTypes.STRING,
    },

    fight_number: {
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.STRING,
    },

    
    code: {
      type: DataTypes.STRING,
    },
  },  );

  return Bookings;
};
