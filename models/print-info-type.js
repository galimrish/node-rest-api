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
  creationDate: {
    required: true,
    type: Date
  },
});

const dataModel = mongoose.model('print-info-type', dataSchema);
module.exports = dataModel;