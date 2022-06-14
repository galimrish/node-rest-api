const mongoose = require('mongoose');
const dataSchema = require('./simple-handbook');
const dataModel = mongoose.model('merchandise', dataSchema);
module.exports = dataModel;