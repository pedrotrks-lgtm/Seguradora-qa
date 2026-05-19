const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  policy: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Client', ClientSchema)