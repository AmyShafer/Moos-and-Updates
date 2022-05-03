const router = require('express').Router();
const residentRoutes = require('./residentRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('./residents', residentRoutes);
router.use('./thoughts', thoughtRoutes);

module.exports = router;