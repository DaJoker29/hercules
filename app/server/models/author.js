const mongoose = require('mongoose');
const token = require('random-token');
const shortid = require('shortid');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const authorSchema = new Schema({
  uid: {
    type: String,
    required: true,
    default: shortid.generate,
    unique: true
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, default: this.username },
  token: { type: String, default: token(128) },
  createdDate: { type: Date, default: Date.now() }
});

authorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Author', authorSchema);
