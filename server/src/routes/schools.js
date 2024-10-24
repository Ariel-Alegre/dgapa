const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const { RegisterSchools } = require('../controllers/RegisterSchools');
const { AllSchool } = require('../controllers/AllSchool');
const { PostGallery } = require('../controllers/PostGallery');
const { AllGallery } = require('../controllers/AllGallery');
const { EditSchool } = require('../controllers/EditSchool');
const { DetailSchools } = require('../controllers/DetailSchools');
const { DeleteSchool } = require('../controllers/DeleteSchool');
const { ContactUs } = require('../controllers/Contact');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Usamos __dirname para rutas relativas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Guardamos el archivo con la fecha actual + extensión original
  }
});

// Filtro para validar el tipo de archivo (por ejemplo, imágenes y PDFs)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);  // Aceptar archivo
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo imágenes y PDFs.'), false); // Rechazar archivo
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

// Ruta con multer middleware para manejar la subida de múltiples archivos
router.post('/register-school', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'plantel1', maxCount: 1 },
  { name: 'plantel2', maxCount: 1 },
  { name: 'plantel3', maxCount: 1 }
]), async (req, res) => {
  try {
    await RegisterSchools(req, res);
  } catch (error) {
    console.error("Error al registrar la escuela:", error);
    res.status(500).json({ message: 'Error al registrar la escuela', error: error.message });
  }
});

router.put('/update-school', upload.single('image'), EditSchool);
router.post('/post-gallery', upload.single('imageGallery'), PostGallery);
router.delete('/delete-school/:schoolId', DeleteSchool);

router.get('/escuelas', AllSchool);
router.get('/gallerys', AllGallery);
router.get('/detail-school/:schoolId', DetailSchools);
router.post('/contact-us', ContactUs);




module.exports = router;
