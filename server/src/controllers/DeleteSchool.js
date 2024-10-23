const { Schools } = require('../db');
require('dotenv').config();

module.exports = {
  DeleteSchool: async (req, res) => {
    const { schoolId } = req.params; // Obtener el ID de la escuela de los parámetros de la URL

    try {
      const schoolToDelete = await Schools.findByPk(schoolId); // Buscar la escuela por su ID
      if (!schoolToDelete) {
        return res.status(404).send({ success: false, message: "School not found" });
      }

      await schoolToDelete.destroy(); // Eliminar la escuela si se encuentra
      res.status(200).send({ success: true, message: "School deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
