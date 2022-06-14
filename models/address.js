const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  zip: {
    type: String
  },
  region: {
    type: String
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  houseNum: {
    type: String
  },
  buildNum: {
    type: String
  },
  blockNum: {
    type: String
  },
  oneLine: {
    type: String
  },
});

const dataModel = mongoose.model('address', dataSchema);
module.exports = {dataModel, dataSchema};