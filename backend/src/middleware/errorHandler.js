const { formatError } = require('../utils/formatters');

const errorHandler = (err, req, res, next) => {
  console.error('Server error:', err);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(400).json(formatError(`An account with this ${field} already exists`));
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json(formatError(messages.join(', ') || 'Validation error', err.errors));
  }

  // CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json(formatError(`Resource not found with id: ${err.value}`));
  }

  const statusCode = (res.statusCode && res.statusCode !== 200) ? res.statusCode : (err.statusCode || 500);
  return res.status(statusCode).json(formatError(err.message || 'Internal Server Error'));
};

module.exports = errorHandler;
