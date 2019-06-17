const router = require('express').Router();
const userService = require('../services/service-user');

module.exports = router;

// routes
router.get('/', userService.getAll);
router.post('/create', userService.create);
