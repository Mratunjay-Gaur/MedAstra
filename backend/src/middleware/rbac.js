const { formatError } = require('../utils/formatters');

const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(formatError('Not authenticated'));
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!roles.includes(req.user.role)) {
      return res.status(403).json(
        formatError(`Access denied. Role '${req.user.role}' is not authorized to access this resource`)
      );
    }

    next();
  };
};

module.exports = {
  checkRole
};
