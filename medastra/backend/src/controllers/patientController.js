const patientService = require('../services/patientService');
const Patient = require('../models/Patient');
const { formatSuccess, formatError } = require('../utils/formatters');

const createPatient = async (req, res, next) => {
  try {
    const { userId, dateOfBirth, gender, phone, address, emergencyContact, organizationId, primaryDoctorId } = req.body;

    const targetUserId = userId || req.user._id;

    const existing = await Patient.findOne({ userId: targetUserId });
    if (existing) {
      return res.status(400).json(formatError('Patient profile already exists for this user'));
    }

    const patient = await patientService.createPatient({
      userId: targetUserId,
      dateOfBirth,
      gender,
      phone,
      address,
      emergencyContact,
      organizationId: organizationId || req.user.organizationId || null,
      primaryDoctorId: primaryDoctorId || null
    });

    return res.status(201).json(formatSuccess('Patient profile created successfully', { patient }));
  } catch (error) {
    next(error);
  }
};

const getPatients = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.organizationId) {
      filter.organizationId = req.user.organizationId;
    }

    const patients = await patientService.getPatients(filter);
    return res.status(200).json(formatSuccess('Patients retrieved successfully', { patients }));
  } catch (error) {
    next(error);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json(formatError('Patient not found'));
    }
    return res.status(200).json(formatSuccess('Patient retrieved successfully', { patient }));
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    if (!patient) {
      return res.status(404).json(formatError('Patient not found'));
    }
    return res.status(200).json(formatSuccess('Patient updated successfully', { patient }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient
};
