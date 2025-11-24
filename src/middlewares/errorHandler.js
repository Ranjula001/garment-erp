import { AppError } from '../utils/customErrors.js';

// Handle Sequelize validation errors
const handleSequelizeValidationError = (err) => {
  const errors = err.errors.map(error => error.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle Sequelize unique constraint errors
const handleSequelizeUniqueConstraintError = (err) => {
  const field = err.errors[0].path;
  const message = `${field} already exists. Please use another value.`;
  return new AppError(message, 409);
};

// Handle Sequelize foreign key constraint errors
const handleSequelizeForeignKeyConstraintError = (err) => {
  const message = 'Invalid reference to related resource';
  return new AppError(message, 400);
};

// Send error response in development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Send error response in production
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

// Main error handling middleware
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific Sequelize errors
    if (err.name === 'SequelizeValidationError') {
      error = handleSequelizeValidationError(error);
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      error = handleSequelizeUniqueConstraintError(error);
    }
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      error = handleSequelizeForeignKeyConstraintError(error);
    }

    sendErrorProd(error, res);
  }
};
