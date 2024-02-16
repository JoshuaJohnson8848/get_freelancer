const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')
const projectController = require('../controller/projects');

router.post('', isAuth, projectController.createProject);

module.exports = router;