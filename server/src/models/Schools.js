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
      type: DataTypes.STRING(1000),
    },
    address: {
      type: DataTypes.STRING(1000),
    },
    province: {
      type: DataTypes.STRING(1000),
    },
    phone: {
      type: DataTypes.STRING(1000),
    },
    email: {
      type: DataTypes.STRING(1000),
    },
    year_of_operation: {
      type: DataTypes.STRING(1000),
    },
    sic: {
      type: DataTypes.STRING(1000),
    },
    urlYoutube: {
      type: DataTypes.STRING(1000),
    },


    image: {
      type: DataTypes.STRING(1000),
    },
    plantel1: {
      type: DataTypes.STRING(1000),
    },
    plantel2: {
      type: DataTypes.STRING(1000),
    },
    plantel3: {
      type: DataTypes.STRING(1000),
    },
    postgrado1: {
      type: DataTypes.STRING(1000),
    },

    postgrado2: {
      type: DataTypes.STRING(1000),
    },

    beca1: {
      type: DataTypes.STRING(1000),
    },
    beca2: {
      type: DataTypes.STRING(1000),
    },
    alumnos: {
      type: DataTypes.JSON,
    },
    alumnas: {
      type: DataTypes.JSON,
    },
    egresados: {
      type: DataTypes.JSON,
    },
    egresadas: {
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
