const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { generateToken } = require('../utils/jwt');
const { ROLES } = require('../utils/constants');

const formatUserResponse = (user, token) => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId ? user.organizationId.toString() : null,
    token: token || undefined
  };
};

const registerUser = async ({ name, email, password, role, organizationId, extraData = {} }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    const error = new Error('An account with this email already exists');
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const normalizedRole = role && Object.values(ROLES).includes(role.toLowerCase())
    ? role.toLowerCase()
    : ROLES.PATIENT;

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: normalizedRole,
    organizationId: organizationId || null
  });

  // Create role-specific entity
  if (normalizedRole === ROLES.DOCTOR) {
    await Doctor.create({
      userId: user._id,
      specialization: extraData.specialization || 'General Practice',
      licenseNumber: extraData.licenseNumber || '',
      department: extraData.department || 'General Medicine',
      organizationId: organizationId || null
    });
  } else if (normalizedRole === ROLES.PATIENT) {
    await Patient.create({
      userId: user._id,
      phone: extraData.phone || '',
      gender: extraData.gender || '',
      organizationId: organizationId || null
    });
  }

  const token = generateToken({ id: user._id, role: user.role });
  const userData = formatUserResponse(user, token);

  return { user: userData, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({ id: user._id, role: user.role });
  const userData = formatUserResponse(user, token);

  return { user: userData, token };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  let profileData = null;
  if (user.role === ROLES.DOCTOR) {
    profileData = await Doctor.findOne({ userId: user._id });
  } else if (user.role === ROLES.PATIENT) {
    profileData = await Patient.findOne({ userId: user._id });
  }

  return {
    ...formatUserResponse(user),
    profile: profileData
  };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  formatUserResponse
};
