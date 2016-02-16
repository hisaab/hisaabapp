// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema   = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
});

// Export the Mongoose model
module.exports = mongoose.model('Users', UserSchema);