const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
     username: String,
     email: String,
     password: String,
     isGoogle : {
          type: Boolean,
          default: false
     },
     googleId: {
          type: String,
          default: ""
     }, 
     theme: {
          type: String,
          default: 'light'
     }
});

module.exports = { userSchema };