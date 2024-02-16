const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')
const projectController = require('../controller/projects');

router.get('', isAuth, projectController.getProjects);

router.get('/:id', isAuth, projectController.getProjectById);

router.get('/byUser', isAuth, projectController.getProjectByUserId);

router.post('', isAuth, projectController.createProject);

router.put('/:id', isAuth, projectController.updateProject);

router.delete('/:id', isAuth, projectController.deleteProject);

module.exports = router;