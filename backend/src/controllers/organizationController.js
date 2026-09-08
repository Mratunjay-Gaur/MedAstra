const Organization = require('../models/Organization');
const { formatSuccess, formatError } = require('../utils/formatters');

const createOrganization = async (req, res, next) => {
  try {
    const { name, type, address, contact } = req.body;

    if (!name) {
      return res.status(400).json(formatError('Organization name is required'));
    }

    const org = await Organization.create({
      name,
      type: type || 'hospital',
      address: address || '',
      contact: contact || '',
      adminId: req.user._id
    });

    return res.status(201).json(formatSuccess('Organization created successfully', { organization: org }));
  } catch (error) {
    next(error);
  }
};

const getOrganizationById = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.params.id).populate('adminId', 'name email');
    if (!org) {
      return res.status(404).json(formatError('Organization not found'));
    }
    return res.status(200).json(formatSuccess('Organization retrieved', { organization: org }));
  } catch (error) {
    next(error);
  }
};

const updateOrganization = async (req, res, next) => {
  try {
    const { name, type, address, contact } = req.body;
    const org = await Organization.findByIdAndUpdate(
      req.params.id,
      { name, type, address, contact },
      { new: true, runValidators: true }
    );

    if (!org) {
      return res.status(404).json(formatError('Organization not found'));
    }

    return res.status(200).json(formatSuccess('Organization updated successfully', { organization: org }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrganization,
  getOrganizationById,
  updateOrganization
};
