
const { Router  }= require('express');
const router = Router();
const routerBooking = require('./bookings')



router.use('/api', routerBooking ) 



















module.exports = router