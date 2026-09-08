const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { formatSuccess, formatError } = require('../utils/formatters');

const getDoctors = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.organizationId) {
      filter.organizationId = req.user.organizationId;
    }

    const doctors = await Doctor.find(filter)
      .populate('userId', 'name email role')
      .populate('organizationId', 'name type');

    return res.status(200).json(formatSuccess('Doctors fetched successfully', { doctors }));
  } catch (error) {
    next(error);
  }
};

const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('organizationId', 'name type address')
      .populate({
        path: 'patients',
        populate: { path: 'userId', select: 'name email' }
      });

    if (!doctor) {
      return res.status(404).json(formatError('Doctor not found'));
    }

    return res.status(200).json(formatSuccess('Doctor fetched successfully', { doctor }));
  } catch (error) {
    next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const { specialization, licenseNumber, department } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { specialization, licenseNumber, department },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!doctor) {
      return res.status(404).json(formatError('Doctor not found'));
    }

    return res.status(200).json(formatSuccess('Doctor updated successfully', { doctor }));
  } catch (error) {
    next(error);
  }
};

const getDoctorPatients = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json(formatError('Doctor not found'));
    }

    // Patients either linked via doctor.patients or primaryDoctorId
    const patients = await Patient.find({
      $or: [
        { _id: { $in: doctor.patients } },
        { primaryDoctorId: doctor._id }
      ]
    }).populate('userId', 'name email');

    return res.status(200).json(formatSuccess("Doctor's patients fetched successfully", { patients }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  updateDoctor,
  getDoctorPatients
};
