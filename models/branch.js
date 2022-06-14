const mongoose = require('mongoose');
const addressSchema = require('./address').dataSchema;

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  creationDate: {
    required: true,
    type: Date
  },
  address: addressSchema,
});

const dataModel = mongoose.model('branch', dataSchema);
module.exports = dataModel;