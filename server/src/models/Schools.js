const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Schools = sequelize.define('Schools', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    year_of_operation: {
      type: DataTypes.STRING,
    },
    sic: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
    plantel1: {
      type: DataTypes.STRING,
    },
    plantel2: {
      type: DataTypes.STRING,
    },
    plantel3: {
      type: DataTypes.STRING,
    },
    postgrado1: {
      type: DataTypes.STRING,
    },

    postgrado2: {
      type: DataTypes.STRING,
    },

    beca1: {
      type: DataTypes.STRING,
    },
    beca2: {
      type: DataTypes.STRING,
    },
    alumnos: {
      type: DataTypes.JSON,
    },
    egresados: {
      type: DataTypes.JSON,
    },
     doctoresJubilados: {
      type: DataTypes.JSON,
    }, 
    doctoresCandidatos: {
      type: DataTypes.JSON,
    }, 
    profesores: {
      type: DataTypes.JSON,
    }, 
    profesoresMaestrias: {
      type: DataTypes.JSON,
    }, 
    profesoresConDoctorados: {
      type: DataTypes.JSON,
    },

  }, {
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  });

  return Schools;
};
