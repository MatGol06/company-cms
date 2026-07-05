const Service = require('../models/Service');

// @desc    Dapatkan senarai perkhidmatan (Susun ikut order)
// @route   GET /api/v1/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Ralat mendapatkan senarai servis' });
  }
};

// @desc    Tambah servis baru
// @route   POST /api/v1/services
// @access  Private (Admin Only)
const createService = async (req, res) => {
  const { title, description, icon, order } = req.body;

  try {
    const service = await Service.create({ title, description, icon, order });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambah servis' });
  }
};

// @desc    Kemas kini servis
// @route   PUT /api/v1/services/:id
// @access  Private (Admin Only)
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = req.body.title || service.title;
      service.description = req.body.description || service.description;
      service.icon = req.body.icon || service.icon;
      service.order = req.body.order !== undefined ? req.body.order : service.order;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Servis tidak dijumpai' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal kemas kini servis' });
  }
};

// @desc    Buang servis
// @route   DELETE /api/v1/services/:id
// @access  Private (Admin Only)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await service.deleteOne();
      res.json({ message: 'Servis berjaya dipadam secara kekal' });
    } else {
      res.status(404).json({ message: 'Servis tidak dijumpai' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal memadam servis' });
  }
};

module.exports = { getServices, createService, updateService, deleteService };
