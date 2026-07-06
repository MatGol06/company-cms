const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Company CMS' },
  siteDescription: { type: String, default: 'Website rasmi syarikat.' },
  contactEmail: { type: String, default: 'info@company.com' },
  logoUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
