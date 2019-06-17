const router = require('express').Router();
const authService = require('../services/service-auth');

module.exports = router;

// routes
router.post('/login', authService.login);
