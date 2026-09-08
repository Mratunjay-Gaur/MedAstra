const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const { formatError } = require('../utils/formatters');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json(formatError('Not authorized, token missing'));
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json(formatError('User belonging to this token no longer exists'));
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(formatError('Not authorized, token invalid or expired'));
  }
};

module.exports = {
  protect
};
