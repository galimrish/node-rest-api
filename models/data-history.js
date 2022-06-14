const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: {
    required: true,
    type: mongoose.ObjectId
  },
  changes: {
    required: true,
    type: String
  },
  changeDate: {
    required: true,
    type: Date
  }
});

module.exports = dataSchema;