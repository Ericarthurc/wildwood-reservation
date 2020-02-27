const User = require('../models/User');
const Service = require('../models/Service');
const sendSignUpEmail = require('../utils/mailer');
const db = require('../config/db');

// @desc    Get all users
// @route   GET /api/v2/users
// @access  Private
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Get single user
// @route   GET /api/v2/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User with id: ${req.params.id} not found!`
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Create new user
// @route   POST /api/v2/users
// @access  Public
exports.createUser = async (req, res, next) => {
  const session = await db.startSession();
  session.startTransaction();

  try {
    const user = await User.create([req.body], { session });

    const service = await Service.findById(req.body.serviceId);
    service.seats = service.seats - req.body.seats;
    await service.save({ session });

    if (!service) {
      throw new Error();
    }

    await session.commitTransaction();
    session.endSession();
    req.io.emit('userUpdate');
    sendSignUpEmail(
      req.body.email,
      req.body.name,
      req.body.serviceName,
      req.body.seats
    );
    res.status(200).json({ success: true, data: user, service });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    next(error);
  }
};

// @desc    Update single user
// @route   PUT /api/v2/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {};

// @desc    Delete single user
// @route   DELETE /api/v2/users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  const session = await db.startSession();
  session.startTransaction();

  try {
    const user = await User.findByIdAndDelete([req.params.id], { session });

    if (!user) {
      throw new Error();
    }

    const service = await Service.findById(user.serviceId);

    if (!service) {
      throw new Error();
    }

    service.seats = service.seats + user.seats;
    await service.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: true, data: user, service });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, error });
  }
};
