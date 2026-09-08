const { ROLES } = require('./constants');

const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

const isValidRole = (role) => {
  if (!role || typeof role !== 'string') return false;
  return Object.values(ROLES).includes(role.toLowerCase());
};

const validateRequired = (fields = [], body = {}) => {
  const missing = [];
  for (const field of fields) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      missing.push(field);
    }
  }
  return {
    isValid: missing.length === 0,
    missing
  };
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidRole,
  validateRequired
};
