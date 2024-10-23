const { Schools } = require('../db');
require('dotenv').config();


  module.exports = {
    AllSchool: async (req, res) => {
  
      try {
        const allschool = await Schools.findAll()
        if (allschool) {
            res.status(200).send({success: true, data: allschool})
    console.log("Todas las escuelas")

            
        } else {
            
            res.status(404).send({success: false, message: "No schools found"})
            console.log("No hay escuelas publicadas")
        }
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
    }
  }
  
