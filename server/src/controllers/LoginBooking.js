const jwt = require('jsonwebtoken');
const { Bookings } = require('../db');
require('dotenv').config();

module.exports = {
    LoginBooking: async (req, res) => {
    const { email, code } = req.body;

    try {
      const user = await Bookings.findOne({ where: { email } });

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      /* const isMatch = await bcrypt.compare(password, user.password); */
      if (code !== user.code) {
        console.log('Credenciales incorrectas');
        return res.status(400).json({ message: 'Credenciales incorrectas' });
      }
      const tokenPayload = {
        id: user.id,
      
       name: user.name, lastName: user.lastName, email:user.email, country: user.country, phone: user.phone, airline: user.airline, fight_number: user.fight_number, comments: user.comments, code: user.code
      };

      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      console.log('Inicio de sesión exitoso');
      return res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
