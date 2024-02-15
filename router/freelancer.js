const express = require('express')
const router = express.Router();
const freelancerController = require('../controller/freelancer')

router.post('', freelancerController.createProfile);

// router.post('', freelancerController.createProfile);


module.exports = router;