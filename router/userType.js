const express = require('express');
const router = express.Router();
const userTypeController = require('../controller/userType');

router.post('',userTypeController.createUserType);

module.exports = router;