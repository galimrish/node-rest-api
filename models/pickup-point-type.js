const mongoose = require('mongoose');
const dataSchema = require('./simple-handbook');
const dataModel = mongoose.model('pickup-point-type', dataSchema);
module.exports = dataModel;