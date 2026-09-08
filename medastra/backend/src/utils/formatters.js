const formatSuccess = (message, data = {}) => {
  return {
    success: true,
    message,
    ...data
  };
};

const formatError = (message, errors = null) => {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return response;
};

module.exports = {
  formatSuccess,
  formatError
};
