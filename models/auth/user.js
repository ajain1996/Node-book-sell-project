const mongoose = require('mongoose');
const passportlocalmongoose   = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportlocalmongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
