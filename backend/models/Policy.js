const mongoose = require('mongoose')

const PolicySchema = new mongoose.Schema({
  registrationId: {
    type: String,
    unique: true
  },
  insurerCode: {
    type: String,
    required: true
  },
  policyNumber: {
    type: String,
    required: true,
    unique: true
  },
  productCode: {
    type: String,
    required: true
  },
  insuredDocument: {
    type: String,
    required: true
  },
  premiumAmount: {
    type: Number,
    required: true
  },
  coverageAmount: {
    type: Number,
    required: true
  },
  effectiveStartDate: {
    type: Date,
    required: true
  },
  effectiveEndDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'REGISTERED'
  },
  source: {
    type: String,
    default: 'B3_SRO_FAKE'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
})

module.exports = mongoose.model('Policy', PolicySchema)