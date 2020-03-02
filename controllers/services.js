const Service = require('../models/Service');
const db = require('../config/db');

// @desc    Get all services
// @route   GET /api/v2/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Get single service
// @route   GET /api/v2/services/:id
// @access  Private
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404).json({
        succes: false,
        message: `Service with id: ${req.params.id} not found!`
      });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Create new service
// @route   POST /api/v2/services
// @access  Private
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Update single service
// @route   PUT /api/v2/services/:id
// @access  Private
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({
        succes: false,
        message: `Service with id: ${req.params.id} not found!`
      });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Delete single service
// @route   DELETE /api/v2/services/:id
// @access  Private
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        succes: false,
        message: `Service with id: ${req.params.id} not found!`
      });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
