const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Schools = sequelize.define(
    'Schools',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255), // Reducido a 255
      },
      address: {
        type: DataTypes.STRING(255), // Reducido a 255
      },
      province: {
        type: DataTypes.STRING(255), // Reducido a 255
      },
      phone: {
        type: DataTypes.STRING(100), // Reducido a 100
      },
      email: {
        type: DataTypes.STRING(255), // Reducido a 255
      },
      year_of_operation: {
        type: DataTypes.STRING(50), // Reducido a 50
      },
      sic: {
        type: DataTypes.STRING(255), // Reducido a 255
      },
      urlYoutube: {
        type: DataTypes.STRING(500), // Reducido a 500
      },
      image: {
        type: DataTypes.STRING(500), // Reducido a 500
      },
      plantel1: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      plantel2: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      plantel3: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      postgrado1: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      postgrado2: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      beca1: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      beca2: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      licenciatura1: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      licenciatura2: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      historia: {
        type: DataTypes.TEXT, // Cambiado a TEXT
      },
      alumnos: {
        type: DataTypes.JSON,
      },
      alumnos_mixta: {
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
      edad_profesores: {
        type: DataTypes.JSON,
      },
      profesoresMaestrias: {
        type: DataTypes.JSON,
      },
      profesoresConDoctorados: {
        type: DataTypes.JSON,
      },
      matriculaDocentes: {
        type: DataTypes.JSON,
      },
      matriculaDocentesEspecialidad: {
        type: DataTypes.JSON,
      },
      
      cuerposAcademicos: {
        type: DataTypes.JSON,
      },
      ofertaAcademicos: {
        type: DataTypes.JSON,
      },
      galeria: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: false, // Desactiva los campos createdAt y updatedAt
    }
  );

  return Schools;
};
