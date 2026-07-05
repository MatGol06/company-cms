const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService } = require('../controllers/servicesController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getServices)
  .post(protect, adminOnly, createService); // Tambah servis (Admin)

router.route('/:id')
  .put(protect, adminOnly, updateService) // Edit servis (Admin)
  .delete(protect, adminOnly, deleteService); // Buang servis (Admin)

module.exports = router;
