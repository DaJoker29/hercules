const mongoose = require('mongoose');
const shortid = require('shortid');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const postSchema = new Schema({
  pid: {
    type: String,
    required: true,
    default: shortid.generate,
    unique: true
  },
  createdDate: { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema);
