const Case = require('../models/Case');

// Case service (placeholder for Phase 1, full implementation in Phase 2)
const createCase = async (caseData) => {
  const newCase = await Case.create(caseData);
  return newCase;
};

const getCaseById = async (id) => {
  const caseItem = await Case.findById(id)
    .populate('patientId')
    .populate('doctorId')
    .populate('organizationId');
  return caseItem;
};

const updateCase = async (id, updateData) => {
  const updatedCase = await Case.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  return updatedCase;
};

module.exports = {
  createCase,
  getCaseById,
  updateCase
};
