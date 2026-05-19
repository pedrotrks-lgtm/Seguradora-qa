const mongoose = require('mongoose')

const PolicySchema = new mongoose.Schema({
  name: String,
  cpf: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Policy', PolicySchema)