const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post('',authController.signup);

router.post('/login',authController.login);

module.exports = router;