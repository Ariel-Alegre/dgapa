const { Schools } = require('../db');
require('dotenv').config();

module.exports = {
  DetailSchools: async (req, res) => {
    const { schoolId } = req.params; // Obtener el ID de la escuela desde los parámetros de la URL

    try {
      const school = await Schools.findByPk(schoolId); // Usar findByPk para buscar la escuela por su ID

      if (school) {
        res.status(200).send({ success: true, data: school });
        console.log("Detalles de la escuela");
      } else {
        res.status(404).send({ success: false, message: "No school found" });
        console.log("No hay escuelas publicadas con ese ID");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
