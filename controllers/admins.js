const Admin = require('../models/Admin');
const db = require('../config/db');

// @desc    Get all admins
// @route   GET /api/v2/admins
// @access  Private
exports.getAdmins = async (req, res, next) => {};

// @desc    Get single admin
// @route   GET /api/v2/admins/:id
// @access  Private
exports.getAdmin = async (req, res, next) => {};

// @desc    Create new admin
// @route   POST /api/v2/admins
// @access  Private
exports.createAdmin = async (req, res, next) => {};

// @desc    Login admin
// @route   POST /api/v2/admins/login
// @access  Public
exports.loginAdmin = async (req, res, next) => {};

// @desc    Update single admin
// @route   PUT /api/v2/admins/:id
// @access  Private
exports.updateAdmin = async (req, res, next) => {};

// @desc    Delete single admin
// @route   DELETE /api/v2/admin/:id
// @access  Private
exports.deleteAdmin = async (req, res, next) => {};
