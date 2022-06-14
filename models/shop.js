const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  shopCategory: {
    required: true,
    type: String
  },
  merchandise: {
    required: true,
    type: String
  },
  creationDate: {
    required: true,
    type: Date
  },
});

const dataModel = mongoose.model('shop', dataSchema);
module.exports = dataModel;