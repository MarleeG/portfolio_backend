const express = require('express');
const router = express.Router();

const projectController = require('../../controllers/projects-controller');
const imagesController = require('../../controllers/images-controller');

router.route('/api/project/all')
.get(projectController.getAll);

router.route('/api/project/images')
.get(imagesController.getImageFromS3);

router.route('/api/project/connect/images')
.get(imagesController.getImageFromS3);

router.route('/api/project/:id')
.get(projectController.getProjectById);

module.exports = router;