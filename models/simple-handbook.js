const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  code: {
    required: true,
    type: Number
  },
  creationDate: {
    required: true,
    type: Date
  },
});

module.exports = dataSchema;