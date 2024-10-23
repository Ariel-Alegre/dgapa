
const { Router  }= require('express');
const router = Router();
const routerSchools= require('./schools')



router.use('/api', routerSchools ) 



















module.exports = router