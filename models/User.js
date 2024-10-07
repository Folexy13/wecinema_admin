const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now,
  
  }
});

const userModel = mongoose.model('Admin', userSchema);
module.exports = userModel;
