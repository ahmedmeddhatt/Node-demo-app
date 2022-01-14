const mongoose = require('mongoose');
const userSchema = require('../schema/schema');

const userModel = mongoose.model('User',userSchema);

module .exports = userModel;