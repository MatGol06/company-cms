const Setting = require('../models/Setting');

// @desc    Dapatkan tetapan sistem
// @route   GET /api/v1/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    // Cari data setting yang pertama
    let setting = await Setting.findOne();
    
    // Kalau database kosong, wujudkan setting asas (default)
    if (!setting) {
      setting = await Setting.create({});
    }
    
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Ralat mendapatkan tetapan sistem' });
  }
};

// @desc    Kemas kini tetapan sistem
// @route   PUT /api/v1/settings
// @access  Private (Admin Only)
const updateSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne();
    
    if (!setting) {
      setting = new Setting(req.body);
    } else {
      setting.siteName = req.body.siteName || setting.siteName;
      setting.siteDescription = req.body.siteDescription || setting.siteDescription;
      setting.contactEmail = req.body.contactEmail || setting.contactEmail;
      setting.logoUrl = req.body.logoUrl !== undefined ? req.body.logoUrl : setting.logoUrl;
    }
    
    const updatedSetting = await setting.save();
    res.json(updatedSetting);
  } catch (error) {
    res.status(500).json({ message: 'Gagal kemas kini tetapan sistem' });
  }
};

module.exports = { getSettings, updateSettings };
