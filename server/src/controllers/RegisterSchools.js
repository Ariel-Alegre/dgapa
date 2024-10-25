const { Schools } = require('../db');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  RegisterSchools: async (req, res) => {
    const { name, address, province, phone, email, year_of_operation, sic, alumnos, egresados, doctoresJubilados, doctoresCandidatos, profesores, profesoresMaestrias, profesoresConDoctorados, postgrado1, postgrado2, beca1, beca2, urlYoutube} = req.body;

    try {
      let logoUrl = null;
      let plantel1Url = null;
      let plantel2Url = null;
      let plantel3Url = null;

      // Imprimir los archivos recibidos para depuración
      console.log('Archivos recibidos:', req.files);

      // Subir logo si existe
      if (req.files && req.files.image) {
        const logoFile = req.files.image[0];
        const cloudinaryUploadResultLogo = await cloudinary.uploader.upload(logoFile.path, {
          resource_type: 'image',
          quality: 'auto:low',
          fetch_format: 'auto',
        });
        logoUrl = cloudinaryUploadResultLogo.secure_url;
        console.log('Logo subido a Cloudinary:', logoUrl);
      }

      // Subir los archivos PDF de los planteles a Cloudinary
      if (req.files) {
        const { plantel1, plantel2, plantel3 } = req.files;

        if (plantel1 && plantel1.length > 0) {
          const plantel1Upload = await cloudinary.uploader.upload(plantel1[0].path, {
            resource_type: 'raw',   // Mantén el tipo de archivo como raw si es un PDF
            format: 'pdf',          // Especifica el formato como PDF
            type: 'upload',         // Asegúrate de que el archivo se sube públicamente
            access_mode: 'public'   // Establece el acceso como público
          });
          plantel1Url = plantel1Upload.secure_url;
          console.log('Plantel 1 subido:', plantel1Url);
        }

        if (plantel2 && plantel2.length > 0) {
          const plantel2Upload = await cloudinary.uploader.upload(plantel2[0].path, {
            resource_type: 'raw',   // Mantén el tipo de archivo como raw si es un PDF
            format: 'pdf',          // Especifica el formato como PDF
            type: 'upload',         // Asegúrate de que el archivo se sube públicamente
            access_mode: 'public'   // Establece el acceso como público
          });
          plantel2Url = plantel2Upload.secure_url;
          console.log('Plantel 2 subido:', plantel2Url);
        }

        if (plantel3 && plantel3.length > 0) {
          const plantel3Upload = await cloudinary.uploader.upload(plantel3[0].path, {
            resource_type: 'raw',   // Mantén el tipo de archivo como raw si es un PDF
            format: 'pdf',          // Especifica el formato como PDF
            type: 'upload',         // Asegúrate de que el archivo se sube públicamente
            access_mode: 'public'   // Establece el acceso como público
          });
          plantel3Url = plantel3Upload.secure_url;
          console.log('Plantel 3 subido:', plantel3Url);
        }
      }
      const parsedAlumnos = JSON.parse(alumnos);
      const parsedEgresados = JSON.parse(egresados);
      const parsedDoctoresJubilados = JSON.parse(doctoresJubilados);
      const parsedDoctoresCandidatos = JSON.parse(doctoresCandidatos);
      const parsedProfesores = JSON.parse(profesores);
      const parsedProfesoresMaestrias = JSON.parse(profesoresMaestrias);
      const parsedProfesoresConDoctorados = JSON.parse(profesoresConDoctorados);
      // Crear la escuela en la base de datos
      const school = await Schools.create({
        name,
        address,
        province,
        phone,
        email,
        year_of_operation,
        sic,
        postgrado1,
         postgrado2,
          beca1,
           beca2,
           urlYoutube,
        alumnos: parsedAlumnos,
        egresados: parsedEgresados,
        doctoresJubilados: parsedDoctoresJubilados,
        doctoresCandidatos: parsedDoctoresCandidatos,
        profesores: parsedProfesores,
        profesoresMaestrias: parsedProfesoresMaestrias,
        profesoresConDoctorados: parsedProfesoresConDoctorados,
        image: logoUrl,
        plantel1: plantel1Url,
        plantel2: plantel2Url,
        plantel3: plantel3Url
      });

      res.status(200).send({ success: true, data: school });
      console.log("Escuela registrada correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
