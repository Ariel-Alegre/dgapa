const jwt = require('jsonwebtoken');
const { Bookings } = require('../db');
require('dotenv').config();

module.exports = {
    DestailsBookings: async (req, res) => {
        const { authorization } = req.headers;
    
        try {
          if (!authorization) {
            console.log('No se proporcionó un token de autorización');
            return res.status(400).json({ message: 'No se proporcionó un token de autorización' });
          }
    
          const payload = jwt.verify(authorization, process.env.FIRMA_TOKEN);
    
          const user = await Bookings.findOne({ 
            where: { id: payload.id },
      
          });
          
    
          if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
    
          return res.send(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error en el servidor' });
        }
      }
};
