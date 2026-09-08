const { formatError } = require('../utils/formatters');

const validateRequired = (fields = []) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of fields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json(
        formatError(`Missing required fields: ${missing.join(', ')}`, { missing })
      );
    }

    next();
  };
};

module.exports = {
  validateRequired
};
