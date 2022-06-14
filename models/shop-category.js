const mongoose = require('mongoose');
const dataSchema = require('./simple-handbook');
const dataModel = mongoose.model('shop-category', dataSchema);
module.exports = dataModel;