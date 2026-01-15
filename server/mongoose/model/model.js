const mongoose = require('mongoose');
const { userSchema } = require('../schema/schema');

// user Model

const userModel = mongoose.model('userModel', mongoose.models.userSchema || userSchema);



module.exports = { userModel };