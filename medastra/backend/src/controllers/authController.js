const authService = require('../services/authService');
const { formatSuccess, formatError } = require('../utils/formatters');
const { isValidEmail, isValidPassword } = require('../utils/validators');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, organizationId, ...extraData } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(formatError('Name, email, and password are required'));
    }

    if (!isValidEmail(email)) {
      return res.status(400).json(formatError('Please enter a valid email address'));
    }

    if (!isValidPassword(password)) {
      return res.status(400).json(formatError('Password must be at least 6 characters long'));
    }

    const { user, token } = await authService.registerUser({
      name,
      email,
      password,
      role,
      organizationId,
      extraData
    });

    return res.status(201).json(formatSuccess('User registered successfully', { user, token }));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(formatError('Email and password are required'));
    }

    const { user, token } = await authService.loginUser({ email, password });

    return res.status(200).json(formatSuccess('Login successful', { user, token }));
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userProfile = await authService.getUserProfile(req.user._id);
    return res.status(200).json(formatSuccess('Profile fetched successfully', { user: userProfile }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
