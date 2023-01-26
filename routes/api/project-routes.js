const express = require('express');
const router = express.Router();

const projectController = require('../../controllers/projects-controller');

router.route('/api/project/all')
.get(projectController.getAll);

router.route('/api/project/:id')
.get(projectController.getProjectById);


module.exports = router;