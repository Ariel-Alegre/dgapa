const { Schools } = require('../db');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  // Función para editar una escuela existente
  EditSchool: async (req, res) => {
    const {
      schoolId, name, address, province, phone, email, year_of_operation, sic,
      alumnos, egresados, doctoresJubilados, doctoresCandidatos, profesores,
      profesoresMaestrias, profesoresConDoctorados, postgrado1, postgrado2, beca1, beca2, urlYoutube
    } = req.body;

    try {
      // Buscar la escuela en la base de datos por ID
      const school = await Schools.findByPk(schoolId);
      if (!school) {
        return res.status(404).json({ message: 'Escuela no encontrada' });
      }

      let updatedLogoUrl = school.image;  // Si no se actualiza el logo, mantener el existente
      let updatedPlantel1Url = school.plantel1;
      let updatedPlantel2Url = school.plantel2;
      let updatedPlantel3Url = school.plantel3;

      // Verificar si se ha subido un nuevo logo
      if (req.files && req.files.image) {
        const logoFile = req.files.image[0];
        const cloudinaryUploadResultLogo = await cloudinary.uploader.upload(logoFile.path, {
          resource_type: 'image',
          quality: 'auto:best',
          fetch_format: 'auto',
        });
        updatedLogoUrl = cloudinaryUploadResultLogo.secure_url; // Actualizar la URL del logo
        console.log('Nuevo logo subido a Cloudinary:', updatedLogoUrl);
      }

      // Verificar si se han subido nuevos archivos PDF para los planteles
      if (req.files) {
        const { plantel1, plantel2, plantel3 } = req.files;

        if (plantel1 && plantel1.length > 0) {
          const plantel1Upload = await cloudinary.uploader.upload(plantel1[0].path, {
            resource_type: 'raw',
            format: 'pdf',
            type: 'upload',
            access_mode: 'public'
          });
          updatedPlantel1Url = plantel1Upload.secure_url;
          console.log('Plantel 1 subido:', updatedPlantel1Url);
        }

        if (plantel2 && plantel2.length > 0) {
          const plantel2Upload = await cloudinary.uploader.upload(plantel2[0].path, {
            resource_type: 'raw',
            format: 'pdf',
            type: 'upload',
            access_mode: 'public'
          });
          updatedPlantel2Url = plantel2Upload.secure_url;
          console.log('Plantel 2 subido:', updatedPlantel2Url);
        }

        if (plantel3 && plantel3.length > 0) {
          const plantel3Upload = await cloudinary.uploader.upload(plantel3[0].path, {
            resource_type: 'raw',
            format: 'pdf',
            type: 'upload',
            access_mode: 'public'
          });
          updatedPlantel3Url = plantel3Upload.secure_url;
          console.log('Plantel 3 subido:', updatedPlantel3Url);
        }
      }

      // Parsear los datos JSON si se envían
      const parsedAlumnos = alumnos ? JSON.parse(alumnos) : school.alumnos;
      const parsedEgresados = egresados ? JSON.parse(egresados) : school.egresados;
      const parsedDoctoresJubilados = doctoresJubilados ? JSON.parse(doctoresJubilados) : school.doctoresJubilados;
      const parsedDoctoresCandidatos = doctoresCandidatos ? JSON.parse(doctoresCandidatos) : school.doctoresCandidatos;
      const parsedProfesores = profesores ? JSON.parse(profesores) : school.profesores;
      const parsedProfesoresMaestrias = profesoresMaestrias ? JSON.parse(profesoresMaestrias) : school.profesoresMaestrias;
      const parsedProfesoresConDoctorados = profesoresConDoctorados ? JSON.parse(profesoresConDoctorados) : school.profesoresConDoctorados;

      
      // Actualizar los datos de la escuela en la base de datos
      const updatedSchool = await school.update({
        name: name || school.name,
        address: address || school.address,
        province: province || school.province,
        phone: phone || school.phone,
        email: email || school.email,
        year_of_operation: year_of_operation || school.year_of_operation,
        sic: sic || school.sic,
        urlYoutube: urlYoutube || school.urlYoutube,
        alumnos: parsedAlumnos,
        egresados: parsedEgresados,
        doctoresJubilados: parsedDoctoresJubilados,
        doctoresCandidatos: parsedDoctoresCandidatos,
        profesores: parsedProfesores,
        profesoresMaestrias: parsedProfesoresMaestrias,
        profesoresConDoctorados: parsedProfesoresConDoctorados,
        postgrado1: postgrado1 || school.postgrado1,
        postgrado2: postgrado2 || school.postgrado2,
        beca1: beca1 || school.beca1,
        beca2: beca2 || school.beca2,
        image: updatedLogoUrl,  // Actualizar el logo si se subió uno nuevo
        plantel1: updatedPlantel1Url,  // Actualizar los planteles si se subieron nuevos
        plantel2: updatedPlantel2Url,
        plantel3: updatedPlantel3Url
      });

      res.status(200).send({ success: true, data: updatedSchool });
      console.log("Escuela actualizada correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor al actualizar la escuela' });
    }
  }
};
