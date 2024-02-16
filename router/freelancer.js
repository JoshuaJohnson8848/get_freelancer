const express = require('express')
const router = express.Router();
const freelancerController = require('../controller/freelancer');
const isAuth = require('../middleware/isAuth')

router.get('', isAuth, freelancerController.getProfile);

router.post('', isAuth, freelancerController.createProfile);

router.put('', isAuth, freelancerController.updateProfile);

module.exports = router;