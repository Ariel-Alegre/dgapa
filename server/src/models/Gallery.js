const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Gallery = sequelize.define('Gallery', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imageGallery: {
      type: DataTypes.STRING,
    },

  },  {
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  } );

  return Gallery;
};
