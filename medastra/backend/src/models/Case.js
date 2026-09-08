const mongoose = require('mongoose');
const { CASE_STATUS } = require('../utils/constants');

const caseSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      default: null
    },
    status: {
      type: String,
      enum: Object.values(CASE_STATUS),
      default: CASE_STATUS.ACTIVE
    },
    structuredData: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    completenessScore: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Case', caseSchema);
