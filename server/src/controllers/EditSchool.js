const { Schools } = require('../db');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  // Función para editar una escuela existente
  EditSchool: async (req, res) => {
    const {schoolId, name, address, province, phone, email, year_of_operation } = req.body;

    try {
      // Buscar la escuela en la base de datos por ID
      const school = await Schools.findByPk(schoolId);
      if (!school) {
        return res.status(404).json({ message: 'Escuela no encontrada' });
      }

      let updatedLogoUrl = school.image; // Si no se actualiza el logo, mantener el existente

      // Verificar si se ha subido un nuevo archivo de logo
      if (req.file) {
        const logoFile = req.file;
        // Subir la nueva imagen a Cloudinary
        const cloudinaryUploadResultLogo = await cloudinary.uploader.upload(logoFile.path, {
          resource_type: 'image',
          quality: 'auto:best',
          fetch_format: 'auto',
        });

        updatedLogoUrl = cloudinaryUploadResultLogo.secure_url; // Actualizar la URL del logo
        console.log('Nuevo logo subido a Cloudinary:', updatedLogoUrl);
      }

      // Actualizar los datos de la escuela en la base de datos
      const updatedSchool = await school.update({
        name: name || school.name, // Si no se proporciona un valor, se mantiene el anterior
        address: address || school.address,
        province: province || school.province,
        phone: phone || school.phone,
        email: email || school.email,
        year_of_operation: year_of_operation || school.year_of_operation,
        image: updatedLogoUrl, // Actualizar el logo si se subió uno nuevo
      });

      res.status(200).send({ success: true, data: updatedSchool });
      console.log("Escuela actualizada correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor al actualizar la escuela' });
    }
  },
};
