const express = require('express');
const router = express.Router();
const userTypeController = require('../controller/userType');
const isAuth = require('../middleware/isAuth');

router.get('', isAuth, userTypeController.getAll);

router.post('', isAuth, userTypeController.createUserType);

router.put('/:id', isAuth, userTypeController.update);

router.delete('/:id', isAuth, userTypeController.delete);

module.exports = router;
