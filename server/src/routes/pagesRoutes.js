const express = require('express');
const router = express.Router();
const { getPages, getPageBySlug, createPage, updatePage } = require('../controllers/pagesController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getPages)
  .post(protect, adminOnly, createPage); // Hanya admin boleh POST

router.route('/:slug')
  .get(getPageBySlug)
  .put(protect, adminOnly, updatePage); // Hanya admin boleh PUT

module.exports = router;
