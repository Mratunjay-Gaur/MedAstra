const Patient = require('../models/Patient');
const User = require('../models/User');

const createPatient = async (data) => {
  const patient = await Patient.create(data);
  return patient;
};

const getPatients = async (filter = {}) => {
  const patients = await Patient.find(filter)
    .populate('userId', 'name email')
    .populate('organizationId', 'name type')
    .populate('primaryDoctorId')
    .sort({ createdAt: -1 });
  return patients;
};

const getPatientById = async (id) => {
  const patient = await Patient.findById(id)
    .populate('userId', 'name email')
    .populate('organizationId', 'name type address contact')
    .populate('primaryDoctorId');
  return patient;
};

const updatePatient = async (id, updateData) => {
  const patient = await Patient.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  }).populate('userId', 'name email');
  return patient;
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient
};
