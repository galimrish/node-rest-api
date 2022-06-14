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
  shortName: {
    required: true,
    type: String
  },
  weight: {
    required: true,
    type: Number
  },
  creationDate: {
    required: true,
    type: Date
  },
});

const dataModel = mongoose.model('nomenclature', dataSchema);
module.exports = dataModel;