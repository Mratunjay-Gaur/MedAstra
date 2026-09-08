// MedAstra — Form Validators

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate password (minimum 6 characters)
 * @param {string} pwd
 * @returns {boolean}
 */
export const isValidPassword = (pwd) => {
  return typeof pwd === 'string' && pwd.length >= 6;
};

/**
 * Check that a value is not empty
 * @param {string} val
 * @returns {boolean}
 */
export const isRequired = (val) => {
  return !!val && String(val).trim() !== '';
};
