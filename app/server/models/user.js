const mongoose = require('mongoose');
const token = require('random-token');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, default: this.username },
  token: { type: String, default: token(128) },
  created: { type: Date, default: Date.now() }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
