const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const categorySchema = new Schema({
  label: { type: String, required: true },
  slug: { type: String, unique: true, required: true }
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);
