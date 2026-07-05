const Page = require('../models/Page');

// @desc    Dapatkan semua halaman statik (Home, About)
// @route   GET /api/v1/pages
// @access  Public
const getPages = async (req, res) => {
  try {
    const pages = await Page.find({});
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Ralat mendapatkan data halaman' });
  }
};

// @desc    Dapatkan halaman spesifik berdasarkan slug
// @route   GET /api/v1/pages/:slug
// @access  Public
const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Halaman tidak dijumpai' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ralat pelayan (Server error)' });
  }
};

// @desc    Cipta halaman baru
// @route   POST /api/v1/pages
// @access  Private (Admin Only)
const createPage = async (req, res) => {
  const { slug, title, content } = req.body;

  try {
    const pageExists = await Page.findOne({ slug });
    if (pageExists) {
      return res.status(400).json({ message: 'Halaman dengan slug ini sudah wujud.' });
    }

    const page = await Page.create({ slug, title, content });
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mencipta halaman baru' });
  }
};

// @desc    Kemas kini (Update) halaman
// @route   PUT /api/v1/pages/:slug
// @access  Private (Admin Only)
const updatePage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });

    if (page) {
      page.title = req.body.title || page.title;
      page.content = req.body.content || page.content;

      const updatedPage = await page.save();
      res.json(updatedPage);
    } else {
      res.status(404).json({ message: 'Halaman tidak dijumpai' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal kemas kini halaman' });
  }
};

module.exports = { getPages, getPageBySlug, createPage, updatePage };
