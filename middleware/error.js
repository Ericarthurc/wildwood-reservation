const chalk = require('chalk');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  // console.log(chalk.red(err.stack));
  // console.log(err.name);
  // console.log(err);

  // Mongoose bad ObjectID
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Validation Error
  if (err.name == 'ValidationError') {
    const message = `Error!`;
    error = new ErrorResponse(message, 406);
  }

  // Mongoose Validation Error
  if (err._message == 'Service validation failed') {
    const message = `Error!`;
    error = new ErrorResponse(message, 405);
  }

  // Mongoose Duplicate Error
  if (err.code === 11000) {
    const message = `Error`;
    error = new ErrorResponse(message, 409);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
