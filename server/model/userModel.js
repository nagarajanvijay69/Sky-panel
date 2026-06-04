const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     username: String,
     email: String,
     password: String,
     isGoogle: {
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
     },
     weatherCity: {
          type: String,
          default: 'Tirunelveli'
     },
     profilePic: {
          type: String,
          default: ""
     },
     font_family: {
          type: String,
          default: "outfit"
     },
     last_seen: {
          type: Date
     },
     isOnline: {
          type: Boolean,
          default: false
     },
     chess_total: {
          type: Number,
          default: 0
     },
     chess_win: {
          type: Number,
          default: 0
     },
     chess_draw: {
          type: Number,
          default: 0
     },
     tic_total: {
          type: Number,
          default: 0
     },
     tic_win: {
          type: Number,
          default: 0
     },
     tic_draw: {
          type: Number,
          default: 0
     },
     total_message: {
          type: Number,
          default: 0
     },
     total_ai_message: {
          type: Number,
          default: 0
     }

}, {
     timestamps: true
});


const userModel = mongoose.model('userModel', mongoose.models.userSchema || userSchema);



module.exports =  userModel;