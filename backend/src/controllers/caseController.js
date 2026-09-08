const caseService = require('../services/caseService');
const { formatSuccess, formatError } = require('../utils/formatters');

const createCase = async (req, res, next) => {
  try {
    const { patientId, doctorId, organizationId, structuredData } = req.body;
    const newCase = await caseService.createCase({
      patientId: patientId || req.user._id,
      doctorId: doctorId || null,
      organizationId: organizationId || req.user.organizationId || null,
      structuredData: structuredData || {}
    });
    return res.status(201).json(formatSuccess('Case created successfully (placeholder)', { case: newCase }));
  } catch (error) {
    next(error);
  }
};

const getCase = async (req, res, next) => {
  try {
    const caseItem = await caseService.getCaseById(req.params.id);
    if (!caseItem) {
      return res.status(404).json(formatError('Case not found'));
    }
    return res.status(200).json(formatSuccess('Case retrieved (placeholder)', { case: caseItem }));
  } catch (error) {
    next(error);
  }
};

const updateCase = async (req, res, next) => {
  try {
    const updatedCase = await caseService.updateCase(req.params.id, req.body);
    if (!updatedCase) {
      return res.status(404).json(formatError('Case not found'));
    }
    return res.status(200).json(formatSuccess('Case updated (placeholder)', { case: updatedCase }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCase,
  getCase,
  updateCase
};
