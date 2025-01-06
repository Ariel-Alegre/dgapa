const { Schools } = require('../db');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  EditSchool: async (req, res) => {
 const { name,
      address,
      province,
      phone,
      email,
      year_of_operation,
      sic,
      urlYoutube,
     postgrado1,
      postgrado2,
      beca1,
      beca2,
      licenciatura1,
      licenciatura2,
      historia,
      alumnos,
      alumnos_mixta,
      egresados,
      doctoresJubilados,
      doctoresCandidatos,
      profesores,
      edad_profesores,
      profesoresMaestrias,
      profesoresConDoctorados,
      matriculaDocentes,
      matriculaDocentesEspecialidad,

      cuerposAcademicos,
      ofertaAcademicos,
    } = req.body;

    try {

      const school = await Schools.findByPk(schoolId);
      if (!school) {
        return res.status(404).json({ message: 'Escuela no encontrada' });
      }
      let logoUrl = null;
      let plantel1Url = null;
      let plantel2Url = null;
      let plantel3Url = null;
      let galeriaUrls = []; // Arreglo para las URLs de la galería
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

      if (req.files && req.files.image) {
        const logoFile = req.files.image[0];
        const cloudinaryUploadResultLogo = await cloudinary.uploader.upload(logoFile.path, {
          resource_type: 'image',
          quality: 'auto:low',
          fetch_format: 'auto',
        });
        logoUrl = cloudinaryUploadResultLogo.secure_url;
      }

      // Subir planteles
      if (req.files) {
        const { plantel1, plantel2, plantel3 } = req.files;

        if (plantel1 && plantel1.length > 0) {
          const plantel1Upload = await cloudinary.uploader.upload(plantel1[0].path, {
            resource_type: 'raw',
            format: 'pdf',
            type: 'upload',
            access_mode: 'public'
          });
          plantel1Url = plantel1Upload.secure_url;
        }

        if (plantel2 && plantel2.length > 0) {
          const plantel2Upload = await cloudinary.uploader.upload(plantel2[0].path, {
            resource_type: 'raw',
            format: 'pdf',
            type: 'upload',
            access_mode: 'public'
          });
          plantel2Url = plantel2Upload.secure_url;
        }

        if (plantel3 && plantel3.length > 0) {
          const plantel3Upload = await cloudinary.uploader.upload(plantel3[0].path, {
            resource_type: 'raw',
            format: 'pdf',
            type: 'upload',
            access_mode: 'public'
          });
          plantel3Url = plantel3Upload.secure_url;
        }
      }

      // Subir galería
      if (req.files && req.files.galeria) {
        const galeriaFiles = req.files.galeria;
        for (const file of galeriaFiles) {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            resource_type: 'image',
            quality: 'auto:low',
            fetch_format: 'auto'
          });
          galeriaUrls.push(uploadResult.secure_url);
        }
      }

      const parsedAlumnos = alumnos ?JSON.parse(alumnos) : [];
      const parsedAlumnosMixtos = alumnos_mixta ?JSON.parse(alumnos_mixta) : [];

      const parsedEgresados = egresados ?JSON.parse(egresados) : [];


      const parsedDoctoresJubilados =doctoresJubilados ? JSON.parse(doctoresJubilados) : [];
      const parsedDoctoresCandidatos = doctoresCandidatos ?JSON.parse(doctoresCandidatos) : [];
      const parsedProfesores =profesores ? JSON.parse(profesores) : [];
      const parsedEdadProfesores =edad_profesores ? JSON.parse(edad_profesores) : [];
      const parsedProfesoresMaestrias = profesoresMaestrias ?JSON.parse(profesoresMaestrias) : [];
      const parsedProfesoresConDoctorados = profesoresConDoctorados ?JSON.parse(profesoresConDoctorados) : [];
      const parsedMatriculaDocentes = matriculaDocentes ?JSON.parse(matriculaDocentes) : [];
      const parsedCuerpoAcademico = cuerposAcademicos ?JSON.parse(cuerposAcademicos) : [];
      const parsedOfertaAcademico = ofertaAcademicos ?  JSON.parse(ofertaAcademicos) : [];
      const parsedMatriculaDocentesEspecialidad = matriculaDocentesEspecialidad ?JSON.parse(matriculaDocentesEspecialidad) : [];



      const updateSchool = await school.update({
        name: name || school.name,
        address: address || school.address,
        province: province || school.province,
        phone: phone || school.phone,
        email: email || school.email,
        year_of_operation: year_of_operation || school.year_of_operation,
        sic: sic || school.sic,
        postgrado1 : postgrado1 || school.postgrado1,
        postgrado2 : postgrado2 || school.postgrado2,
        beca1 : beca1 || school.beca1,
        beca2: beca2 || school.beca2,
        urlYoutube: urlYoutube || school.urlYoutube,
        licenciatura1: licenciatura1 || school.licenciatura1,
        licenciatura2: licenciatura2 || school.licenciatura2,
        historia: historia || school.historia,
        alumnos: parsedAlumnos,
        alumnos_mixta: parsedAlumnosMixtos,
        egresados: parsedEgresados,
        doctoresJubilados: parsedDoctoresJubilados,
        doctoresCandidatos: parsedDoctoresCandidatos,
        profesores: parsedProfesores,
        edad_profesores: parsedEdadProfesores,
        matriculaDocentes: parsedMatriculaDocentes,
        matriculaDocentesEspecialidad: parsedMatriculaDocentesEspecialidad,
        cuerposAcademicos: parsedCuerpoAcademico,
        ofertaAcademicos: parsedOfertaAcademico,
        profesoresMaestrias: parsedProfesoresMaestrias,
        profesoresConDoctorados: parsedProfesoresConDoctorados,
        image: updatedLogoUrl,
        plantel1: updatedPlantel1Url,
        plantel2: updatedPlantel2Url,
        plantel3: updatedPlantel3Url,
        galeria: galeriaUrls
      });
      res.status(200).send({ success: true, data: updateSchool });
      console.log("Escuela registrada correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
