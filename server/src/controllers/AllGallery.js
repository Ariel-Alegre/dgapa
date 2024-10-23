const { Gallery } = require('../db');
require('dotenv').config();


  module.exports = {
    AllGallery: async (req, res) => {
  
      try {
        const allschool = await Gallery.findAll()
        if (allschool) {
            res.status(200).send({success: true, data: allschool})
    console.log("Todas las fotos de galeria")

            
        } else {
            
            res.status(404).send({success: false, message: "No hay fotos en galeria"})
            console.log("No hay fotos en galeria")
        }
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
    }
  }
  
