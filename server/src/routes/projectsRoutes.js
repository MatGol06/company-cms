const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getProjects)
  .post(protect, adminOnly, createProject);

router.route('/:id')
  .put(protect, adminOnly, updateProject)
  .delete(protect, adminOnly, deleteProject);

module.exports = router;
