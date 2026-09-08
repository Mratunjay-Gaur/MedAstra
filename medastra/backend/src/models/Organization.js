const mongoose = require('mongoose');
const { ORG_TYPES } = require('../utils/constants');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide organization name'],
      trim: true
    },
    type: {
      type: String,
      enum: Object.values(ORG_TYPES),
      default: ORG_TYPES.HOSPITAL
    },
    address: {
      type: String,
      default: ''
    },
    contact: {
      type: String,
      default: ''
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Organization', organizationSchema);
