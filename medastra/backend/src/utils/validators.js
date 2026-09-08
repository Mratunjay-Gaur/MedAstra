const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

module.exports = {
  isValidEmail,
  isValidPassword
};
