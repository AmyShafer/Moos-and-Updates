const router = require('express').Router();
const reactionRoutes = require('./reactionRoutes');
const residentRoutes = require('./residentRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('./reactions', reactionRoutes);
router.use('./residentRoutes', residentRoutes);
router.use('./thoughtRoutes', thoughtRoutes);

module.exports = router;