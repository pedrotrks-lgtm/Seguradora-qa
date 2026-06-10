const mongoose = require('mongoose')

const AuditLogSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: true
  },
  entityId: {
    type: String
  },
  policyNumber: {
    type: String
  },
  registrationId: {
    type: String
  },
  userEmail: {
    type: String
  },
  status: {
    type: String
  },
  details: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('AuditLog', AuditLogSchema)