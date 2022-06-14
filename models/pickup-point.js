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
  additionalCode: {
    required: true,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  pickupPointTypeName: {
    required: true,
    type: String
  },
  creationDate: {
    required: true,
    type: Date
  },
});

const dataModel = mongoose.model('pickup-point', dataSchema);
module.exports = dataModel;