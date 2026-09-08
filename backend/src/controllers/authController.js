const authService = require('../services/authService');
const { formatSuccess, formatError } = require('../utils/formatters');
const { isValidEmail, isValidPassword, isValidRole } = require('../utils/validators');

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

    if (role && !isValidRole(role)) {
      return res.status(400).json(formatError('Invalid role specified. Supported: patient, doctor, admin'));
    }

    const { user, token } = await authService.registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      organizationId,
      extraData
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
      user
    });
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

    const { user, token } = await authService.loginUser({
      email: email.trim(),
      password
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
      user
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userProfile = await authService.getUserProfile(req.user._id);
    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      user: userProfile
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
